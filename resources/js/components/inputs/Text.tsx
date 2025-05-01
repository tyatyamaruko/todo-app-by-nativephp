import React from "react";

type Props = {
    value?: string;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}

export default function Text({ value, placeholder, onChange, disabled = false }: Props) {
    return (
        <input type="text" value={value} onChange={onChange} className="border border-gray-300 p-2 w-full mb-4" placeholder={ placeholder } disabled={disabled} />
    );
}