<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('todos', function (Blueprint $table) {
            $table->id();
            $table->string('status')->comment('Status of the todo item');
            $table->string('title')->comment('Title of the todo item');
            $table->text('description')->nullable()->comment('Description of the todo item');
            $table->datetime('deadline')->nullable()->comment('Priority of the todo item');
            $table->dateTime('created_at')->default(now())->comment('Creation timestamp');
            $table->dateTime('updated_at')->default(now())->comment('Last update timestamp');
            $table->dateTime('deleted_at')->nullable()->comment('Deletion timestamp');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('todos');
    }
};
