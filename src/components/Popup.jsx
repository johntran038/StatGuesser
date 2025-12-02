import React from "react";

const Popup = ({ isOpen, onClose, onPlayAgain, children }) => {
  return (<>
    {isOpen &&
      <div className="fixed inset-0 flex items-center justify-center z-999">
        <div className="bg-white rounded-lg shadow-lg p-6 w-80 outline fadein">
          {children}
          <div className="flex justify-center gap-4">
            <button
              className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-500"
              onClick={onPlayAgain}
            >
              Play Again
            </button>
            <button
              className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-500"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    }
  </>);
};

export default Popup;