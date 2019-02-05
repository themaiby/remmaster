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
 * @method static \Illuminate\Database\Eloquent\Builder|Order filter($input = array(), $filter = null)
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|Order newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Order newQuery()
 * @method static \Illuminate\Database\Query\Builder|Order onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Order paginateFilter($perPage = null, $columns = array(), $pageName = 'page', $page = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Order permission($permissions)
 * @method static \Illuminate\Database\Eloquent\Builder|Order query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|Order role($roles)
 * @method static \Illuminate\Database\Eloquent\Builder|Order simplePaginateFilter($perPage = null, $columns = array(), $pageName = 'page', $page = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Order sortable($defaultParameters = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereBeginsWith($column, $value, $boolean = 'and')
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereBreakage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereClientEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereClientName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereClientNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereClientNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereCompleteDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereDeviceImei($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereDeviceName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereDeviceNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereDeviceVisual($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereEndsWith($column, $value, $boolean = 'and')
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereLike($column, $value, $boolean = 'and')
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereOrderTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereStatusId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereUrgent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|Order withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Order withoutTrashed()
 * @mixin \Eloquent
 */
class Order extends Model
{
    use HasRoles, SoftDeletes, Sortable, Filterable;

    /**
     * @var string
     */
    protected $table = 'orders';

    /**
     * @var string
     */
    protected $guard_name = 'api';

    /**
     * @var array
     */
    protected $fillable = [];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function status(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Status::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function type(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(OrderType::class, 'order_type_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function components(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Component::class, 'order_components');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        $u = $this->belongsTo(User::class, 'user_id', 'id');
        return $u;
    }
}
