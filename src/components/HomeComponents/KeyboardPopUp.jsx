import React, { useEffect, useState } from "react";
import LetterBlock from "../GuessingComponents/LetterBlock";
import { FaBackspace } from "react-icons/fa";

const KeyboardPopUp = ({ isOpen, colors, setKeyboardInput }) => {

    const [evaluateLetter, setEvaluateLetter] = useState({});

    const renderKeys = (letters) => {
        const colorStyle = { 0: 'incorrect-color', 1: 'almost-correct-color', 2: 'correct-color' }

        return (
            <div className="flex justify-center">
                {letters.split("").map((letter, key) =>
                    <LetterBlock key={key} Letter={letter}
                        className={`${colorStyle[evaluateLetter[letter]]}
                            flex items-center
                            cursor-pointer
                            m-[0.1em] px-[0.4em] py-4 rounded-md text-white bg-[#828385]
                            sm:m-[0.2em] md:px-0 sm:py-1 lg:py-0`
                        }
                        onClick={setKeyboardInput}
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
            <div className="fixed inset-0 flex items-end mb-10 justify-center z-999 pointer-events-none">
                <div className={`bg-[#EDEACA] rounded-lg shadow-lg p-3 outline flex flex-col pointer-events-auto`}>
                    {/* First line of QWERTY Keyboard */}
                    {renderKeys("QWERTYUIOP")}
                    {/* Second line of QWERTY Keyboard */}
                    {renderKeys("ASDFGHJKL")}
                    <span className="flex justify-center flex-wrap">
                        {/* Enter */}
                        {/* Last line of QWERTY Keyboard */}
                        
                        <LetterBlock className="
                            flex items-center
                                cursor-pointer
                                m-[0.1em] px-4 py-4 rounded-md text-white bg-[#828385]
                                sm:m-[0.2em] md:px-1 sm:py-1 lg:py-0
                            "
                            Letter={"Enter"}
                            onClick={setKeyboardInput}
                        />
                        {renderKeys("ZXCVBNM")}
                        {/* Backspace */}
                        {/* <LetterBlock className="m-[0.2em] p-1 rounded-md text-white bg-[#828385] flex items-center"
                            Letter={<FaBackspace />}
                            onClick={setKeyboardInput}
                        /> */}
                        <LetterBlock className="
                            flex items-center
                                cursor-pointer
                                m-[0.1em] px-[0.4em] py-4 rounded-md text-white bg-[#828385]
                                sm:m-[0.2em] md:px-0 sm:py-1 lg:py-0
                            "
                            Letter={<FaBackspace />}
                            onClick={setKeyboardInput}
                            test = {"Backspace"}
                        />
                    </span>
                </div>
            </div>
        }
    </>);
};

export default KeyboardPopUp;