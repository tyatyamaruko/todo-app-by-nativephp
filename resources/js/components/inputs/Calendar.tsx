import React from "react";

type Props = {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}

export default function Calendar({ value, onChange, disabled=false }: Props) {
    return (
        <input type="date" value={value} onChange={ onChange } className="border border-gray-300 p-2 w-full mb-4" disabled={disabled} />
    );
}