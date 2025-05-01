import TodoInterface from "@/types/TodoInterface";
import React from "react";
import DueTo from "./deadline/DueTo";
import OverDue from "./deadline/OverDue";
import Today from "./deadline/Today";
import DeleteButton from "./DeleteButton";
import DetailButton from "./DetailButton";
import ApiClient from "@/apiClient";
import MarkdownPreview from '@uiw/react-markdown-preview';

type Props = {
    todo: TodoInterface;
    onDragStart: (e: React.DragEvent<HTMLDivElement>, todoId: number) => void;
    selectTodo: (todo: TodoInterface) => void;
}


export default function TodoColumn({ todo, onDragStart, selectTodo }: Props) {

    const deleteTask = async () => {
        if (!confirm('本当に削除しますか？')) {
            return;
        }
        const apiClient = new ApiClient('');
        await apiClient.post(`/delete/${todo.id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(_ => {
            window.location.reload();
        })
        .catch(err => {
            throw err;
        });
    }

    const showDeadlineComponent = () => {
        if (todo.deadline === null) {
            return null;
        }

        if (!todo.isOverdue()) {
            return <DueTo dayCount={todo.dueTodays()} />;
        } else if (todo.dueTodays() !== 0) {
            return <OverDue dayCount={todo.dueTodays()} />;
        } else if (todo.dueTodays() === 0) {
            return <Today />;
        }
    }

    return (
        <div onDragStart={(e) => onDragStart(e, todo.id)} className="kanban-card {{$status}} bg-white p-4 rounded-lg shadow-md flex justify-between items-center transition-shadow hover:shadow-lg" draggable="true" id={ String(todo.id) }>
            <div className="flex-shrink">
                <h3 className="font-bold text-gray-800">{ todo.title }</h3>
                <MarkdownPreview source={todo.description} style={{backgroundColor: 'transparent'}} />
                { showDeadlineComponent() }
            </div>
            <div className="flex flex-col space-y-2"> {/* 複数のボタンを持つための div を追加 */}
                <DetailButton onClick={() => {selectTodo(todo)}} /> {/* カスタムの詳細ボタン */}
                <DeleteButton onClick={deleteTask} />
            </div>
        </div>
    );
}
