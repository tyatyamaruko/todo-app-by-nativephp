import React from 'react';

type Props = {
    children?: React.ReactNode;
    onClick?: () => void;
}

export default function Modal({ children, onClick }: Props) {

    const modalStyle = {
        height: '550px'
    }

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center" onClick={onClick}>
            <div className="bg-white p-6 rounded-md shadow-md w-[600px] h-[600px]" style={modalStyle} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}