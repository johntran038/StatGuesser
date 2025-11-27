import React, { useState, useEffect } from "react";
import GuessAttempt from "./GuessAttempt";

const GuessingUI = ({ currentWord, listOfMonsters, maxLength, setHasWon }) => {
    const [guessHistory, setGuessHistory] = useState([]);
    const [currentGuess, setCurrentGuess] = useState([]);
    const [lettersTyped, setLettersTyped] = useState(0);
    const [shakeAnimation, setShakeAnimation] = useState(false);

    const [isControlHeld, setIsControlHeld] = useState(false);
    const [isCorrectWord, setIsCorrectWord] = useState(false);

    const MAX_LETTERS_ALLOWED = maxLength;
    const MAX_GUESSES_ALLOWED = 6;

    const findMonster = (word) => {
        return listOfMonsters.includes(word.join(""));
    };

    const validateGuess = (word) => {
        setIsCorrectWord(currentWord.join('') == word.join(''));
    };

    useEffect(() => {
        const keyPressEvent = (e) => {
            if (guessHistory.length >= MAX_GUESSES_ALLOWED
                || isControlHeld || isCorrectWord) {
                return;
            }
            const isLetter = /^[A-Za-z]$/.test(e.key);
            if (e.key === "Enter" && currentGuess.length > 0) {
                if (!findMonster(currentGuess)) {
                    setShakeAnimation(true);

                    setTimeout(() => {
                        setShakeAnimation(false);
                    }, 300);

                    return;
                }
                setGuessHistory(attempt => [...attempt, currentGuess]);
                validateGuess(currentGuess);
                setCurrentGuess([]);
            }
            if (e.key === "Backspace") {
                setCurrentGuess(currentGuess => currentGuess.slice(0, -1));
            }
            if (e.key === " ") {
                e.preventDefault();
            }
            if (lettersTyped >= MAX_LETTERS_ALLOWED) {
                return;
            }
            if (isLetter) {
                setCurrentGuess(currentGuess => [...currentGuess, e.key.toUpperCase()]);
            }
        };

        window.addEventListener("keydown", keyPressEvent);

        return () => {
            window.removeEventListener("keydown", keyPressEvent);
        };
    }, [currentGuess, lettersTyped, guessHistory, isControlHeld, isCorrectWord]);

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
        setLettersTyped(currentGuess.length);
    }, [currentGuess, setLettersTyped]);

    useEffect(() => {
        console.log("test", guessHistory);
    }, [guessHistory]);

    return (<div className="guessingUI min-w-[250px] min-h-[250px] max-w-[90%]">
        {/* <div className="xs:block sm:hidden">xs</div>
        <div className="hidden sm:block md:hidden">small</div>
        <div className="hidden md:block lg:hidden">medium</div>
        <div className="hidden lg:block xl:hidden">large</div>
        <div className="hidden xl:block">xl</div> */}
        {
            guessHistory.map((guess, index) =>
                <GuessAttempt key={index}
                              guess={guess} answer={currentWord} reveal={true}
                              onComplete={()=>{setHasWon(isCorrectWord)}}
                              />
            )
        }
        <div className={shakeAnimation ? "shake-animation" : ""}>
            <GuessAttempt guess={currentGuess} reveal={false} />
        </div>
    </div>);
};

export default GuessingUI;