import React, { useState, useEffect } from "react";
import GuessingUI from "../components/GuessingComponents/GuessingUI";
import StatUI from "../components/StatComponents/StatUI";
import useMonster from "../hooks/useMonster";

const Home = () => {

    const { loading, currentWord, currentWordDetails, listOfMonsters, maxLength } = useMonster();

    if (loading) {
        return <p>Loading...</p>; // Wait until API is ready
    }

    return (<div>
        {/* The currentWordDesc is in JSON. Format it in the StatUI component */}
        <div className="flex justify-center">
        <StatUI currentWordDetails={currentWordDetails} />
        </div>
        <GuessingUI currentWord={currentWord} listOfMonsters={listOfMonsters} maxLength={maxLength} />
    </div>);
};

export default Home;