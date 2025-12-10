import React, { useState } from "react";
import { FaBackspace } from "react-icons/fa";

const LetterBlock = ({className, Letter, reveal, delay, color, isLastLetter, onComplete, onClick}) => {

    const colors={0: 'incorrect', 1:'almost-correct', 2: 'correct'}

    const letterStyle = reveal ? `${colors[color]} revealed-letter`: "";

    const getLetter = (Letter) => {
        if(Letter?.type?.name === "FaBackspace") return "Backspace";
        return Letter;
    };

    return(<div className={className}>
        <div className={`
            letterbox ${letterStyle} font-xl select-none
            text-[1em] sm:text-[1em]
            sm:p-[0.1em] md:m-[0.1em] lg:m-[0.2em]
            w-[0.9rem] sm:w-[1.5em] md:w-[2em] lg:w-[2.5em]
            h-[0.9rem] sm:h-[1.5em] md:h-[2em] lg:h-[2.5em]
        `}
        onAnimationEnd={()=>{
            if(isLastLetter){
                onComplete();
            }
        }}
        onClick={()=>onClick?.(getLetter(Letter))}
        style={{animationDelay:`${delay}s`}}>{Letter}</div>
    </div>)
};

export default LetterBlock;