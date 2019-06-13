<?php

namespace Laravolt\Ui\Menu;

use Illuminate\Support\Collection;

class Manager
{
    /**
     * @var string
     */
    protected $id;

    /**
     * @var Collection
     */
    protected $items;

    /**
     * Manager constructor.
     * @param $id
     */
    public function __construct($id)
    {
        $this->id = $id;
        $this->items = new Collection();
    }

    public function add(string $label)
    {
        $menu = new Menu($label);
        $this->items->push($menu);

        return $menu;
    }

    public function all()
    {
        return $this->items;
    }
}
