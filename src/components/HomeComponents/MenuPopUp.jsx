import React, { useState } from "react";
// import { Tooltip } from "@material-tailwind/react";

const MenuPopUp = ({ isOpen, onClose, onPlayAgain, hasWon, hasLost, currentWordDetails, showDemo, setShowDemo }) => {

  const gameOver = hasWon || hasLost;
  const [switchToggle, setSwitchToggle] = useState(false);

  const renderSwitchToggle = () => {
    return (
      <div className="flex justify-center py-2">
        <label htmlFor="switch-component" className="mr-2">Demo</label>
        <div className="relative inline-block w-11 h-5">
          <input id="switch-component" type="checkbox"
            className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-[#7BBB7B] cursor-pointer transition-colors duration-300"
            checked={showDemo}
            onChange={() => { setShowDemo(prev => !prev) }}
          />
          <label htmlFor="switch-component" className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer">
          </label>
        </div>
      </div>
    )
  };

  return (<>
    {isOpen &&
      <div className="fixed inset-0 flex items-center justify-center z-999 pointer-events-none">
        <div className={`bg-white rounded-lg shadow-lg p-6 w-80 outline pointer-events-auto ${gameOver ? "fadein" : ""}`}>
          <div className="flex flex-col items-center">
            <img className="w-20 h-20" src="./StatGuesser.png" alt="Logo" />
            <div className="flex justify-center text-xl font-bold">Stat Guesser</div>
            {(gameOver) && <div className="flex flex-col items-center">
              <h2 className="text-xl font-bold">{hasWon ? "Congratulations! You won!" : "Oh No!"}</h2>
              {hasWon && <div>You have won!</div>}
              {hasLost && <div>You have lost :(</div>}
              <p>The word is: {currentWordDetails?.name}</p>
            </div>}
          </div>
          {renderSwitchToggle()}
          <div className="flex justify-center gap-4">
            {gameOver &&
              <button onClick={onPlayAgain} className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-500">
                Play Again
              </button>
            }
            <button onClick={onClose} className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-500">
              Close
            </button>
          </div>
        </div>
      </div>
    }
  </>);
};

export default MenuPopUp;