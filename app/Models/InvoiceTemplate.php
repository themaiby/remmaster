<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\InvoiceTemplate
 *
 * @property int $id
 * @property string $title
 * @property mixed $template
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $deleted_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\InvoiceTemplate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\InvoiceTemplate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\InvoiceTemplate query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\InvoiceTemplate whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\InvoiceTemplate whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\InvoiceTemplate whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\InvoiceTemplate whereTemplate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\InvoiceTemplate whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\InvoiceTemplate whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property string $serialized
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\InvoiceTemplate whereSerialized($value)
 */
class InvoiceTemplate extends Model
{
    protected $table = 'invoice_templates';
    protected $fillable = ['title', 'serialized'];
}
