import React from 'react';
import TodoColumn from '../components/TodoColumn';
import { Todo as TodoModel } from '@/models/Todo';
import RightBottomFloatButton from '../components/RightBottomFloatButton';
import TodoRegisterModal from '@/components/TodoRegisterModal';
import { useState } from 'react';
import ApiClient from '@/apiClient';
import Modal from '@/components/Modal';
import Text from '@/components/inputs/Text';
import MarkdownPreview from '@uiw/react-markdown-preview';
import Calendar from '@/components/inputs/Calendar';

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


    const [isShowRegisterModal, setIsShowRegisterModal] = useState(false);
    const [targetTodo, setTargetTodo] = useState<TodoModel | null>(null);

    const toggleRegisterModal = () => {
        setIsShowRegisterModal((isShowModal) => !isShowModal);
    }

    const toggleDetailModal = () => {
        setTargetTodo(null);
    }

    const columnType = [
        {
            title: 'pending',
            status: 'pending',
            bgColor: 'bg-red-500',
        },
        {
            title: 'in progress',
            status: 'in-progress',
            bgColor: 'bg-yellow-500',
        },
        {
            title: 'done',
            status: 'done',
            bgColor: 'bg-green-500',
        },
    ];

    const previewStyle: React.CSSProperties = {
        height: "300px",
        width: "700px",
        overflowY: "scroll",
    }

    const todoDetail = (
        <>
            <Text placeholder="タスク名" disabled={ true } value={targetTodo?.title}/>
            <div className="flex-grow">
                <div style={previewStyle} className="prose border border-gray-150 p-3 w-full mb-4 rounded-md">
                    <MarkdownPreview source={targetTodo?.description} style={{backgroundColor: 'transparent'}}
                    />
                </div>
            </div>
            <Calendar disabled={ true } value={targetTodo?.deadline ?? undefined}/>
        </>
    )

    return (
        <div>
            <div className="flex flex-col items-center">
                <div className="flex gap-8 p-6 bg-white shadow-lg rounded-lg">
                    {
                        columnType.map((column) =>
                            <TodoColumn
                                key={column.status}
                                title={column.title}
                                todos={todos.filter((todo) => todo.isStatus(column.status))}
                                status={column.status}
                                bgColor={column.bgColor}
                                onDragStart={dragStart}
                                onDragEnd={drop}
                                onDragOver={dropOver}
                                selectTodo={(todo) => setTargetTodo(todo as TodoModel)}
                            />
                        )
                    }
                </div>
                <RightBottomFloatButton text="+" onClick={ () => toggleRegisterModal() } />
                { isShowRegisterModal && <TodoRegisterModal onClick={ () => toggleRegisterModal() }/> }
                { targetTodo !== null && <Modal onClick={ () => toggleDetailModal() } children={todoDetail} />}
            </div>
        </div>
    );
}
