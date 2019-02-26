<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\OrderStatus
 *
 * @property int $id
 * @property string $title
 * @property bool $opener
 * @property bool $finisher
 * @property string|null $color
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $deleted_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderStatus newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderStatus newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderStatus query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderStatus whereColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderStatus whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderStatus whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderStatus whereFinisher($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderStatus whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderStatus whereOpener($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderStatus whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderStatus whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class OrderStatus extends Model
{
    protected $table = 'order_statuses';
}
