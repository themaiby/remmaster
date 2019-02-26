<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\OrderStatusHistory
 *
 * @property int $id
 * @property int $order_id
 * @property int $status_id_old
 * @property int $status_id_new
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Order $order
 * @property-read \App\Models\OrderStatus $statusNew
 * @property-read \App\Models\OrderStatus $statusOld
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderStatusHistory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderStatusHistory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderStatusHistory query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderStatusHistory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderStatusHistory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderStatusHistory whereOrderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderStatusHistory whereStatusIdNew($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderStatusHistory whereStatusIdOld($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderStatusHistory whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderStatusHistory whereUserId($value)
 * @mixin \Eloquent
 */
class OrderStatusHistory extends Model
{
    protected $table = 'order_status_history';
    protected $fillable = ['status_id_old', 'status_id_new', 'user_id'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function order(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function statusOld(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(OrderStatus::class, 'status_id_old');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function statusNew(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(OrderStatus::class, 'status_id_new');
    }
}
