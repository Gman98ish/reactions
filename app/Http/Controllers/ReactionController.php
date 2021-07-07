<?php

namespace App\Http\Controllers;

use App\Models\Reaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReactionController extends Controller
{
    public function index(Request $request)
    {
        $reactions = Reaction::when($request->has('search'), function ($query) use ($request) {
            $query->where('name', 'like', "%" . $request->get('search') . "%");
        })->get();

        return Inertia::render('Reactions/Index', [
            'reactions' => $reactions,
        ]);
    }
}
