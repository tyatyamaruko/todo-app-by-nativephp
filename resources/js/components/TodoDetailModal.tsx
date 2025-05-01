import React from 'react';
import Text from './inputs/Text';
import Calendar from './inputs/Calendar';
import MarkdownPreview from '@uiw/react-markdown-preview';
import TodoInterface from '@/types/TodoInterface';

type Props = {
    todo: TodoInterface | null;
    onClick?: () => void;
}

export default function TodoDetailModal({ todo, onClick }: Props) {

    const modalStyle = {
        height: '550px'
    }
    const previewStyle: React.CSSProperties = {
        height: "200px",
        width: "700px",
        overflowY: "scroll",
    }

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center" onClick={onClick}>
            <div className="bg-white p-6 rounded-md shadow-md w-[600px] h-[600px]" style={modalStyle} onClick={(e) => e.stopPropagation()}>
                <Text placeholder="タスク名" disabled={ true } value={todo?.title}/>
                <div className="flex-grow">
                    <div style={previewStyle} className="prose border border-gray-150 p-3 w-full mb-4 rounded-md">
                        <MarkdownPreview source={todo?.description} style={{backgroundColor: 'transparent'}}
                        />
                    </div>
                </div>
                <Calendar disabled={ true } value={todo?.deadline ?? undefined}/>
            </div>
        </div>
    );
}