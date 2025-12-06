import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

const StatToggle = ({ className, title, children }) => {

    const [showStats, setShowStats] = useState(true);
    const [addScroll, setAddScroll] = useState(true);

    return (<section className={className}>
        <button className="bg-gray-600 flex justify-content-left w-[100%] p-1" onClick={() => setShowStats(!showStats)}>
            <h2 className="text-white">---{title}---</h2>
            <BsChevronDown className={`self-center ml-auto transition-transform ${showStats ? 'rotate-180' : ''}`} />
        </button>
        <div className={`
                overflow-hidden
                transition-all duration-300 ease-in-out
                ${showStats ? `${addScroll ? "overflow-y-auto" : ""} max-h-screen` : "max-h-0"}
            `}
            onTransitionEnd={(e) => {setAddScroll(e.propertyName === "max-height" && showStats)}}
        >{children}</div>
    </section>)
};

export default StatToggle;