import React, { useState } from 'react';
import {neighborhoods} from "../../data";

const InputComboBox = ({ value, onChange, placeholder }) => {
    const [inputValue, setInputValue] = useState(value);
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    // Convert array to only use neighborhood names (removing the "goal" property for display purposes)
    const neighborhoodNames = neighborhoods.map((neighborhood) => neighborhood.name).sort();

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        onChange(e.target.value);
        setDropdownVisible(true);
    };

    const handleOptionClick = (option) => {
        setInputValue(option);
        onChange(option);
        setDropdownVisible(false);
    };

    const filteredOptions = neighborhoodNames.filter((option) =>
        option.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
        <div className="relative ">
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="w-full p-3 text-sl border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onFocus={() => setDropdownVisible(true)}
            />
            {isDropdownVisible && filteredOptions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-52 overflow-y-auto dark:bg-gray-700 dark:border-gray-600">
                    {filteredOptions.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            className="p-2 py-1.5 text-gray-900 dark:text-white hover:bg-blue-500 hover:text-white cursor-pointer dark:hover:bg-blue-600"
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default InputComboBox;