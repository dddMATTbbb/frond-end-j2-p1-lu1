import React from 'react';

// Types voor de props die het component accepteert
export interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    color?: 'primary' | 'secondary' | 'white' | 'current';
    className?: string;
}

// Map maten naar Tailwind klasses
const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4',
};

// Map kleuren naar Tailwind klasses
const colorClasses = {
    primary: 'border-blue-600 border-t-transparent',
    secondary: 'border-gray-600 border-t-transparent',
    white: 'border-white border-t-transparent',
    current: 'border-current border-t-transparent',
};

export const Spinner: React.FC<SpinnerProps> = ({size = 'md', color = 'primary', className = '',}) => {
    return (
        <div
            role="status"
            aria-label="Laden..."
            className={`
        inline-block
        rounded-full
        animate-spin
        ${sizeClasses[size]}
        ${colorClasses[color]}
        ${className}
      `}
        >
            <span className="sr-only">Laden...</span>
        </div>
    );
};

export default Spinner;