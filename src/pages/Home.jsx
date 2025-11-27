import React, { useState, useEffect } from "react";
import GuessingUI from "../components/GuessingComponents/GuessingUI";
import StatUI from "../components/StatComponents/StatUI";
import useMonster from "../hooks/useMonster";

const Home = () => {
    const { loading, currentWord, currentWordDetails, listOfMonsters, maxLength } = useMonster();

    const [hasWon, setHasWon] = useState(false);

    if (loading) {
        return <p>Loading...</p>; // Wait until API is ready
    }

    return (<div>
        {/* The currentWordDesc is in JSON. Format it in the StatUI component */}
        {hasWon&&<div>You have won!</div>}
        <div className="flex justify-center">
        <GuessingUI currentWord={currentWord}
                    listOfMonsters={listOfMonsters} maxLength={maxLength}
                    setHasWon={setHasWon}
        />
        </div>
        <div className="flex justify-center">
        <StatUI currentWordDetails={currentWordDetails} reveal={hasWon}/>
        </div>
    </div>);
};

export default Home;