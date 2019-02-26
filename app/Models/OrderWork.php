<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\OrderWork
 *
 * @property int $id
 * @property string $title
 * @property float $cost
 * @property int $order_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderWork newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderWork newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderWork query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderWork whereCost($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderWork whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderWork whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderWork whereOrderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderWork whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderWork whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class OrderWork extends Model
{
    protected $table = 'order_works';
    protected $fillable = ['title', 'cost'];
}
