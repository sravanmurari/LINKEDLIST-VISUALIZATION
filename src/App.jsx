import React, { useState } from 'react';
import LinkedListVisualizer from './components/LinkedListVisualizer';
import CodeDisplay from './components/CodeDisplay';

function App() {
  const [type, setType] = useState('Singly Linked List');

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">🔗 Linked List Playground</h1>

      {/* Visualizer Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-center">🎨 Visualizer</h2>
        <div className="flex justify-center mb-6">
          <select
            className="p-2 border border-gray-300 rounded"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Singly Linked List">Singly Linked List</option>
            <option value="Doubly Linked List">Doubly Linked List</option>
            <option value="Circular Linked List">Circular Linked List</option>
          </select>
        </div>
        <LinkedListVisualizer type={type} />
      </section>

      {/* Code Viewer Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-center">💻 Code Viewer</h2>
        <CodeDisplay type={type} />
      </section>
    </div>
  );
}

export default App;
