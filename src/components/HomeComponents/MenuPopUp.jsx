import React from "react";

const MenuPopUp = ({ isOpen, onClose, onPlayAgain, hasWon, hasLost, currentWordDetails }) => {
  return (<>
    {isOpen &&
      <div className="fixed inset-0 flex items-center justify-center z-999">
        <div className={`bg-white rounded-lg shadow-lg p-6 w-80 outline ${hasWon || hasLost ? "fadein" : ""}`}>
          <div className="flex flex-col items-center">
            <img className="w-20 h-20" src="./StatGuesser.png" alt="Logo" />
            <div className="flex justify-center text-xl font-bold">Stat Guesser</div>
            {(hasWon || hasLost) && <div className="flex flex-col items-center">
              <h2 className="text-xl font-bold">{hasWon ? "Congratulations! You won!" : "Oh No!"}</h2>
              {hasWon && <div>You have won!</div>}
              {hasLost && <div>You have lost :(</div>}
              <p>The word is: {currentWordDetails?.name}</p>
            </div>}
          </div>
          <div className="flex justify-center gap-4">
            {hasWon || hasLost &&
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