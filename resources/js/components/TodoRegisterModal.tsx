import React, { useEffect, useState } from 'react';
import Text from './inputs/Text';
import TextArea from './inputs/TextArea';
import Calendar from './inputs/Calendar';
import ApiClient from '@/apiClient';
import MarkdownPreview from '@uiw/react-markdown-preview';
import Select from './inputs/Select';

type Props = {
    onClick?: () => void;
}

export default function TodoRegisterModal({ onClick }: Props) {

    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDueDate, setTaskDueDate] = useState('');

    const [isPreviewVisible, setIsPreviewVisible] = useState(false);

    const updateTaskTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.target.value);
    }
    const updateTaskDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTaskDescription(e.target.value);
    }
    const updateTaskDueDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskDueDate(e.target.value);
    }

    const addTask = async () => {
        const apiClient = new ApiClient('');
        await apiClient.post('/create', {
            title: taskTitle,
            description: taskDescription,
            deadline: taskDueDate,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }
        )
        .then(_ => {
            window.location.reload();
        })
        .catch(err => {
            throw err;
        });
    }

    const modalStyle = {
        height: '550px'
    }
    const previewStyle: React.CSSProperties = {
        height: "200px",
        width: "700px",
        overflowY: "scroll",
    }

    const onClose = () => {
        if (taskTitle || taskDescription || taskDueDate) {
            if (confirm('入力内容が失われますが、よろしいですか？')) {
                onClick?.();
            }
        } else {
            onClick?.();
        }
    }

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="relative bg-white p-6 rounded-md shadow-md w-[600px] h-[600px]" style={modalStyle} onClick={(e) => e.stopPropagation()}>
                <button
                className="absolute top-4 right-4 text-lg text-gray-700 hover:text-red-600 transition-colors duration-300 ease-in-out"
                onClick={onClose}
                >
                &times;
                </button>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="flex-grow text-lg font-bold mb-4">新しいタスクを追加</h2>
                    {/* <Select options={[{label: "hoge", value: "fuga"}]} label={"ステータス"}/> */}
                </div>
                <Text placeholder="タスク名" onChange={updateTaskTitle} />
                <div className="flex-grow">
                {
                !isPreviewVisible
                ? <TextArea placeholder="タスクの詳細" value={taskDescription} onChange={updateTaskDescription} />
                : <div style={previewStyle} className="prose border border-gray-150 p-3 w-full mb-4 rounded-md">
                    <MarkdownPreview source={taskDescription} style={{backgroundColor: 'transparent'}}
                    />
                    </div>
                }
                </div>
                <div className="flex justify-end">
                    {!isPreviewVisible ? <button onClick={() => setIsPreviewVisible((prev) => !prev)} className="bg-gray-300 text-gray-700 px-3 py-2 text-sm rounded-md mb-4 hover:bg-gray-400">
                        プレビュー
                    </button> : <button onClick={() => setIsPreviewVisible((prev) => !prev)} className="bg-gray-300 text-gray-700 px-3 py-2 text-sm rounded-md mb-4 hover:bg-gray-400">
                        編集
                    </button>}
                </div>
                <Calendar onChange={updateTaskDueDate}/>
                <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded-md w-full mt-2">追加</button>
            </div>
        </div>
    );
}