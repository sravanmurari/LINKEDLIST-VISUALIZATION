import React from 'react';

const LinkedListDetails = ({ nodes, type = 'SLL', log }) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-center gap-6">
        {nodes.map((node, idx) => (
          <div key={node.addr} className="text-sm">
            <div className={`rounded-xl shadow p-3 space-y-1 border ${
              node.newNode ? 'bg-green-100 border-green-400' : 'bg-blue-100 border-blue-300'
            }`}>
              <div className="text-xs text-gray-500">Addr: {node.addr}</div>

              {type === 'DLL' && (
                <div>
                  <span className="text-gray-700">Prev ➝ </span>
                  <span className="text-gray-600">{node.prev || 'null'}</span>
                </div>
              )}

              <div>
                <span className="font-semibold">Value:</span> {node.value}
              </div>

              <div>
                <span className="text-gray-700">Next ➝ </span>
                <span className="text-gray-600">{node.next || 'null'}</span>
              </div>
            </div>

            {idx < nodes.length - 1 && (
              <div className="text-center text-xl mt-2">⬇️</div>
            )}
          </div>
        ))}
      </div>

      {log && (
        <div className="text-green-700 font-medium text-center animate-pulse">{log}</div>
      )}
    </div>
  );
};

export default LinkedListDetails;
