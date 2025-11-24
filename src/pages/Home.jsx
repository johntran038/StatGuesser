import React, { useState, useEffect } from "react";
import GuessingUI from "../components/GuessingComponents/GuessingUI";
import StatUI from "../components/StatComponents/StatUI";

const Home = () => {

    const [wordAPI, setWordAPI] = useState(null);
    const [loading, setLoading] = useState(true)


    const [currentWord, setCurrentWord] = useState([]);
    const [currentWordDesc, setCurrentWordDesc] = useState(null);

    useEffect(() => {
        // Call the API
        fetch("https://www.dnd5eapi.co/api/2014/monsters/")
            .then((response) => response.json())
            .then((json) => {
                setWordAPI(json);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []); // Empty dependency array means it runs once when component mounts

    useEffect(() => { //Testing purposes
        console.log("answer: ", currentWord);
    }, [currentWord]);


    useEffect(() => {
        //Current word for today
        if (!loading) {
            // Get our word
            const randomIndex = Math.floor(Math.random() * wordAPI.count);
            const word = wordAPI.results[randomIndex].name;

            setCurrentWord(word.toUpperCase().replace(/[^a-zA-Z]/g, "").split(""));

            // Get the word info
            // Format for D&D API index
            const monsterIndex = word.toLowerCase().replace(/[^a-z\s]/g, "").replace(/\s+/g, "-");
            fetch(`https://www.dnd5eapi.co/api/2014/monsters/${monsterIndex}`)
                .then((response) => response.json())
                .then((json) => {
                    setCurrentWordDesc(json);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [wordAPI]);

    if (loading) {
        return <p>Loading...</p>; // Wait until API is ready
    }

    return (<>
        {/* The currentWordDesc is in JSON. Format it in the StatUI component */}
        <StatUI currentWordDesc={currentWordDesc} />
        <GuessingUI currentWord={currentWord} />
    </>);
};

export default Home;