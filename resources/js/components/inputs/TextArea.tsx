import React from "react";

type Props = {
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea({ placeholder, value, onChange }: Props) {
    const style: React.CSSProperties = {
        height: "200px",
        width: "700px",
        resize: "none"
    }
    return (
        <textarea className="h-32 border border-gray-300 p-2 w-full mb-4 rounded-md" style={style} onChange={onChange} value={value} placeholder={ placeholder }></textarea>
    );
}