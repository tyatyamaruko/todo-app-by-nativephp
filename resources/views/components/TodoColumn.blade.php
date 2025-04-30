<div class="flex flex-col w-72 bg-gray-100 rounded-lg overflow-hidden shadow-md">
    @php
        $bgColor = match($status) {
            'pending' => 'bg-indigo-600',
            'in-progress' => 'bg-yellow-500',
            'done' => 'bg-green-600',
            default => 'bg-gray-600',
        }
    @endphp
    <div class="{{ $bgColor }} text-white text-center p-2 uppercase font-semibold">{{ $title }}</div>
    <div id="{{$status}}" class="p-4 space-y-3 kanban-column-content flex-grow">
        @foreach ($todos as $todo)
            <div class="kanban-card {{$status}} bg-white p-4 rounded-lg shadow-md flex justify-between items-center transition-shadow hover:shadow-lg"
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
        @endforeach
    </div>
</div>