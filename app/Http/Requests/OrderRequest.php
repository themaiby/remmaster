<?php

namespace App\Http\Requests;

use App\Models\Component;
use Illuminate\Foundation\Http\FormRequest;

class OrderRequest extends FormRequest
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
        return [
            /* required */
            'order_type_id' => 'required|int|exists:order_types,id',
            'status_id' => 'required|int|exists:order_statuses,id',
            'urgent' => 'required|boolean',
            'breakage' => 'required|string',
            'client_name' => 'required|string',
            'client_number' => 'required|string',
            'device_name' => 'required|string',
            'device_imei' => 'required|string',
            'complete_date' => 'required|date',

            /* optional */
            'comment' => 'sometimes|string|nullable',
            'client_email' => 'sometimes|email|nullable',
            'client_note' => 'sometimes|string|nullable',
            'device_visual' => 'sometimes|string|nullable',
            'device_note' => 'sometimes|string|nullable',

            /* components */
            'components' => ['sometimes', 'array', function ($attr, array $value, $fail) {
                $componentsData = collect($value);

                /* get specified components */
                $components = Component::findMany($componentsData->pluck('component_id'));

                /* check existing in single query */
                if ($components->count() !== $componentsData->count()) {
                    $fail('One or several components are not present'); /* todo: translate */
                }

                /* checking component count */
                foreach ($componentsData as $component) {
                    $dbComponent = $components->find($component['component_id']);
                    if ($dbComponent->count < $component['count']) {
                        $fail("Not enough $dbComponent->title's [$dbComponent->article] count"); /* todo: translate */
                    }
                }
            }],

            /* works */
            'works' => 'required|array',
            'works.*.title' => 'required|string',
            'works.*.cost' => 'required|numeric',
        ];
    }
}
