import React from 'react';

interface AddToCartControlsProps {
    count: number;
    onAdd: () => void;
    onChangeCount: (delta: number) => void;
    fullWidth?: boolean;
    className?: string;
}

const AddToCartControls: React.FC<AddToCartControlsProps> = ({
    count,
    onAdd,
    onChangeCount,
    fullWidth = false,
    className
}) => {
    if (count === 0) {
        return (
            <button
                onClick={onAdd}
                className={`${className} bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-xl transition ${fullWidth ? 'w-full' : ''
                    }`}
            >
                В корзину
            </button>
        );
    }

    return (
        <div className={`flex items-center gap-4 ${fullWidth ? 'w-full justify-center' : ''} ${className}`}>
            <button
                onClick={() => onChangeCount(-1)}
                className="font-bold py-2 px-4 bg-gray-300 rounded-xl hover:bg-gray-400"
            >
                -
            </button>
            <span>{count}</span>
            <button
                onClick={() => onChangeCount(1)}
                className="font-bold py-2 px-4 bg-gray-300 rounded-xl hover:bg-gray-400"
            >
                +
            </button>
        </div>
    );
};

export default AddToCartControls;
