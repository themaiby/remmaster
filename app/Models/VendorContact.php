<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\VendorContact
 *
 * @property int $id
 * @property string $title
 * @property string $value
 * @property int $vendor_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VendorContact newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VendorContact newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VendorContact query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VendorContact whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VendorContact whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VendorContact whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VendorContact whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VendorContact whereValue($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VendorContact whereVendorId($value)
 * @mixin \Eloquent
 * @property-read \App\Models\Vendor $vendor
 */
class VendorContact extends Model
{
    protected $table = 'vendor_contacts';
    protected $guard_name = 'api';
    protected $fillable = [
        'title', 'value', 'vendor_id'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }
}
