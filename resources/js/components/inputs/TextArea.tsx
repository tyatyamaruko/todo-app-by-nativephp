import React from "react";

type Props = {
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea({ placeholder, onChange }: Props) {
    return (
        <textarea className="border border-gray-300 p-2 w-full mb-4" onChange={onChange} placeholder={ placeholder }></textarea>
    );
}