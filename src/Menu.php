<?php
namespace Laravolt\Ui;

use Lavary\Menu\Menu as BaseMenu;

class Menu extends BaseMenu
{
    public static function setVisible($children, $visible = 'visible')
    {
        foreach ($children as $child) {
            if ($child->link->isActive) {
                return $visible;
            }
        }
        return $visible = '';
    }

    public static function setActiveParent($children, $isActive, $active = 'active current')
    {
        if ($isActive) {
            return $active;
        } else {
            foreach ($children as $child) {
                if ($child->link->isActive) {
                    return $active;
                }
            }
        }
        return $active = '';
    }
}
