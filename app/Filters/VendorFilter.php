<?php

namespace App\Filters;

use Kyslik\LaravelFilterable\Generic\Filter;

class VendorFilter extends Filter
{
    /**
     * Defines columns that end-user may filter by.
     *
     * @var array
     */
    protected $filterables = ['name', 'created_at'];

    /**
     * @param $value
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function name($value)
    {
        return $this->builder->where('name', 'LIKE', "%$value%");
    }
}
