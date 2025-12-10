import React, { useEffect, useState } from "react";
import GuessingUI from "../components/GuessingComponents/GuessingUI";
import StatUI from "../components/StatComponents/StatUI";
import useMonster from "../hooks/useMonster";
import ListOfMonsters from "../components/HomeComponents/ListOfMonsters";
import MenuPopUp from "../components/HomeComponents/MenuPopUp";
import Nav from "../components/HomeComponents/Nav"
import KeyboardPopUp from "../components/HomeComponents/KeyboardPopUp";

const Home = () => {

    const MAX_GUESSES = 6;

    const { loading, currentWord, resetKit, currentWordDetails, listOfMonsters, maxLength } = useMonster();
    const [hasWon, setHasWon] = useState(false);
    const [hasLost, setHasLost] = useState(false);
    const [attemptCount, setAttemptCount] = useState(0);
    const [playAgain, setPlayAgain] = useState(false);

    const [maxGuesses, setMaxGuesses] = useState(MAX_GUESSES);
    const [menuOpen, setMenuOpen] = useState(false);

    const [toggleKeyboard, setToggleKeyboard] = useState(true);
    const [keyboardInput, setKeyboardInput] = useState('');
    const [keyboardColors, setKeyboardColors] = useState([]);

    const [showDemo, setShowDemo] = useState(false);

    useEffect(() => {
        // If you win or lose, show the popup
        if (menuOpen && (hasWon || hasLost)) {
            // Prevent scrolling
            document.body.style.overflow = "hidden";
        } else {
            // Restore scrolling
            document.body.style.overflow = "auto";
        }
    }, [menuOpen, hasWon, hasLost]);

    useEffect(() => {
        if (playAgain) {
            setHasWon(false);
            setHasLost(false);
            setAttemptCount(0);
            setMaxGuesses(MAX_GUESSES);
            setMenuOpen(false);
            setTimeout(() => {
                setPlayAgain(false);
            }, 500);
        }
    }, [playAgain])

    useEffect(() => {
        if (showDemo) {
            setAttemptCount(0);
            setMaxGuesses(MAX_GUESSES);
            resetKit.randomize(resetKit.data, "blink-dog");
        } else {
            if(loading) return;
            resetKit.randomize(resetKit.data);
        }
    }, [showDemo]);


    const openHelp = () => {
        // if we have time
        // open help dialog / route to /help
    };

    useEffect(() => {
        if (hasWon || hasLost) {
            setMenuOpen(true);
        }
    }, [hasWon, hasLost]);

    return (
        <div>
            {/* <div className="xs:block sm:hidden">xs</div>
            <div className="hidden sm:block md:hidden">small</div>
            <div className="hidden md:block lg:hidden">medium</div>
            <div className="hidden lg:block xl:hidden">large</div>
            <div className="hidden xl:block">xl</div> */}
            {/* Nav bar */}
            <Nav onMenuClick={() => setMenuOpen(true)} onHelpClick={openHelp} keyboardOn={toggleKeyboard} onKeyboardClick={() => setToggleKeyboard(prev => !prev)} />
            {toggleKeyboard &&
                <KeyboardPopUp isOpen={true} colors={keyboardColors} setKeyboardInput={setKeyboardInput} />
            }
            {loading ? <p>Loading...</p> : (
                <div>
                    <MenuPopUp isOpen={menuOpen} onClose={() => { setMenuOpen(false); }} hasWon={hasWon} hasLost={hasLost}
                        onPlayAgain={() => {
                            setPlayAgain(true);
                            resetKit.randomize(resetKit.data, showDemo ? "blink-dog": null);
                        }}
                        currentWordDetails={currentWordDetails}
                        showDemo={showDemo} setShowDemo={setShowDemo}
                        className="
                            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                            bg-white border rounded-lg shadow-lg p-6 w-80 bg-white
                        "
                    />
                    {showDemo &&
                        <div className="flex justify-center text-xl font-bold">(Demo) Answer is "BLINKDOG"</div>
                    }
                    <div className="flex justify-center">
                        <GuessingUI currentWord={currentWord}
                            listOfMonsters={listOfMonsters} maxLength={maxLength}
                            setHasWon={setHasWon}
                            setHasLost={setHasLost}
                            setAttemptCount={setAttemptCount}
                            maxGuesses={maxGuesses}
                            playAgain={playAgain}
                            keyboardInput={keyboardInput}
                            setKeyboardInput={setKeyboardInput}
                            setKeyboardColors={setKeyboardColors}
                        />
                    </div>
                    <div className="flex justify-center">
                        <StatUI
                            currentWordDetails={currentWordDetails}
                            reveal={hasWon || hasLost}
                            attemptCount={attemptCount}
                            maxGuesses={maxGuesses}
                            playAgain={playAgain}
                        />
                    </div>
                    <ListOfMonsters list={listOfMonsters} />
                </div>)
            }
        </div>);
};

export default Home;