<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ProductImage;
use App\Models\ProductProperty;

class Product extends Model
{
    use HasFactory;
    protected $guarded  = [];

    public function property(){
        return $this->HasMany(ProductProperty::class,'productId','id');
    }
    public function images(){
        return $this->HasMany(ProductImage::class,'productId','id');
    }
}
