import React, { useState } from "react";
import CensorAnswer from "./HelperComponents/CensorAnswer";
import HideComponentByAttempt from "./HelperComponents/HideComponentByAttempt";

const StatHeader = ({ reveal, answer, type, attemptCount, maxGuesses }) => {

    const getType = () => {
        return type.replace(
            /\w\S*/g,
            text => text.toLowerCase() === "of" ? "of" : text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
        );
    }

    return (
        <section className="space-y-1 gap-x-4 grid grid-cols-2">
            <div className="flex items-center space-x-2 order-1">
                <h2 className="font-[600]">Name:</h2>
                <CensorAnswer
                    censor={reveal}
                    answer={answer}
                    description={answer}
                />
            </div>

            <div className="flex items-center space-x-2 order-3">
                <h2 className="font-[600]">Type:</h2>
                <HideComponentByAttempt reveal={reveal} revealAtAttempt={3} attemptCount={attemptCount}>
                    <div>{getType()}</div>
                </HideComponentByAttempt>
            </div>
            <div className="flex items-center space-x-2 order-2">
                <h2 className="font-[600]">Attempt:</h2>
                <div>{attemptCount}/{maxGuesses}</div>
            </div>
        </section>
    );
};

export default StatHeader;