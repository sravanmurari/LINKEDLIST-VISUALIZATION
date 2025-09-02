import React, { useState } from 'react';

const ControlPanel = ({ onAction }) => {
  const [value, setValue] = useState('');
  const [index, setIndex] = useState('');
  const [activeMode, setActiveMode] = useState(null); // insertHead, insertTail, insertAt, deleteAt, search

  const inputClass =
    'p-2 border border-gray-300 rounded-md w-24 focus:outline-none focus:ring-2 focus:ring-blue-400';

  const buttonClass =
    'px-3 py-2 rounded-md text-white font-semibold shadow transition duration-200 ease-in-out transform hover:scale-105';

  const showValue = ['insertHead', 'insertTail', 'insertAt', 'search'].includes(activeMode);
  const showIndex = ['insertAt', 'deleteAt'].includes(activeMode);

  const handleSubmit = () => {
    if (activeMode === 'insertAt') {
      if (value !== '' && index !== '') onAction('insertAt', { value, index });
    } else if (activeMode === 'insertHead' || activeMode === 'insertTail') {
      if (value !== '') onAction(activeMode, value);
    } else if (activeMode === 'deleteAt') {
      if (index !== '') onAction('deleteAt', index);
    } else if (activeMode === 'search') {
      if (value !== '') onAction('search', value);
    }

    setValue('');
    setIndex('');
    setActiveMode(null);
  };

  return (
    <div className="flex flex-wrap gap-3 items-center justify-center mb-6">
      {showValue && (
        <input
          type="number"
          placeholder={activeMode === 'search' ? 'Search Value' : 'Value'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={inputClass}
        />
      )}
      {showIndex && (
        <input
          type="number"
          placeholder="Index"
          value={index}
          onChange={(e) => setIndex(e.target.value)}
          className={inputClass}
        />
      )}

      {activeMode && (
        <button
          onClick={handleSubmit}
          className={`${buttonClass} bg-black hover:bg-gray-800`}
        >
          ✅ Submit
        </button>
      )}

      <button
        onClick={() => setActiveMode('insertHead')}
        className={`${buttonClass} bg-blue-500 hover:bg-blue-600`}
      >
        Insert Head
      </button>

      <button
        onClick={() => setActiveMode('insertTail')}
        className={`${buttonClass} bg-green-500 hover:bg-green-600`}
      >
        Insert Tail
      </button>

      <button
        onClick={() => setActiveMode('insertAt')}
        className={`${buttonClass} bg-yellow-500 hover:bg-yellow-600 text-black`}
      >
        Insert At Index
      </button>

      <button
        onClick={() => {
          onAction('deleteHead');
          setActiveMode(null);
        }}
        className={`${buttonClass} bg-red-500 hover:bg-red-600`}
      >
        Delete Head
      </button>

      <button
        onClick={() => {
          onAction('deleteTail');
          setActiveMode(null);
        }}
        className={`${buttonClass} bg-pink-500 hover:bg-pink-600`}
      >
        Delete Tail
      </button>

      <button
        onClick={() => setActiveMode('deleteAt')}
        className={`${buttonClass} bg-orange-500 hover:bg-orange-600 text-black`}
      >
        Delete At Index
      </button>

      <button
        onClick={() => {
          onAction('random');
          setActiveMode(null);
        }}
        className={`${buttonClass} bg-purple-600 hover:bg-purple-700`}
      >
        🎲 Random List
      </button>

      <button
        onClick={() => setActiveMode('search')}
        className={`${buttonClass} bg-teal-500 hover:bg-teal-600`}
      >
        🔍 Search
      </button>
    </div>
  );
};

export default ControlPanel;
