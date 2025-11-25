import { useState, useEffect } from "react";

const useMonster = () => {
  const [loading, setLoading] = useState(true);
  const [currentWord, setCurrentWord] = useState([]);
  const [currentWordDetails, setCurrentWordDetails] = useState(null);
  const [listOfMonsters, setListOfMonsters] = useState(null);

  const formatWord = (word) => {
    return word.toUpperCase().replace(/[^a-zA-Z]/g, "")
  };

  useEffect(() => {
    const fetchMonster = async () => {
      try {
        // Fetch all monsters
        const res = await fetch("https://www.dnd5eapi.co/api/2014/monsters/");
        const data = await res.json();

        // Pick a random monster
        const randomIndex = Math.floor(Math.random() * data.count);
        const word = data.results[randomIndex].name;
        const index = data.results[randomIndex].index;

        setListOfMonsters(data.results.map(result=>formatWord(result.name)));
        
        // Format word for guessing UI
        setCurrentWord(formatWord(word).split(""));

        // Format index for API
        const monsterIndex = index

        // Fetch monster details
        const detailRes = await fetch(
          `https://www.dnd5eapi.co/api/2014/monsters/${monsterIndex}`
        //   `https://www.dnd5eapi.co/api/2014/monsters/ancient-black-dragon`
        );
        const detailData = await detailRes.json();
        setCurrentWordDetails(detailData);
      } catch (error) {
        console.error("Error fetching monster:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMonster();
  }, []);

  return { loading, currentWord, currentWordDetails, listOfMonsters };
};

export default useMonster;
