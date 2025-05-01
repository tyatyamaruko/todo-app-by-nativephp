import React from "react";

type Props = {
    dayCount: number;
}

export default function OverDue(props: Props) {
    return (
        <p className="text-xs text-gray-500 mt-2">
            期日から
            <span className="font-bold text-red-500">
                {props.dayCount}
            </span> 日過ぎています。
        </p>
    );
}