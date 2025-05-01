import React from 'react';

type Props = {
    onClick?: () => void;
    text: string;
}

export default function RightBottomFloatButton(props: Props) {
    const { onClick, text } = props;
    return (
        <button
            className="bg-blue-500 text-white fixed text-2xl bottom-10 right-10 px-4 py-2 rounded-full shadow-md"
            onClick={ onClick }
            >{ text }</button>
    )
}
