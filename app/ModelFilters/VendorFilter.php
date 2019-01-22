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
     * Case insensitive search
     *
     * @param $value
     * @return VendorFilter
     */
    public function name(string $value)
    {
        return $this->whereRaw('LOWER(name) LIKE LOWER(?)', '%' . $value . '%');
    }

    /**
     * @param string $createdAtMin
     * @return $this
     */
    public function createdAtMin(string $createdAtMin): self
    {
        return $this->where('created_at', '>=', $createdAtMin);
    }

    /**
     * @param string $createdAtMax
     * @return $this
     */
    public function createdAtMax(string $createdAtMax): self
    {
        return $this->where('created_at', '<=', $createdAtMax);
    }

    /**
     * @param int $count
     * @return VendorFilter|\Illuminate\Database\Eloquent\Builder
     */
    public function componentsMin(int $count)
    {
        return $this->has('components', '>=', $count);
    }

    /**
     * @param int $count
     * @return VendorFilter|\Illuminate\Database\Eloquent\Builder
     */
    public function componentsMax(int $count)
    {
        return $this->has('components', '<=', $count);
    }
}
