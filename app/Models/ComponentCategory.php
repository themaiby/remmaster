<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class ComponentCategory
 * @package App\Models
 */
class ComponentCategory extends Model
{
    /**
     * @var string
     */
    protected $table = 'component_categories';
    /**
     * @var string
     */
    protected $guard_name = 'api';
    /**
     * @var array
     */
    protected $fillable = ['title', 'parent_id'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function components(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Component::class, 'category_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function parent(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(ComponentCategory::class, 'parent_id'); /*todo: add with*/
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function child(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(ComponentCategory::class, 'parent_id')->with('child');
    }
}
