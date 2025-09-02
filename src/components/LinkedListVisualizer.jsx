import React, { useState, useEffect } from 'react';
import { SinglyLinkedList } from './utils/SinglyLinkedList';
import { DoublyLinkedList } from './utils/DoublyLinkedList';
import { CircularLinkedList } from './utils/CircularLinkedList';
import NodeBlock from './NodeBlock';
import ControlPanel from './ControlPanel';

const LinkedListVisualizer = ({ type }) => {
  const createList = () => {
    if (type === 'Singly Linked List') return new SinglyLinkedList();
    if (type === 'Doubly Linked List') return new DoublyLinkedList();
    if (type === 'Circular Linked List') return new CircularLinkedList();
    return new SinglyLinkedList();
  };

  const [nodes, setNodes] = useState([]);
  const [list, setList] = useState(createList());
  const [logs, setLogs] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const newList = createList();
    setList(newList);
    setNodes(newList.toArray());
    setLogs([`🔄 Switched to ${type}`]);
  }, [type]);

  const refresh = () => {
    setNodes(list.toArray());
  };

  const addLog = (msg) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, `[${timestamp}] ${msg}`]);
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleAction = (action, payload) => {
    const length = list.toArray().length;

    switch (action) {
      case 'insertHead':
        if (payload === '') return showMessage('⚠️ Enter a value!');
        list.insertAtHead(Number(payload));
        addLog(`🟢 Inserted ${payload} at head`);
        refresh();
        break;

      case 'insertTail':
        if (payload === '') return showMessage('⚠️ Enter a value!');
        list.insertAtTail(Number(payload));
        addLog(`🔵 Inserted ${payload} at tail`);
        refresh();
        break;

      case 'insertAt':
        if (payload.value === '' || payload.index === '') return showMessage('⚠️ Enter both value and index!');
        if (Number(payload.index) > length) return showMessage('❌ Invalid index!');
        list.insertAtIndex(Number(payload.value), Number(payload.index));
        addLog(`🟡 Inserted ${payload.value} at index ${payload.index}`);
        refresh();
        break;

      case 'deleteAt':
        if (payload === '') return showMessage('⚠️ Enter index!');
        if (Number(payload) >= length) return showMessage('❌ Invalid index!');
        list.deleteAtIndex(Number(payload));
        addLog(`🗑️ Deleted node at index ${payload}`);
        refresh();
        break;

      case 'deleteHead':
        list.deleteHead();
        addLog('🗑️ Deleted head node');
        refresh();
        break;

      case 'deleteTail':
        list.deleteTail();
        addLog('🗑️ Deleted tail node');
        refresh();
        break;

      case 'random':
        list.generateRandomList();
        addLog('🎲 Generated random linked list');
        refresh();
        break;

      case 'search':
        if (payload === '') return showMessage('⚠️ Enter value to search!');
        const originalNodes = list.toArray();
        let index = 0;

        const searchStep = () => {
          if (index >= originalNodes.length) {
            addLog(`❌ Search failed: ${payload} not found`);
            showMessage('❌ Value not found!');
            return;
          }

          const updated = originalNodes.map((node, i) => ({
            ...node,
            highlight: i === index,
          }));

          setNodes(updated);

          if (updated[index].value === Number(payload)) {
            setTimeout(() => {
              addLog(`✅ Found ${payload} at index ${index}`);
              showMessage(`✅ Found at index ${index}`);
            }, 300);
            return;
          }

          index++;
          setTimeout(searchStep, 500);
        };

        addLog(`🔍 Searching for value: ${payload}`);
        searchStep();
        break;

      default:
        console.warn('Unknown action');
    }
  };

  const clearLogs = () => {
    setLogs([]);
    addLog('🧹 Logs cleared');
  };

  return (
    <div className="space-y-6 p-4 max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold text-center">Linked List Visualizer</h2>

      <ControlPanel onAction={handleAction} />

      {message && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 font-semibold rounded-md shadow-md text-center">
          {message}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-3">
        {nodes.length === 0 ? (
          <p className="text-gray-500">No nodes. Add or generate!</p>
        ) : (
          nodes.map((node, idx) => (
            <NodeBlock
              key={node.address}
              value={node.value}
              address={node.address}
              nextAddress={node.nextAddress}
              prevAddress={node.prevAddress}
              isHead={idx === 0}
              isTail={idx === nodes.length - 1}
              isDoubly={type === 'Doubly Linked List'}
              isCircular={type === 'Circular Linked List'}
              highlight={node.highlight}
              highlightPrev={node.highlightPrev}
              highlightNext={node.highlightNext}
              newNode={node.newNode}
              toDelete={node.toDelete}
            />
          ))
        )}
      </div>

      {/* Operation Logs */}
      <div className="bg-gray-100 p-4 border rounded-lg max-h-60 overflow-y-auto font-mono text-sm space-y-1 shadow-inner">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-gray-700">📜 Operation Logs</span>
          <button
            onClick={clearLogs}
            className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
          >
            Clear Logs
          </button>
        </div>
        {logs.length === 0 ? (
          <div className="text-gray-400 italic">No logs yet...</div>
        ) : (
          logs.map((log, idx) => <div key={idx}>{log}</div>)
        )}
      </div>
    </div>
  );
};

export default LinkedListVisualizer;
