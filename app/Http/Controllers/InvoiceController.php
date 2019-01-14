<?php

namespace App\Http\Controllers;

use App\Models\InvoiceTemplate;
use App\Services\TryService;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function serialize()
    {
        // will use for serialization xml instance
    }
}
