import React, { useState } from "react";
import GuessingUI from "../components/GuessingComponents/GuessingUI";
import StatUI from "../components/StatComponents/StatUI";
import useMonster from "../hooks/useMonster";
import ListOfMonsters from "../components/ListOfMonsters";

const Home = () => {
    const { loading, currentWord, currentWordDetails, listOfMonsters, maxLength } = useMonster();

    const [hasWon, setHasWon] = useState(false);
    const [hasLost, setHasLost] = useState(false);
    const [attemptCount, setAttemptCount] = useState(0);

    const [maxGuesses, setMaxGuesses] = useState(6);

    if (loading) {
        return <p>Loading...</p>; // Wait until API is ready
    }

    return (<div>
        {/* The currentWordDesc is in JSON. Format it in the StatUI component */}
        {hasWon && <div>You have won!</div>}
        {hasLost && <div>You have lost :(</div>}
        <div className="flex justify-center">
            <GuessingUI currentWord={currentWord}
                listOfMonsters={listOfMonsters} maxLength={maxLength}
                setHasWon={setHasWon}
                setHasLost={setHasLost}
                setAttemptCount={setAttemptCount}
                maxGuesses = {maxGuesses}
            />
        </div>
        <div className="flex justify-center">
            <StatUI
                currentWordDetails={currentWordDetails}
                reveal={hasWon||hasLost}
                attemptCount={attemptCount}
                maxGuesses={maxGuesses}
            />
        </div>
        <ListOfMonsters list={listOfMonsters}/>
    </div>);
};

export default Home;