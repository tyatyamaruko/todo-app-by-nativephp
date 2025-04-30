<?php

use App\Http\Controllers\TodoController;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Support\Facades\Route;

Route::get('/', [TodoController::class, 'index'])->name('todos.index')
    ->withoutMiddleware(VerifyCsrfToken::class);;

Route::post('/create', [TodoController::class, 'create'])->name('todos.create')
    ->withoutMiddleware(VerifyCsrfToken::class);;;

Route::post('/update/{id}', [TodoController::class, 'update'])->name('todos.update')
    ->withoutMiddleware(VerifyCsrfToken::class);;;

Route::post('/delete/{id}', [TodoController::class, 'destroy'])->name('todos.delete')
    ->withoutMiddleware(VerifyCsrfToken::class);;;
