<?php
namespace Laravolt\Ui;

use Illuminate\Contracts\View\Factory;
use Illuminate\Http\Response;
use Illuminate\Session\Store;

class Flash
{

    protected $session;

    protected $view;

    protected $sessionKey = 'laravolt_flash';

    protected $now = false;

    protected $attributes = [
        'message'         => null,
        'type'            => 'basic',
        'showCloseButton' => true,
        'hideAfter'       => false,
    ];

    protected $bags = [];

    /**
     * Flash constructor.
     * @param Store $session
     * @param View  $view
     */
    public function __construct(Store $session, Factory $view)
    {
        $this->session = $session;
        $this->view = $view;
    }

    public function message($message, $type = 'basic')
    {
        $this->attributes['message'] = $message;
        $this->attributes['type'] = $type;

        $this->bags[] = $this->attributes;

        $method = $this->now ? 'now' : 'flash';
        $this->session->$method($this->sessionKey, $this->bags);
        $this->now = false;

        return $this;
    }

    public function info($message)
    {
        return $this->message($message, 'info');
    }

    public function success($message)
    {
        return $this->message($message, 'success');
    }

    public function warning($message)
    {
        return $this->message($message, 'warning');
    }

    public function error($message)
    {
        return $this->message($message, 'error');
    }

    public function injectScript(Response $response)
    {
        $content = $response->getContent();
        $pos = strripos($content, '</body>');

        $bags = $this->session->get($this->getSessionKey());

        usort($bags, function ($item, $next) {
            if ($item['type'] == 'error') {
                return 1;
            }

            return 0;
        });

        $script = $this->view->make('ui::flash', compact('bags'))->render();

        if (false !== $pos) {
            $content = substr($content, 0, $pos) . $script . substr($content, $pos);
        } else {
            $content = $content . $script;
        }

        $response->setContent($content);
    }

    public function getSessionKey()
    {
        return $this->sessionKey;
    }

    public function now()
    {
        $this->now = true;

        return $this;
    }

    public function hasMessage()
    {
        return !empty($this->bags);
    }
}
