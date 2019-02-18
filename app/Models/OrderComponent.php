<?php

namespace App\Models;

use App\Events\OrderComponentSavedEvent;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\OrderComponent
 *
 * @property int $id
 * @property int $component_id
 * @property int $order_id
 * @property int $count
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Order $order
 * @property-read \App\Models\Component $parentComponent
 * @method static \Illuminate\Database\Eloquent\Builder|OrderComponent newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OrderComponent newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OrderComponent query()
 * @method static \Illuminate\Database\Eloquent\Builder|OrderComponent whereComponentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderComponent whereCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderComponent whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderComponent whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderComponent whereOrderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderComponent whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class OrderComponent extends Model
{
    protected $table = 'order_components';
    protected $fillable = ['component_id', 'count'];

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
    public function parentComponent(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Component::class, 'component_id');
    }
}
