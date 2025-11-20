import React, { useState, useEffect } from "react";
import GuessAttempt from "../components/GuessAttempt";

const GuessingUI = () => {
    const [guessHistory, setGuessHistory] = useState([]);
    const [currentGuess, setCurrentGuess] = useState([]);
    const [lettersTyped, setLettersTyped] = useState(0);
    const [shakeAnimation, setShakeAnimation] = useState(false);

    const MAX_LETTERS_ALLOWED = 22;
    const MAX_GUESSES_ALLOWED = 6;

    //move this somewjere else
    const testWord = "HAPPY".split('');

    useEffect(() => {
        const keyPressEvent = (e) => {
            if (guessHistory.length >= MAX_GUESSES_ALLOWED) {
                return;
            }
            const isLetter = /^[A-Za-z]$/.test(e.key);
            if (e.key === "Enter" && currentGuess.length > 0) {
                /*/
                setShakeAnimation(true);

                setShakeAnimation(true);

                setTimeout(() => {
                    setShakeAnimation(false);
                }, 300);

                /*/
                setGuessHistory(attempt => [...attempt, currentGuess]);
                setCurrentGuess([]);
                //*/
            }
            if (e.key === "Backspace") {
                setCurrentGuess(currentGuess => currentGuess.slice(0, -1));
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
    }, [currentGuess, lettersTyped, guessHistory]);

    useEffect(() => {
        setLettersTyped(currentGuess.length);
    }, [currentGuess, setLettersTyped]);

    useEffect(() => {
        console.log("test", guessHistory);
    }, [guessHistory]);

    return (<div className="guessingUI min-w-[250px] min-h-[250px]">
        {/* <div className="xs:block sm:hidden">xs</div>
        <div className="hidden sm:block md:hidden">small</div>
        <div className="hidden md:block lg:hidden">medium</div>
        <div className="hidden lg:block xl:hidden">large</div>
        <div className="hidden xl:block">xl</div> */}
        {
            guessHistory.map((guess, index) =>
                <GuessAttempt key={index} guess={guess} answer={testWord} reveal={true} a={"real"} />
            )
        }
        <div className={shakeAnimation ? "shake-animation" : ""}>
            <GuessAttempt guess={currentGuess} reveal={false} a={"current"} />
        </div>
    </div>);
};

export default GuessingUI;