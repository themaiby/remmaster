<?php namespace App\ModelFilters;

use EloquentFilter\ModelFilter;

class ComponentFilter extends ModelFilter
{
    /**
    * Related Models that have ModelFilters as well as the method on the ModelFilter
    * As [relationMethod => [input_key1, input_key2]].
    *
    * @var array
    */
    public $relations = [];

    public function title(string $value)
    {
        return $this->whereRaw('LOWER(title) LIKE LOWER(?)', '%' . $value . '%');
    }

    public function article(string $value)
    {
        return $this->whereRaw('LOWER(article) LIKE LOWER(?)', '%' . $value . '%');
    }

    public function countMin(string $value)
    {
        return $this->where('count', '>=', (int)$value);
    }

    public function countMax(string $value)
    {
        return $this->where('count', '<=', (int)$value);
    }

    public function costMin(string $value)
    {
        return $this->where('cost', '>=', (float)$value);
    }

    public function costMax(string $value)
    {
        return $this->where('cost', '<=', (float)$value);
    }
}
