import React from 'react';
import TodoColumn from '../components/TodoColumn';
import { Todo as TodoModel } from '@/models/Todo';
import RightBottomFloatButton from '../components/RightBottomFloatButton';
import TodoRegisterModal from '@/components/TodoRegisterModal';
import { useState } from 'react';
import ApiClient from '@/apiClient';

type TodoProps = {
    todos: TodoObject[];
};

type TodoObject = {
    id: number;
    title: string;
    description: string;
    status: string;
    deadline: string;
}

export default function Todo(todoProps: TodoProps) {
    const [todos, setTodos] = useState<TodoModel[]>(todoProps.todos.map((todo) => {
        return new TodoModel(
            todo.id,
            todo.title,
            todo.description,
            todo.status,
            todo.deadline,
        );
    }));

    const [draggedTodoId, setDraggedTodoId] = useState<number | null>(null);

    const dragStart = (e: React.DragEvent<HTMLDivElement>, todoId: number) => {
        setDraggedTodoId(todoId);
    };

    const dropOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); // ドロップを許可
    };

    const drop = (e: React.DragEvent<HTMLDivElement>, newStatus: string) => {
        e.preventDefault();
        if (draggedTodoId === null) return;

        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === draggedTodoId
                    ? new TodoModel(
                          todo.id,
                          todo.title,
                          todo.description,
                          newStatus,
                          todo.deadline
                      )
                    : todo
            )
        );
        setDraggedTodoId(null);

        updateTodoStatus(draggedTodoId, newStatus);
    };

    const updateTodoStatus = async (todoId: number, newStatus: string) => {
        const apiClient = new ApiClient('');
        await apiClient.post(`/update/${todoId}`, {
            status: newStatus,
        })
        .then((response: Response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((_: unknown) => {
            window.location.reload();
        })
        .catch((err: any) => {
            throw err;
        });
    }


    const [isShowModal, setIsShowModal] = useState(false);

    const toggleModal = () => {
        setIsShowModal((isShowModal) => !isShowModal);
    }

    return (
        <div>
            <div className="flex flex-col items-center">
                <div className="flex gap-8 p-6 bg-white shadow-lg rounded-lg">
                    <TodoColumn
                        title="pending"
                        todos={todos.filter((todo) => todo.isPending())}
                        status="pending"
                        bgColor="bg-red-500"
                        onDragStart={dragStart}
                        onDragEnd={drop}
                        onDragOver={dropOver}
                    />
                    <TodoColumn
                        title="in progress"
                        todos={todos.filter((todo) => todo.isProgress())}
                        status="in-progress"
                        bgColor="bg-yellow-500"
                        onDragStart={dragStart}
                        onDragEnd={drop}
                        onDragOver={dropOver}
                    />
                    <TodoColumn
                        title="done"
                        todos={todos.filter((todo) => todo.isCompleted())}
                        status="done"
                        bgColor="bg-green-500"
                        onDragStart={dragStart}
                        onDragEnd={drop}
                        onDragOver={dropOver}
                    />
                </div>
                <RightBottomFloatButton text="+" onClick={ () => toggleModal() } />
                { isShowModal && <TodoRegisterModal onClick={ () => toggleModal() }/> }
            </div>
        </div>
    );
}
