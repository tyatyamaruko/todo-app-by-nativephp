import React from "react";

type Props = {
    onClick?: () => void;
}

export default function DeleteButton({onClick}: Props) {
    return (
        <button
            className="bg-red-100 hover:bg-red-300 text-red-500 hover:text-red-700 transition-all p-2 rounded-full focus:outline-none" onClick={onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current"
                viewBox="0 0 24 24">
                <path d="M3 6h18v2H3V6zm3 14h12v-1H6v1zm0-9.5V19h12V10.5H6z" />
            </svg>
        </button>
    );
}