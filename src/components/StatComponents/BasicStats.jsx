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

    return (<section className="space-y-1 mb-2">
        <div><span className="font-[600]">AC:</span> {getAC()}</div>
        <div><span className="font-[600]">HP:</span> {hp}</div>
        <div><span className="font-[600]">Speed:</span> {getSpeed()}</div>
    </section>);
};

export default BasicStats;