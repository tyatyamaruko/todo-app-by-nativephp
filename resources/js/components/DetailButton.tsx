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
        <path d="M12 4.5c-4.14 0-7.5 3.36-7.5 7.5s3.36 7.5 7.5 7.5 7.5-3.36 7.5-7.5-3.36-7.5-7.5-7.5zm-.5 3v6.25l5.25 3.15.75-1.23-4.5-2.72V7.5h-1.5z" />
      </svg>
    </button>
  );
}