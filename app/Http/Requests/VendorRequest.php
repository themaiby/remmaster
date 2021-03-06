<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VendorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'name' => 'required|string',
            'note' => 'sometimes|string|nullable',
            'contacts' => 'sometimes|array', // example: { contacts: {title: "Telegram", value: "XXXXXXX"} }
            'contacts.*.title' => 'required_with:contacts|string',
            'contacts.*.value' => 'required_with:contacts|string',
        ];

        $rulesUpdate = [
            'name' => 'sometimes|string|nullable',
            'note' => 'sometimes|string|nullable',
        ];

        if ($this->getMethod() === 'PUT') {
            $rules = array_merge($rules, $rulesUpdate);
        }

        return $rules;
    }
}
