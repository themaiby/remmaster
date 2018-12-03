<?php namespace App\ModelFilters;

use EloquentFilter\ModelFilter;

class VendorFilter extends ModelFilter
{
    /**
     * Related Models that have ModelFilters as well as the method on the ModelFilter
     * As [relationMethod => [input_key1, input_key2]].
     *
     * @var array
     */
    public $relations = [];

    /**
     * @param $value
     * @return VendorFilter
     */
    public function name($value)
    {
        return $this->where('name', 'LIKE', "%$value%");
    }
}
