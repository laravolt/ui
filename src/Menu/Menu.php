<?php

namespace Laravolt\Ui\Menu;

use Illuminate\Support\Collection;

class Menu
{
    /**
     * @var string
     */
    protected $label;

    /**
     * @var string
     */
    protected $url;

    /**
     * @var string
     */
    protected $route;

    /**
     * @var string
     */
    protected $icon;

    /**
     * @var integer
     */
    protected $order;

    /**
     * @var string
     */
    protected $active;

    /**
     * @var boolean
     */
    protected $visible;

    /**
     * @var Collection
     */
    protected $data;

    /**
     * @var Collection
     */
    protected $children;

    public function __construct(string $label)
    {
        $this->label = $label;
        $this->data = new Collection();
        $this->children = new Collection();

        return $this;
    }

    public function route(string $route): self
    {
        $this->route = $route;

        return $this;
    }

    public function icon(string $icon): self
    {
        $this->icon = $icon;

        return $this;
    }

    public function active(string $active): self
    {
        $this->active = $active;

        return $this;
    }

    public function visible(bool $visible): self
    {
        $this->visible = $visible;

        return $this;
    }

    public function data($key, $value): self
    {
        $this->data->put($key, $value);

        return $this;
    }

    public function toArray()
    {
        return [
            ''
        ];
    }
}
