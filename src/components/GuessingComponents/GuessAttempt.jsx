import React, { useEffect, useMemo } from "react";
import LetterBlock from "./LetterBlock";

//Completed 100%
const GuessAttempt = ({ className, guess, answer, reveal, onComplete, setKeyboardColors }) => {
    
    const validateGuess = useMemo(() => {
        if (!answer || !reveal) {
            return [];
        }
        
        const incorrect = 0;
        const almostCorrect = 1;
        const correct = 2;
        const result = Array(guess.length).fill(incorrect);
        //ex: result = [0,0,0,0,0]
        const answerCount = {};

        for (let letter of answer) {
            //ex: happy -> {h:1, a:1, p:2, y:1}
            answerCount[letter] = (answerCount[letter] || 0) + 1;
        }

        //if its correct, set result to 2(correct) and remove letter from answerCount
        for (let i = 0; i < Math.min(guess.length, answer.length); i++) {
            //ex when i=1:
            //   t[a]ble === h[a]ppy -> result = [0,2,0,0,0]  answerCount = {h:1, a:0, p:2, y:1}
            if (guess[i] === answer[i]) {
                result[i] = correct;
                answerCount[guess[i]]--;
            }
        }

        //if correct letter but wrong place, set result to 1(almost correct) and remove letter from answerCount
        for (let i = 0; i < guess.length; i++) {
            //  ex when i=3 and guess = lunar:
            //  0,0,0,[0],0 == 0       and       answerCount[a] > 0
            if (result[i] == incorrect && answerCount[guess[i]] > 0) {
                //result = [0,0,0,1,0]  answerCount = {h:1, a:0, p:2, y:1}
                result[i] = almostCorrect;
                answerCount[guess[i]]--;
            }
        }

        return result;

    }, [guess, answer, reveal]);

    useEffect(()=>{
        if(!setKeyboardColors) return;
        setKeyboardColors([guess, validateGuess]);
    }, [validateGuess]);

    return (<>
        <span className={`flex ${className}`}>
            {
                guess.map((letter, index) =>
                    <LetterBlock
                        key={index} Letter={letter} reveal={reveal}
                        delay={index * 0.2}
                        color={validateGuess[index]}
                        isLastLetter={index==guess.length-1}
                        onComplete={onComplete}
                    />
                )
            }
        </span>
    </>)
};

export default GuessAttempt;