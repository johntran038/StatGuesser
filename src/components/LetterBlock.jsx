import React, { useState } from "react";

const LetterBlock = ({Letter, reveal, delay, color}) => {

    const colors={0: 'incorrect', 1:'almost-correct', 2: 'correct'}

    const letterStyle = reveal ? `${colors[color]} revealed-letter`: "";

    return(<>
        <div className={`letterbox ${letterStyle}`} style={{animationDelay:`${delay}s`}}>{Letter}</div>
    </>)
};

export default LetterBlock;