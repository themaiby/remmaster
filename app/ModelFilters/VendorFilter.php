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
     * @param array $createdAt
     * @return $this
     */
    public function createdAt(array $createdAt)
    {
        return $this->whereBetween('created_at', $createdAt);
    }

    /**
     * Components count between
     * @param array $count
     * @return VendorFilter|\Illuminate\Database\Eloquent\Builder
     */
    public function components(array $count)
    {
        return $this
            ->has('components', '>=', $count[0])
            ->has('components', '<=', $count[1]);
    }
}
