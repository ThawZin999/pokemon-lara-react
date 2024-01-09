<?php

namespace App\Http\Controllers;

use App\Models\Card;
use Illuminate\Http\Request;

class CardController extends Controller
{
    public function index(){
        $cards = Card::latest()->get();
        return response()->json([
            "message" => true,
            "data" => $cards,
        ]);
    }

    public function store(Request $request) {

       $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
            'image' => 'required|string',
        ]);

        Card::create([
            'name'=> $request->name,
            'price'=> $request->price,
            'image'=> $request->image,
        ]);
        return response()->json([
            'message'=> true
        ]);
    }

    public function updateStatus($cardId) {

        $card = Card::find($cardId);

        $card->status = $card->status ? 0 : 1;
        $card->save();

        return response()->json([
            "message" => true,
        ]);
    }

    public function edit($cardId) {

        $card = Card::find($cardId);
        if(!$card){
            return response()->json([
                "message" => "Card Not Found",
            ]);
        }
        return response()->json([
            "message" => true,
            "data" => $card,
        ]);

    }

    public function update(Request $request, $cardId) {

        $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
        ]);

        $card = Card::find($cardId);
        if(!$card){
            return response()->json([
                "message" => "Card Not Found",
            ]);
        }
        $card->update([
            "name"=> $request->name,
            "price"=> $request->price
        ]);

        return response()->json([
            "message" => true,
        ]);
    }

    public function destroy($cardId) {
        Card::find($cardId)->delete();
        return response()->json([
            "message" => true,
        ]);
    }
}
