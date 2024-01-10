import React, { useState } from 'react';

const Dropdown = (  ) => {
  const [isOpen, setIsOpen] = useState(false);
  

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    const isSelected = selectedItems.includes(item);

    if (isSelected) {
      setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
    
  };

  return (
    <div className="relative inline-block text-left py-2 w-full">
      <button
        onClick={toggleDropdown}
        type="button"
        className="flex w-2/3 justify-start items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring focus:border-blue-300"
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
      >
        <div className="flex w-full">
          <div className="w-4/5 flex justify-start">
            Options
          </div>
          <div className="w-1/5 text-right flex justify-end items-center justify-items-end">
            <img src="/assets/icons/bottom.svg" className="ml-2 w-3 h-3" />
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="origin-top-left absolute left-0 mt-2 w-2/3 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          {/* Dropdown content goes here */}
          <div className="py-1">
            <label id="1" className="block px-4 py-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={selectedItems.includes('Item 1')}
                onChange={() => handleItemClick('Item 1')}
                className="mr-2"
              />
              Item 1
            </label>
            <label id="2" className="block px-4 py-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={selectedItems.includes('Item 2')}
                onChange={() => handleItemClick('Item 2')}
                className="mr-2"
              />
              Item 2
            </label>
            {/* Add more items as needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
