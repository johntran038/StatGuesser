import React, { useEffect, useState } from "react";
import GuessingUI from "../components/GuessingComponents/GuessingUI";
import StatUI from "../components/StatComponents/StatUI";
import useMonster from "../hooks/useMonster";
import ListOfMonsters from "../components/HomeComponents/ListOfMonsters";
import Popup from "../components/HomeComponents/Popup";
import Nav from "../components/HomeComponents/Nav"

const Home = () => {
    const { loading, currentWord, resetKit, currentWordDetails, listOfMonsters, maxLength } = useMonster();
    const [hasWon, setHasWon] = useState(false);
    const [hasLost, setHasLost] = useState(false);
    const [attemptCount, setAttemptCount] = useState(0);

    const [maxGuesses, setMaxGuesses] = useState(6);
    const [isOpen, setIsOpen] = useState(true);
    const [playAgain, setPlayAgain] = useState(false);


    useEffect(() => {
        // If you win or lose, show the popup
        if (isOpen && (hasWon || hasLost)) {
            // Prevent scrolling
            document.body.style.overflow = "hidden";
        } else {
            // Restore scrolling
            document.body.style.overflow = "auto";
        }
    }, [isOpen, hasWon, hasLost]);


    useEffect(() => {
        if (playAgain) {
            setHasWon(false);
            setHasLost(false);
            setAttemptCount(0);
            setMaxGuesses(6);
            setIsOpen(true);
            setTimeout(() => {
                setPlayAgain(false);
            }, 500);
        }
    }, [playAgain])

    const openSettings = () => {
        // open a modal / drawer
        console.log("Settings clicked");
    };

    const openHelp = () => {
        // open help dialog / route to /help
        console.log("Help clicked");
    };

    return (
        <div>
            <div className="flex justify-center">
                {/* <div className="xs:block sm:hidden">xs</div>
                <div className="hidden sm:block md:hidden">small</div>
                <div className="hidden md:block lg:hidden">medium</div>
                <div className="hidden lg:block xl:hidden">large</div>
                <div className="hidden xl:block">xl</div> 
                //EXAMPLE:
                // By default (xs): bg is blue
                    bg-blue-200
                // When sm or bigger: bg is green
                    sm:bg-green-200
                // When md or bigger: bg is red
                // I skipped adding lg so md and lg will also be red
                    md:bg-red-200
                // When xl: bg is yellow
                xl:bg-yellow-200
            */}
                {/* Nav bar */}
                <Nav onSettingsClick={openSettings} onHelpClick={openHelp} />
            </div>
            {loading ? <p>Loading...</p> : (<div>
                {(hasWon || hasLost) &&
                    <div>
                        <Popup isOpen={isOpen} onClose={() => setIsOpen(false)}
                            onPlayAgain={() => { setPlayAgain(true); resetKit.randomize(resetKit.data); setIsOpen(false) }}
                            className="
                            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                            bg-white border rounded-lg shadow-lg p-6 w-80 bg-white
                        ">
                            <div className="flex flex-col items-center">

                                <img className="w-20 h-20" src="./StatGuesser.png" alt="Logo" />
                                <h2 className="text-xl font-bold">{hasWon ? "Congratulations! You won!" : "Oh No!"}</h2>
                                {hasWon && <div>You have won!</div>}
                                {hasLost && <div>You have lost :(</div>}
                                <p>The word is: {currentWordDetails?.name}</p>
                            </div>
                        </Popup>
                    </div>
                }

                <div className="flex justify-center">
                    <GuessingUI currentWord={currentWord}
                        listOfMonsters={listOfMonsters} maxLength={maxLength}
                        setHasWon={setHasWon}
                        setHasLost={setHasLost}
                        setAttemptCount={setAttemptCount}
                        maxGuesses={maxGuesses}
                        playAgain={playAgain}
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