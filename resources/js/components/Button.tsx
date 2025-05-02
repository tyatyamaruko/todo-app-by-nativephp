import React from "react";
type Props = {
  children: React.ReactNode;
  color?: string;
  onClick?: () => void;
};
export default function Button({ children, color="blue", onClick }: Props) {
  return (
    <button
      className={` bg-${color}-100 hover:bg-${color}-300 text-${color}-500 hover:text-${color}-700 transition-all p-2 rounded-full focus:outline-none`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}