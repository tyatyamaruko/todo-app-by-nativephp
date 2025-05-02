import React from 'react'

export default function InformationIcon() {
    return (
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
    )
}