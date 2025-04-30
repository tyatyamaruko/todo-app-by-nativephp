<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@^2.0/dist/tailwind.min.css" rel="stylesheet">
    <!-- Styles / Scripts -->
    @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    @endif
    <style>
        .kanban-column-content {
            height: 550px;
            overflow-y: scroll;
        }
    </style>
</head>

<body class="bg-gradient-to-r from-blue-100 to-purple-300 min-h-screen flex justify-center py-10">
    <div class="flex flex-col items-center">
        <div class="flex gap-8 p-6 bg-white shadow-lg rounded-lg">
            @include('components.TodoColumn', ['title' => 'Pending', 'todos' => $todos->filter(fn($todo) => $todo->isPending()), 'status' => 'pending'])
            @include('components.TodoColumn', ['title' => 'Progress', 'todos' => $todos->filter(fn($todo) => $todo->isProgress()), 'status' => 'in-progress'])
            @include('components.TodoColumn', ['title' => 'Completed', 'todos' => $todos->filter(fn($todo) => $todo->isCompleted()), 'status' => 'done'])
        </div>
        <button id="addTaskButton"
            class="bg-blue-500 text-white fixed text-2xl bottom-10 right-10 px-4 py-2 rounded-full shadow-md">+</button>
    </div>

    <div id="modal" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center hidden">
        <div class="bg-white p-6 rounded-md shadow-md w-200">
            <h2 class="text-lg font-bold mb-4">新しいタスクを追加</h2>
            <input type="text" id="taskTitleInput" class="border border-gray-300 p-2 w-full mb-4"
                placeholder="タスク名" />
            <textarea id="taskDescriptionInput" class="border border-gray-300 p-2 w-full mb-4" placeholder="タスクの概要"></textarea>
            <input type="date" id="taskDeadlineInput" class="border border-gray-300 p-2 w-full mb-4" />
            <button id="saveTaskButton" class="bg-blue-500 text-white px-4 py-2 rounded-md w-full">追加</button>
        </div>
    </div>
</body>

</html>
