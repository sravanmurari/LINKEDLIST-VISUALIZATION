import React from 'react';
import { motion } from 'framer-motion';

const NodeBlock = ({
  value,
  address,
  nextAddress,
  prevAddress,
  isHead,
  isTail,
  isDoubly,
  isCircular,
  highlight,
  newNode,
  toDelete,
  highlightPrev,
  highlightNext,
}) => {
  const displayNext = isTail && isCircular ? '↩️ HEAD' : nextAddress || 'NULL';

  return (
    <motion.div
      className="flex items-center space-x-2 relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      layout
    >
      {/* Red pulsing ring for deletion */}
      {toDelete && (
        <motion.div
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 1.2, opacity: 0.5 }}
          transition={{ duration: 0.4, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
          className="absolute inset-0 rounded-xl border-4 border-red-500 pointer-events-none z-0"
        />
      )}


      <div className="flex flex-col items-center z-10">
        {isHead && <div className="text-green-600 text-xs mb-1 font-bold">HEAD</div>}

        <div
          className={`flex rounded overflow-hidden shadow-md border border-gray-300 transition-all duration-300 bg-white ${
            toDelete ? 'opacity-70 grayscale' : ''
          }`}
        >
          {isDoubly && (
            <div
              className={`p-3 w-28 flex flex-col items-center justify-center text-xs border-r ${
                highlightPrev ? 'bg-yellow-300 text-black' : 'bg-blue-100 text-gray-700'
              }`}
            >
              <div>Prev</div>
              <div className="font-mono">{prevAddress || 'NULL'}</div>
            </div>
          )}

          <div
            className={`p-3 w-16 flex items-center justify-center font-semibold border-r ${
              newNode
                ? 'bg-green-300 text-black'
                : highlight
                ? 'bg-yellow-300 text-black'
                : 'bg-white text-black'
            }`}
          >
            {value}
          </div>

          <div
            className={`p-3 w-28 flex flex-col items-center justify-center text-xs ${
              highlightNext ? 'bg-yellow-300 text-black' : 'bg-green-100 text-gray-700'
            }`}
          >
            <div>Next</div>
            <div className="font-mono">{displayNext}</div>
          </div>
        </div>

        {isTail && <div className="text-red-600 text-xs mt-1 font-bold">TAIL</div>}
        <div className="text-[10px] text-gray-500 mt-1 font-mono">[{address}]</div>
      </div>

      <div className="text-blue-500 text-lg z-10">
        {nextAddress && (isCircular && isTail ? '↩️' : isDoubly ? '⇄' : '➡️')}
      </div>
    </motion.div>
  );
};

export default NodeBlock;
