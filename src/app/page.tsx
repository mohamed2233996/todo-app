'use client';
import React, { useState } from 'react';

const App = () => {
    const [userInput, setUserInput] = useState('');
    const [list, setList] = useState([]);
    const [editIndex, setEditIndex] = useState(null); // Track index of item to edit

    // Set a user input value
    const updateInput = (value:string) => {
        setUserInput(value);
    };

    type todoitem={
      id: number,
      value: string,
    }

    // Add or edit item
    const handleAction = () => {
        if (userInput.trim() === '') return; // Avoid adding empty items

        if (editIndex !== null) {
            // Edit existing item
            const updatedList = list.map((item:todoitem, index: number) =>
                index === editIndex ? { ...item, value: userInput } : item
            );
            setList(updatedList as never[]);
            setEditIndex(null); // Reset edit mode
        } else {
            // Add new item
            const newItem = {
                id: Math.random(), // Consider using a more reliable ID generator
                value: userInput,
            };
            setList([...list, newItem]);
        }

        setUserInput(''); // Clear input field
    };

    // Function to delete item from list using id to delete
    const deleteItem = (id: any) => {
        const updatedList = list.filter((item) => item.id !== id);
        setList(updatedList);
    };

    // Function to enable editing mode
    const startEdit = (index: number | React.SetStateAction<null>) => {
        setUserInput(list[index].value);
        setEditIndex(index); // Set the index of the item to be edited
    };

    return (
        <div
            className='p-5 my-0 mx-auto max-w-[600px]:'
        >
            <div className='text-center text-[2.5rem] font-bold mb-5 text-purple-600'
            >
                Tasks To Do
            </div>
            <div className='text-center text-2xl font-bold mb-5'
            >
                TODO LIST
            </div>
            <div className='flex items-center mb-5'
            >
                <input className='text-xl p-2 mr-2 flex-grow rounded border borded-[#ccc]'
                    placeholder={editIndex !== null ? "Edit item..." : "Add item..."}
                    value={userInput}
                    onChange={(e) => updateInput(e.target.value)}
                />
                <button className='text-xl py-3 px-6 bg-[#4caf50] text-white border-none rounded-lg cursor-pointer'
                    onClick={handleAction}
                >
                    {editIndex !== null ? 'Update' : 'ADD'}
                </button>
            </div>
            <div className='bg-[#f9f9f9] p-5 rounded-lg'
            >
                {list.length > 0 ? (
                    list.map((item: todoitem, index:number) => (
                        <div className='flex justify-between items-center mb-2'
                            key={item.id}
                        >
                            <span className='text-xl flex-grow'>
                                {item.value}
                            </span>
                            <span>
                                <button className='p-2 text-white border-none rounded-lg cursor-pointer bg-[#f44336] mr-2'
                                    onClick={() => deleteItem(item.id)}
                                >
                                    Delete
                                </button>
                                <button className='p-2 text-white border-none rounded-lg cursor-pointer bg-purple-600' 
                                    onClick={() => startEdit(index)}
                                >
                                    Edit
                                </button>
                            </span>
                        </div>
                    ))
                ) : (
                    <div className='text-center text-[#777]'>
                        No items in the list
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
