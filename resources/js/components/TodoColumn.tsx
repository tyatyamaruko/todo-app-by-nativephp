import TodoInterface from "@/types/TodoInterface";
import React from "react";
import TodoCard from "./TodoCard";

type Props = {
    title: String;
    todos: TodoInterface[];
    status: string;
    bgColor: string;
    onDragStart: (e: React.DragEvent<HTMLDivElement>, todoId: number) => void;
    onDragEnd: (e: React.DragEvent<HTMLDivElement>, newStatus: string) => void;
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
}


export default function TodoColumn(props: Props) {

    return (
        <div className="flex flex-col w-72 bg-gray-100 rounded-lg overflow-hidden shadow-md">
            <div className={`${props.bgColor} text-white text-center p-2 uppercase font-semibold`}>{props.title}</div>
            <div className="p-4 space-y-3 kanban-column-content flex-grow" onDragOver={props.onDragOver} onDrop={(e) => props.onDragEnd(e, props.status)}>
                {
                    props.todos.map((todo) => (
                        <TodoCard key={todo.id} todo={todo} onDragStart={props.onDragStart}></TodoCard>
                    ))
                }
            </div>
        </div>
    );
}
