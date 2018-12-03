<?php

namespace App\Models;

use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Kyslik\ColumnSortable\Sortable;
use Spatie\Permission\Traits\HasRoles;

/**
 * App\Models\Vendor
 *
 * @property int $id
 * @property string $name
 * @property string|null $note
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\VendorContact[] $contacts
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\Permission\Models\Permission[] $permissions
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\Permission\Models\Role[] $roles
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Vendor newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Vendor newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Vendor onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Vendor permission($permissions)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Vendor query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Vendor role($roles)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Vendor whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Vendor whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Vendor whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Vendor whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Vendor whereNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Vendor whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Vendor withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Vendor withoutTrashed()
 * @mixin \Eloquent
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Vendor sortable($defaultParameters = null)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Vendor filter($input = array(), $filter = null)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Vendor paginateFilter($perPage = null, $columns = array(), $pageName = 'page', $page = null)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Vendor simplePaginateFilter($perPage = null, $columns = array(), $pageName = 'page', $page = null)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Vendor whereBeginsWith($column, $value, $boolean = 'and')
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Vendor whereEndsWith($column, $value, $boolean = 'and')
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Vendor whereLike($column, $value, $boolean = 'and')
 */
class Vendor extends Model
{
    use HasRoles, SoftDeletes, Sortable, Filterable;

    protected $table = 'vendors';
    protected $guard_name = 'api';
    protected $fillable = [
        'name', 'note'
    ];

    protected $sortable = [
        'id', 'name', 'created_at', 'deleted_at'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function contacts()
    {
        return $this->hasMany(VendorContact::class);
    }
}
