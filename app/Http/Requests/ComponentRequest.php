<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ComponentRequest extends FormRequest
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
            'title' => 'required|string',
            'article' => 'required|string',
            'count' => 'required|int',
            'cost' => 'required|numeric',
            'vendor_id' => 'required|int|exists:vendors,id',
            'category_id' => 'required|int|exists:component_categories,id',
        ];

        $rulesUpdate = [
            'title' => 'sometimes|string',
            'article' => 'sometimes|string',
            'count' => 'sometimes|int',
            'cost' => 'sometimes|numeric',
            'vendor_id' => 'sometimes|int|exists:vendors,id',
            'category_id' => 'sometimes|int|exists:component_categories,id',
        ];

        if ($this->getMethod() === 'put') {
            $rules = array_merge($rules, $rulesUpdate);
        }

        return $rules;
    }
}
