<?php

namespace App\Http\Controllers;

use App\Models\Reaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
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

    public function store(Request $request)
    {
        $url = $request->file('image')->storePublicly('reactions', 's3');
        
        $reaction = Reaction::create([
            'name' => $request->input('name'),
            'url' => env('AWS_BUCKET', '') . '.s3.' . env('AWS_DEFAULT_REGION')
                        . '.amazonaws.com/' . $url,
        ]);

        return Redirect::to('/')->with((['message' => 'success']));
    }
}
