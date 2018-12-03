<?php namespace App\ModelFilters;

use Carbon\Carbon;
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
    public function name(string $value)
    {
        return $this->where('name', 'LIKE', "%$value%");
    }

    /**
     * @param array $createdAt [min, max]
     * @return $this
     */
    public function createdAt(array $createdAt)
    {
        if (!isset($createdAt['min']) || !isset($createdAt['max'])) return $this;

        return $this->whereBetween('created_at', [$createdAt['min'], $createdAt['max']]);
    }
}
