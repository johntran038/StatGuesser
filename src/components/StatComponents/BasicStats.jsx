import React from "react";

const BasicStats = ({ ac, hp, speed, flattingDictionary }) => {

    const getAC = () => {
        if (!ac) return "N/A";
        return ac[0].value;
    }

    const getSpeed = () => {
        if (!speed) return "N/A";
        return flattingDictionary(speed);
    }

    return (<>
        <p>AC: {getAC()}</p>
        <p>HP: {hp}</p>
        <p>Speed: {getSpeed()}</p>
    </>);
};

export default BasicStats;