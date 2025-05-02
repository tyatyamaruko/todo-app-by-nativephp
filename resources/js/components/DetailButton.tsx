import React from "react";
type Props = {
  onClick?: () => void;
};
export default function DetailsButton({ onClick }: Props) {
  return (
    <button
      className="bg-blue-100 hover:bg-blue-300 text-blue-500 hover:text-blue-700 transition-all p-2 rounded-full focus:outline-none"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 fill-current"
        viewBox="0 0 24 24"
      >
        <text
          x="12"
          y="20"  // Positioned slightly lower for vertical centering
          textAnchor="middle"
          fontSize="22"
          fontWeight="bold"  // Make the "i" bold
          fill="currentColor"
        >
          i
        </text>
      </svg>
    </button>
  );
}