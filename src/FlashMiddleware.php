<?php
namespace Laravolt\Ui;

use Closure;
use Illuminate\Support\ViewErrorBag;

class FlashMiddleware
{

    /**
     * The Flash instance
     *
     * @var Flash
     */
    protected $flash;

    /**
     * FlashMiddleware constructor.
     * @param Flash $flash
     */
    public function __construct(Flash $flash)
    {
        $this->flash = $flash;
    }


    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  Closure                  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {
            /** @var \Illuminate\Http\Response $response */
            $response = $next($request);

            if ($request->session()->has('errors')) {
                $message = $request->session()->get('errors');

                if ($message instanceof ViewErrorBag) {
                    $message = collect($message->all())->flatten()->implode('<br />');
                }

                $this->flash->now()->error($message);
            }

            if ($message = $request->session()->get('success')) {
                $this->flash->success($message);
            }

            if ($message = $request->session()->get('warning')) {
                $this->flash->warning($message);
            }

            if ($message = $request->session()->get('info')) {
                $this->flash->info($message);
            }

            if ($message = $request->session()->get('message')) {
                $this->flash->message($message);
            }

            if ($message = $request->session()->get('error')) {
                $this->flash->error($message);
            }

            // Modify the response to add the Flash
            if (!$request->ajax() && $this->flash->hasMessage()) {
                $this->flash->injectScript($response);
            }
        } catch (Exception $e) {
            //@todo: handle error
        } finally {
            return $response;
        }
    }
}
