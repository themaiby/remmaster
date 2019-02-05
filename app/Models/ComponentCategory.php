<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class ComponentCategory
 *
 * @package App\Models
 * @property int $id
 * @property string $title
 * @property int|null $parent_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ComponentCategory[] $child
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Component[] $components
 * @property-read \App\Models\ComponentCategory|null $parent
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ComponentCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ComponentCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ComponentCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ComponentCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ComponentCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ComponentCategory whereParentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ComponentCategory whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ComponentCategory whereUpdatedAt($value)
 * @mixin \Eloquent
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
