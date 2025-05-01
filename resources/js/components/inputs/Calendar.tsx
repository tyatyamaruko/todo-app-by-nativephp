import React from "react";

type Props = {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Calendar({ onChange }: Props) {
    return (
        <input type="date" onChange={ onChange } className="border border-gray-300 p-2 w-full mb-4" />
    );
}