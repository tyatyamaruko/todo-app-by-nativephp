import React, { useEffect, useState } from 'react';
import Text from './inputs/Text';
import TextArea from './inputs/TextArea';
import Calendar from './inputs/Calendar';
import ApiClient from '@/apiClient';

type Props = {
    onClick?: () => void;
}

export default function TodoRegisterModal({ onClick }: Props) {

    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDueDate, setTaskDueDate] = useState('');

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

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center" onClick={onClick}>
            <div className="bg-white p-6 rounded-md shadow-md w-200" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-lg font-bold mb-4">新しいタスクを追加</h2>
                <Text placeholder="タスク名" onChange={updateTaskTitle} />
                <TextArea placeholder="タスクの概要" onChange={updateTaskDescription}/>
                <Calendar onChange={updateTaskDueDate}/>
                <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">追加</button>
            </div>
        </div>
    );
}