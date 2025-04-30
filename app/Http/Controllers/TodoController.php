<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TodoController extends Controller
{
    public function index()
    {
        $todos = Todo::orderByRaw('deadline is null asc')->get();
        // Return a view with the todo items
        return view('welcome', compact('todos'));
    }

    public function create(Request $request)
    {
        // Validate the request data
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        // Create a new todo item
        $todo = new Todo();
        $todo->status = 'pending';
        $todo->title = $request->input('title');
        $todo->description = $request->input('description');
        $todo->deadline = $request->input('deadline');
        $todo->save();

        return json_encode([
            'status' => 'success',
            'message' => 'Todo created successfully.',
        ]);
    }

    public function update(Request $request, int $id)
    {
        $request->validate([
            'status' => 'required|string|in:pending,in-progress,done',
        ]);

        DB::table('todos')
            ->where('id', $id)
            ->update([
                'status' => $request->input('status'),
            ]);

        return json_encode([
            'status' => 'success',
            'message' => 'Todo updated successfully.',
        ]);
    }

    public function destroy($id)
    {
        // Delete the todo item
        $todo = Todo::findOrFail($id);
        $todo->delete();

        return json_encode([
            'status' => 'success',
            'message' => 'Todo deleted successfully.',
        ]);
    }
}