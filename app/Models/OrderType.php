<?php

namespace App\Models;

use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Kyslik\ColumnSortable\Sortable;
use Spatie\Permission\Traits\HasRoles;

/**
 * App\Models\OrderType
 *
 * @property int $id
 * @property string $title
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Order[] $orders
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\Permission\Models\Permission[] $permissions
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\Permission\Models\Role[] $roles
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderType filter($input = array(), $filter = null)
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderType newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderType newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\OrderType onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderType paginateFilter($perPage = null, $columns = array(), $pageName = 'page', $page = null)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderType permission($permissions)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderType query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderType role($roles)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderType simplePaginateFilter($perPage = null, $columns = array(), $pageName = 'page', $page = null)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderType sortable($defaultParameters = null)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderType whereBeginsWith($column, $value, $boolean = 'and')
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderType whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderType whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderType whereEndsWith($column, $value, $boolean = 'and')
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderType whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderType whereLike($column, $value, $boolean = 'and')
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderType whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderType whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\OrderType withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\OrderType withoutTrashed()
 * @mixin \Eloquent
 */
class OrderType extends Model
{
    use HasRoles, SoftDeletes, Sortable, Filterable;

    protected $table = 'order_types';
    protected $guard_name = 'api';

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
