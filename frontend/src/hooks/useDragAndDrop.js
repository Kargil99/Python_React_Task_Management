import { useState } from 'react';

const useDragAndDrop = (initialItems) => {
    const [items, setItems] = useState(initialItems);

    const handleDragStart = (index) => {
        const draggedItem = items[index];
        setItems((prevItems) => 
            prevItems.filter((_, i) => i !== index)
        );
        return draggedItem;
    };

    const handleDrop = (index, draggedItem) => {
        setItems((prevItems) => {
            const newItems = [...prevItems];
            newItems.splice(index, 0, draggedItem);
            return newItems;
        });
    };

    return {
        items,
        handleDragStart,
        handleDrop,
    };
};

export default useDragAndDrop;