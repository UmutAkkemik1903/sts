<?php

namespace App\Http\Controllers\api\Customer;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;

class indexController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = request()->user();
        $data = Customer::where('userId', $user->id)->get();
        return response()->json(['success'=>true,'user'=>$user,'data'=>$data]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = request()->user();
        $all = $request->all();
        $all['userId'] = $user->id;
        $create = Customer::create($all);
        if ($create){
            return response()->json(['success'=>true]);
        } else {
            return response()->json(['success'=>false,'message'=>'Kayıt eklenemedi']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = request()->user();
        $control = Customer::where('userId',$user->id)->where('id',$id)->count();
        if($control == 0){return response()->json(['success'=>false,'message'=>'Müşteri Bulunamadı']);}
        $customer = Customer::where('id',$id)->first();
        return response()->json([
            'success'=>true,
            'customer'=>$customer
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = request()->user();
        $control = Customer::where('userId',$user->id)->where('id',$id)->count();
        if($control == 0){return response()->json(['success'=>false,'message'=>'Müşteri Bulunamadı']);}
        $all = $request->all();
        unset($all['_method']);
        $update = Customer::where('id',$id)->update($all);
        if($update){
            return response()->json(['success'=>true]);
        } else{
            return response()->json(['success'=>false,'message'=>'Müşteri düzenlenemedi']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = request()->user();
        $control = Customer::where('userId',$user->id)->where('id',$id)->count();
        if($control == 0){return response()->json(['success'=>false,'message'=>'Müşteri Bulunamadı']);}
        Customer::where('userId',$user->id)->where('id',$id)->delete();
        return response()->json(['success'=>false,'message'=>'Müşteri silindi']);

    }
}
