<?php

namespace App\Models;

use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Kyslik\ColumnSortable\Sortable;
use Spatie\Permission\Traits\HasRoles;

/**
 * App\Models\Order
 *
 * @property int $id
 * @property int $order_type_id
 * @property int $status_id
 * @property int $user_id
 * @property bool $urgent
 * @property string $breakage
 * @property string $complete_date
 * @property string|null $comment
 * @property string $client_name
 * @property string $client_number
 * @property string|null $client_email
 * @property string|null $client_note
 * @property string $device_name
 * @property string $device_imei
 * @property string|null $device_visual
 * @property string|null $device_note
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Component[] $components
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\Permission\Models\Permission[] $permissions
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\Permission\Models\Role[] $roles
 * @property-read \App\Models\Status $status
 * @property-read \App\Models\OrderType $type
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order filter($input = array(), $filter = null)
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Order onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order paginateFilter($perPage = null, $columns = array(), $pageName = 'page', $page = null)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order permission($permissions)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order role($roles)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order simplePaginateFilter($perPage = null, $columns = array(), $pageName = 'page', $page = null)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order sortable($defaultParameters = null)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order whereBeginsWith($column, $value, $boolean = 'and')
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order whereBreakage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order whereClientEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order whereClientName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order whereClientNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order whereClientNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order whereComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order whereCompleteDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order whereDeviceImei($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order whereDeviceName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order whereDeviceNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order whereDeviceVisual($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order whereEndsWith($column, $value, $boolean = 'and')
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order whereLike($column, $value, $boolean = 'and')
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order whereOrderTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order whereStatusId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order whereUrgent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Order withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Order withoutTrashed()
 * @mixin \Eloquent
 */
class Order extends Model
{
    use HasRoles, SoftDeletes, Sortable, Filterable;

    protected $table = 'orders';
    protected $guard_name = 'api';

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function status()
    {
        return $this->belongsTo(Status::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function type()
    {
        return $this->belongsTo(OrderType::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function components()
    {
        return $this->belongsToMany(Component::class, 'order_components');
    }
}
