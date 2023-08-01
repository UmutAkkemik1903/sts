<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('userId');
            $table->integer('categoryId');
            $table->string('name');
            $table->string('modelCode');
            $table->string('barcode');
            $table->string('brand');
            $table->integer('stock')->default(0);
            $table->text('text')->nullable();
            $table->double('buyingPrice')->nullable();
            $table->double('sellingPrice')->nullable();
            $table->integer('tax')->default(0);
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
