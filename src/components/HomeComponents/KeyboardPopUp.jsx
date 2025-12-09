import React, { useEffect, useState } from "react";
import LetterBlock from "../GuessingComponents/LetterBlock";
import { FaBackspace } from "react-icons/fa";

const KeyboardPopUp = ({ isOpen, colors }) => {

    const [evaluateLetter, setEvaluateLetter] = useState({});

    const renderKeys = (letters) => {
        const colorStyle = { 0: 'incorrect', 1: 'almost-correct', 2: 'correct' }

        return (
            <div className="flex justify-center">
                {letters.split("").map((letter, key) =>
                    <LetterBlock key={key} Letter={letter}
                        className={`m-[0.2em] py-1 rounded-md text-white bg-[#828385] ${colorStyle[evaluateLetter[letter]]}`}
                    />
                )}
            </div>
        );
    }

    useEffect(() => {
        if (!colors || colors.length < 2) return;

        for (let i = 0; i < colors[0].length; i++) {
            setEvaluateLetter(prev => ({
                ...prev,
                [colors[0][i]]: colors[1][i]
            }));
        }
    }, [colors]);


    return (<>
        {isOpen &&
            <div className="fixed inset-0 flex items-end mb-10 justify-center z-999">
                <div className={`bg-[#EDEACA] rounded-lg shadow-lg p-3 outline flex flex-col`}>
                    {/* <GuessAttempt className="" guess={"QWERTY".split("")}></GuessAttempt> */}
                    {renderKeys("QWERTYUIOP")}
                    {renderKeys("ASDFGHJKL")}
                    <span className="flex justify-center">
                        <LetterBlock className="m-[0.2em] p-1 rounded-md text-white bg-[#828385]"
                            Letter="Enter" />
                        {renderKeys("ZXCVBNM")}
                        <LetterBlock className="m-[0.2em] p-1 rounded-md text-white bg-[#828385]"
                            Letter={<FaBackspace className="text-white text-xl"/>}
                        />
                    </span>
                </div>
            </div>
        }
    </>);
};

export default KeyboardPopUp;