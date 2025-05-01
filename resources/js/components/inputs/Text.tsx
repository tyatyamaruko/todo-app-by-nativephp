import React from "react";

type Props = {
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Text({ placeholder, onChange }: Props) {
    return (
        <input type="text" onChange={onChange} className="border border-gray-300 p-2 w-full mb-4" placeholder={ placeholder } />
    );
}