<?php

namespace App\Models;

use App\Events\ComponentUpdatingEvent;
use App\Events\UpdatingComponentEvent;
use App\Observers\ComponentObserver;
use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Kyslik\ColumnSortable\Sortable;
use Spatie\Permission\Traits\HasRoles;

/**
 * App\Models\Component
 *
 * @property int $id
 * @property string $article
 * @property string $title
 * @property int $count
 * @property int $vendor_id
 * @property float $cost
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\Permission\Models\Permission[] $permissions
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\Permission\Models\Role[] $roles
 * @property-read \App\Models\Vendor $vendor
 * @method static \Illuminate\Database\Eloquent\Builder|Component filter($input = array(), $filter = null)
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|Component newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Component newQuery()
 * @method static \Illuminate\Database\Query\Builder|Component onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Component paginateFilter($perPage = null, $columns = array(), $pageName = 'page', $page = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Component permission($permissions)
 * @method static \Illuminate\Database\Eloquent\Builder|Component query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|Component role($roles)
 * @method static \Illuminate\Database\Eloquent\Builder|Component simplePaginateFilter($perPage = null, $columns = array(), $pageName = 'page', $page = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Component sortable($defaultParameters = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Component whereArticle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Component whereBeginsWith($column, $value, $boolean = 'and')
 * @method static \Illuminate\Database\Eloquent\Builder|Component whereCost($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Component whereCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Component whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Component whereEndsWith($column, $value, $boolean = 'and')
 * @method static \Illuminate\Database\Eloquent\Builder|Component whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Component whereLike($column, $value, $boolean = 'and')
 * @method static \Illuminate\Database\Eloquent\Builder|Component whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Component whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Component whereVendorId($value)
 * @method static \Illuminate\Database\Query\Builder|Component withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Component withoutTrashed()
 * @mixin \Eloquent
 * @property string|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Order[] $orders
 * @method static \Illuminate\Database\Eloquent\Builder|Component whereDeletedAt($value)
 * @property float $summary_cost
 * @property int $category_id
 * @property-read \App\Models\ComponentCategory $category
 * @method static \Illuminate\Database\Eloquent\Builder|Component whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Component whereSummaryCost($value)
 */
class Component extends Model
{
    use HasRoles, SoftDeletes, Sortable, Filterable;

    protected $table = 'components';
    protected $guard_name = 'api';

    protected $fillable = ['article', 'title', 'count', 'cost', 'summary_cost', 'category_id', 'vendor_id'];
    protected $sortable = ['article', 'title', 'count', 'cost', 'vendor', 'created_at', 'summary_cost'];
    protected $dispatchesEvents = [
        'updated' => ComponentUpdatingEvent::class
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function vendor(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Vendor::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function orders(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Order::class, 'order_components');
    }

    /**
     * Sorting for vendor column
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param $direction
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function vendorSortable(\Illuminate\Database\Eloquent\Builder $query, $direction): \Illuminate\Database\Eloquent\Builder
    {
        return $query->join('vendors', 'components.vendor_id', '=', 'vendors.id')
            ->orderBy('vendors.name', $direction)
            ->select('components.*');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(ComponentCategory::class);
    }
}
