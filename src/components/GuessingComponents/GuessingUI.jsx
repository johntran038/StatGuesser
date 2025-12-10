import React, { useState, useEffect } from "react";
import GuessAttempt from "./GuessAttempt";
import LetterBlock from "./LetterBlock";

const GuessingUI = ({ currentWord, listOfMonsters, keyboardInput,
    maxLength, maxGuesses,
    setHasWon, setHasLost, setAttemptCount, playAgain, setKeyboardInput, setKeyboardColors
}) => {
    const [guessHistory, setGuessHistory] = useState([]);
    const [currentGuess, setCurrentGuess] = useState([]);
    const [lettersTyped, setLettersTyped] = useState(0);
    const [showBlinker, setShowBlinker] = useState(true);
    const [shakeAnimation, setShakeAnimation] = useState(false);

    const [isControlHeld, setIsControlHeld] = useState(false);
    const [isCorrectWord, setIsCorrectWord] = useState(false);

    const MAX_LETTERS_ALLOWED = maxLength;
    const MAX_GUESSES_ALLOWED = maxGuesses;

    const findMonster = (word) => {
        return listOfMonsters.includes(word.join(''));
    };

    const validateGuess = (word) => {
        const isCorrect = currentWord.join('') == word.join('');
        return isCorrect;
    };

    useEffect(() => {
        if (playAgain) {
            setGuessHistory([]);
            setCurrentGuess([]);
            setLettersTyped(0);
            setShowBlinker(true);
            setShakeAnimation(false);

            setIsControlHeld(false);
            setIsCorrectWord(false);
        }
    }, [playAgain]);

    useEffect(() => {
        const pressed = (key, name) => {
            return key === name || keyboardInput === name;
        }

        const handleKeyPress = (key) => {
            if (guessHistory.length >= MAX_GUESSES_ALLOWED
                || isControlHeld || isCorrectWord) {
                return;
            }
            const isLetter = /^[A-Za-z]$/.test(key);
            if (pressed(key, "Enter") && currentGuess.length > 0) {
                if (!findMonster(currentGuess)) {
                    setShakeAnimation(true);

                    setTimeout(() => {
                        setShakeAnimation(false);
                    }, 300);

                    return;
                }
                if (validateGuess(currentGuess)) {
                    setIsCorrectWord(true);
                }
                setGuessHistory(attempt => [...attempt, currentGuess]);
                setAttemptCount(count => count + 1);
                setCurrentGuess([]);
            }
            if (pressed(key, "Backspace")) {
                setCurrentGuess(currentGuess => currentGuess.slice(0, -1));
            }
            if (lettersTyped >= MAX_LETTERS_ALLOWED) {
                return;
            }
            if (isLetter) {
                setCurrentGuess(currentGuess => [...currentGuess, key.toUpperCase()]);
                setShowBlinker(false);
            }
        };

        if(keyboardInput != '') {
            handleKeyPress(keyboardInput)
            setKeyboardInput('');
        }

        const keyPressEvent = (e) => {
            if (e.key === " ") {
                e.preventDefault();
            }
            handleKeyPress(e.key);
        };

        window.addEventListener("keydown", keyPressEvent);

        return () => {
            window.removeEventListener("keydown", keyPressEvent);
        };
    }, [currentGuess, lettersTyped, guessHistory, isControlHeld, isCorrectWord, keyboardInput]);

    useEffect(() => {
        const keyReleaseEvent = (e) => {
            if (e.key === "Control") {
                setIsControlHeld(false);
            }
        };

        const keyPressEvent = (e) => {
            if (e.key === "Control") {
                setIsControlHeld(true);
            }
        };

        const blurEvent = () => {
            setIsControlHeld(false);
        };

        window.addEventListener("keydown", keyPressEvent);
        window.addEventListener("keyup", keyReleaseEvent);
        window.addEventListener("blur", blurEvent);

        return () => {
            window.removeEventListener("keydown", keyPressEvent);
            window.removeEventListener("keyup", keyReleaseEvent);
            window.removeEventListener("blur", blurEvent);
        };
    }, [setIsControlHeld]);

    useEffect(() => {
        if (guessHistory.length < maxGuesses) {
            setShowBlinker(currentGuess.length <= 0);
        }
        if (isCorrectWord) {
            setShowBlinker(false);
        }
        setLettersTyped(currentGuess.length);
    }, [currentGuess, setLettersTyped, guessHistory, isCorrectWord]);

    return (<div className="guessingUI min-w-[300px] min-h-[250px] max-w-[100%]">
        {
            guessHistory.map((guess, index) =>
                <GuessAttempt key={index}
                    guess={guess} answer={currentWord} reveal={true} setKeyboardColors={setKeyboardColors}
                    onComplete={() => {
                        const isCorrect = validateGuess(guess);
                        if (isCorrect) {
                            setHasWon(true);
                        } else if (index + 1 >= MAX_GUESSES_ALLOWED) {
                            setHasLost(true);
                        }
                    }}
                />
            )
        }
        {showBlinker && <LetterBlock className={"blink"} Letter={"__"} />}
        <div className={shakeAnimation ? "shake-animation" : ""}>
            <GuessAttempt guess={currentGuess} reveal={false} />
        </div>
    </div>);
};

export default GuessingUI;