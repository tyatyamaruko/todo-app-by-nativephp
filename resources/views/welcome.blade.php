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
            <div class="flex flex-col w-72 bg-gray-100 rounded-lg overflow-hidden shadow-md">
                <div class="bg-indigo-600 text-white text-center p-2 uppercase font-semibold">Pending</div>
                <div id="pending" class="p-4 space-y-3 kanban-column-content flex-grow">
                    @foreach ($todos as $todo)
                        @if ($todo->isPending())
                            <div class="kanban-card pending bg-white p-4 rounded-lg shadow-md flex justify-between items-center transition-shadow hover:shadow-lg"
                                draggable="true" id="{{ $todo->id }}">
                                <div class="flex-shrink">
                                    <h3 class="font-bold text-gray-800">{{ $todo->title }}</h3>
                                    <p class="text-sm text-gray-600">{{ $todo->description }}</p>
                                    @if ($todo->isNothingDeadline())
                                        {{-- 期日がnullの場合は何も表示しない --}}
                                    @elseif (!$todo->isOverdue())
                                        <p class="text-xs text-gray-500 mt-2">
                                            締切まであと
                                            <span class="font-bold text-green-500">
                                                {{ $todo->dueToDays() }}
                                            </span> 日
                                        </p>
                                    @else
                                        @if ($todo->dueTodays() !== 0)
                                            <p class="text-xs text-gray-500 mt-2">
                                                期日から
                                                <span class="font-bold text-red-500">
                                                    {{ $todo->dueToDays() }}
                                                </span> 日過ぎています。
                                            </p>
                                        @else
                                            <p class="text-xs text-gray-500 mt-2">
                                                <span class="font-bold text-red-500">
                                                    今日まで
                                                </span>
                                            </p>
                                        @endif
                                    @endif
                                </div>
                                <button
                                    class="deleteTaskButton bg-red-100 hover:bg-red-300 text-red-500 hover:text-red-700 transition-all p-2 rounded-full focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 fill-current"
                                        viewBox="0 0 24 24">
                                        <path d="M3 6h18v2H3V6zm3 14h12v-1H6v1zm0-9.5V19h12V10.5H6z" />
                                    </svg>
                                </button>
                            </div>
                        @endif
                    @endforeach
                </div>
            </div>
            <div class="flex flex-col w-72 bg-gray-100 rounded-lg overflow-hidden shadow-md">
                <div class="bg-yellow-500 text-white text-center p-2 uppercase font-semibold">In Progress</div>
                <div id="in-progress" class="p-4 space-y-3 kanban-column-content flex-grow">
                    @foreach ($todos as $todo)
                        @if ($todo->isProgress())
                            <div class="kanban-card in-progress bg-white p-4 rounded-lg shadow-md flex justify-between items-center transition-shadow hover:shadow-lg"
                                draggable="true" id="{{ $todo->id }}">
                                <div class="flex-shrink">
                                    <h3 class="font-bold text-gray-800">{{ $todo->title }}</h3>
                                    <p class="text-sm text-gray-600">{{ $todo->description }}</p>
                                    @if ($todo->isNothingDeadline())
                                        {{-- 期日がnullの場合は何も表示しない --}}
                                    @elseif (!$todo->isOverdue())
                                        <p class="text-xs text-gray-500 mt-2">
                                            締切まであと
                                            <span class="font-bold text-green-500">
                                                {{ $todo->dueToDays() }}
                                            </span> 日
                                        </p>
                                    @else
                                        @if ($todo->dueTodays() !== 0)
                                            <p class="text-xs text-gray-500 mt-2">
                                                期日から
                                                <span class="font-bold text-red-500">
                                                    {{ $todo->dueToDays() }}
                                                </span> 日過ぎています。
                                            </p>
                                        @else
                                            <p class="text-xs text-gray-500 mt-2">
                                                <span class="font-bold text-red-500">
                                                    今日まで
                                                </span>
                                            </p>
                                        @endif
                                    @endif
                                </div>
                                <button
                                    class="deleteTaskButton bg-red-100 hover:bg-red-300 text-red-500 hover:text-red-700 transition-all p-2 rounded-full focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 fill-current"
                                        viewBox="0 0 24 24">
                                        <path d="M3 6h18v2H3V6zm3 14h12v-1H6v1zm0-9.5V19h12V10.5H6z" />
                                    </svg>
                                </button>
                            </div>
                        @endif
                    @endforeach
                </div>
            </div>
            <div class="flex flex-col w-72 bg-gray-100 rounded-lg overflow-hidden shadow-md">
                <div class="bg-green-600 text-white text-center p-2 uppercase font-semibold">Done</div>
                <div id="done" class="p-4 space-y-3 kanban-column-content flex-grow">
                    @foreach ($todos as $todo)
                        @if ($todo->isCompleted())
                            <div class="kanban-card done bg-white p-4 rounded-lg shadow-md flex justify-between items-center transition-shadow hover:shadow-lg"
                                draggable="true" id="{{ $todo->id }}">
                                <div class="flex-shrink">
                                    <h3 class="font-bold text-gray-800">{{ $todo->title }}</h3>
                                    <p class="text-sm text-gray-600">{{ $todo->description }}</p>
                                    @if ($todo->isNothingDeadline())
                                        {{-- 期日がnullの場合は何も表示しない --}}
                                    @elseif (!$todo->isOverdue())
                                        <p class="text-xs text-gray-500 mt-2">
                                            締切まであと
                                            <span class="font-bold text-green-500">
                                                {{ $todo->dueToDays() }}
                                            </span> 日
                                        </p>
                                    @else
                                        @if ($todo->dueTodays() !== 0)
                                            <p class="text-xs text-gray-500 mt-2">
                                                期日から
                                                <span class="font-bold text-red-500">
                                                    {{ $todo->dueToDays() }}
                                                </span> 日過ぎています。
                                            </p>
                                        @else
                                            <p class="text-xs text-gray-500 mt-2">
                                                <span class="font-bold text-red-500">
                                                    今日まで
                                                </span>
                                            </p>
                                        @endif
                                    @endif
                                </div>
                                <button
                                    class="deleteTaskButton bg-red-100 hover:bg-red-300 text-red-500 hover:text-red-700 transition-all p-2 rounded-full focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 fill-current"
                                        viewBox="0 0 24 24">
                                        <path d="M3 6h18v2H3V6zm3 14h12v-1H6v1zm0-9.5V19h12V10.5H6z" />
                                    </svg>
                                </button>
                            </div>
                        @endif
                    @endforeach
                </div>
            </div>
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
