<?php namespace App\ModelFilters;

use EloquentFilter\ModelFilter;

/**
 * Class ComponentFilter
 * @package App\ModelFilters
 */
class ComponentFilter extends ModelFilter
{
    /**
     * Related Models that have ModelFilters as well as the method on the ModelFilter
     * As [relationMethod => [input_key1, input_key2]].
     *
     * @var array
     */
    public $relations = [];

    /**
     * @param string $value
     * @return ComponentFilter
     */
    public function title(string $value)
    {
        return $this->whereRaw('LOWER(title) LIKE LOWER(?)', '%' . $value . '%');
    }

    /**
     * @param string $value
     * @return ComponentFilter
     */
    public function article(string $value)
    {
        return $this->whereRaw('LOWER(article) LIKE LOWER(?)', '%' . $value . '%');
    }

    /**
     * @param string $value
     * @return ComponentFilter
     */
    public function countMin(string $value)
    {
        return $this->where('count', '>=', (int)$value);
    }

    /**
     * @param string $value
     * @return ComponentFilter
     */
    public function countMax(string $value)
    {
        return $this->where('count', '<=', (int)$value);
    }

    /**
     * @param string $value
     * @return ComponentFilter
     */
    public function costMin(string $value)
    {
        return $this->where('cost', '>=', (float)$value);
    }

    /**
     * @param string $value
     * @return ComponentFilter
     */
    public function costMax(string $value)
    {
        return $this->where('cost', '<=', (float)$value);
    }

    /**
     * @param string $value
     * @return ComponentFilter
     */
    public function summaryCostMin(string $value)
    {
        return $this->where('summary_cost', '>=', (float)$value);
    }

    /**
     * @param string $value
     * @return ComponentFilter
     */
    public function summaryCostMax(string $value)
    {
        return $this->where('summary_cost', '<=', (float)$value);
    }

    /**
     * @param string $name
     * @return ComponentFilter
     */
    public function vendor(string $id)
    {
        return $this->related('vendor', 'id', '=', (int)$id);
    }

    /**
     * @param string $value
     * @return ComponentFilter
     */
    public function createdAtMin(string $value)
    {
        return $this->where('created_at', '>=', $value);
    }

    /**
     * @param string $value
     * @return ComponentFilter
     */
    public function createdAtMax(string $value)
    {
        return $this->where('created_at', '<=', $value);
    }

    /**
     * @param string $withTrashed
     * @return mixed
     */
    public function withDeleted(string $withTrashed)
    {
        if ($withTrashed) {
            return $this->withTrashed();
        }

        return $this;
    }
}
