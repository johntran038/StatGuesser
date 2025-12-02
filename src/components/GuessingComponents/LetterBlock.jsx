import React, { useState } from "react";

const LetterBlock = ({className, Letter, reveal, delay, color, isLastLetter, onComplete}) => {

    const colors={0: 'incorrect', 1:'almost-correct', 2: 'correct'}

    const letterStyle = reveal ? `${colors[color]} revealed-letter`: "";

    return(<div className={className}>
        <div className={`
            letterbox ${letterStyle} font-xl
            text-[1em] sm:text-[1em]
            p-[0.5em] sm:p-[0.1em] md:m-[0.1em] lg:m-[0.2em]
            w-[1rem] sm:w-[1.5em] md:w-[2em] lg:w-[2.5em]
            h-[1rem] sm:h-[1.5em] md:h-[2em] lg:h-[2.5em]
        `}
        onAnimationEnd={()=>{
            if(isLastLetter){
                onComplete();
            }
        }}
        style={{animationDelay:`${delay}s`}}>{Letter}</div>
    </div>)
};

export default LetterBlock;