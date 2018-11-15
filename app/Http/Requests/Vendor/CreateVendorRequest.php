<?php

namespace App\Http\Requests\Vendor;

use Illuminate\Foundation\Http\FormRequest;

class CreateVendorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        /*return Auth::user()->can('vendors.store');*/ /* todo: uncomment after login implement */
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string',
            'note' => 'string',

            'contacts' => 'array', /* ex. { contacts: {title: "Telegram", value: "XXXXXXX"} }*/
            'contacts.*.title' => 'required_with:contacts|string',
            'contacts.*.value' => 'required_with:contacts|string',
        ];
    }

    /**
     * @return array
     */
    public function toArray()
    {
        return $this->only(['name', 'note', 'contacts']);
    }

}
