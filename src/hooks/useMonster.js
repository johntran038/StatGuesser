import { useState, useEffect } from "react";

const useMonster = () => {
  const [loading, setLoading] = useState(true);
  const [currentWord, setCurrentWord] = useState([]);
  const [currentWordDetails, setCurrentWordDetails] = useState(null);
  const [listOfMonsters, setListOfMonsters] = useState(null);
  const [maxLength, setMaxLength] = useState(null);

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
        // const word = data.results[randomIndex].name;
        const index = data.results[randomIndex].index;

        // Set up all monster list and max length
        const allMonsters = data.results.map(result => formatWord(result.name));

        setListOfMonsters(allMonsters);
        setMaxLength(Math.max(...allMonsters.map(name => name.length)));

        // Format index for API
        const monsterIndex = index

        // Fetch monster details
        const detailRes = await fetch(
          `https://www.dnd5eapi.co/api/2014/monsters/${monsterIndex}`
          // `https://www.dnd5eapi.co/api/2014/monsters/ancient-black-dragon`
          // `https://www.dnd5eapi.co/api/2014/monsters/wereboar-hybrid`
          // `https://www.dnd5eapi.co/api/2014/monsters/vampire-mist`
          // `https://www.dnd5eapi.co/api/2014/monsters/blink-dog`
        );
        const detailData = await detailRes.json();
        setCurrentWordDetails(detailData);

        // Format word for guessing UI
        setCurrentWord(formatWord(detailData.name).split(""));
      } catch (error) {
        console.error("Error fetching monster:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMonster();
  }, []);

  return { loading, currentWord, currentWordDetails, listOfMonsters, maxLength };
};

export default useMonster;
