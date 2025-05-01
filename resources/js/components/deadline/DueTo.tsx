import React from "react";

type Props = {
    dayCount: number;
}

export default function DueTo(props: Props) {
    return (
        <p className="text-xs text-gray-500 mt-2">
            締切まであと
            <span className="font-bold text-green-500">
                {props.dayCount}
            </span> 日
        </p>
    );
}