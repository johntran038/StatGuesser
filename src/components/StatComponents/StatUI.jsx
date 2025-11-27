import React, { useState, useEffect } from "react";
import BasicStats from "./BasicStats";
import StatModifier from "./StatModifiers";
import ExtraStats from "./ExtraStats";
import StatToggle from "./StatToggle";
import TraitsAndActions from "./TraitsAndActions";
import { BsChevronDown } from "react-icons/bs";

const StatUI = ({ currentWordDetails, reveal }) => {
    const [wordDetails, setWordDetails] = useState();
    const [stats, setStats] = useState({});

    const toggleStat = (statToToggle) => {
        setStats(stat => ({
            ...stat,
            [statToToggle]: !stat[statToToggle]
        }))
    }

    const flattingDictionary = (list) => {
        if (!list) return ''; // or return a fallback string
        return Object.entries(list)
            .map(([key, value]) => `${key} ${value}`)
            .join(', ');
    };

    const get = (type) => {
        if (!wordDetails?.[type]) return "N/A";
        return wordDetails?.[type];
    };

    useEffect(() => {
        setWordDetails(currentWordDetails);
    }, [currentWordDetails]);

    useEffect(() => {
        console.log(wordDetails, " dfsdfsdf");
    }, [wordDetails]);


    return (<section className="mt-[2em] px-10 w-[60em] md:w-[80%]">
        {wordDetails && (<div className="grid grid-cols-2">
            <div className="flex justify-center col-span-2 mb-4">
                
            <section className="">
                <h2>Name: {get("name")}</h2>
                <h2>Type: {get("type")}</h2>
            </section>
            </div>
            <div className="mr-10">
                <StatToggle className="mb-3" title={"Stats"}>

                    <BasicStats
                        ac={get("armor_class")}
                        hp={get("hit_points")}
                        speed={get("speed")}
                        flattingDictionary={flattingDictionary}
                    />

                    <StatModifier
                        strength={get("strength")}
                        dexterity={get("dexterity")}
                        constitution={get("constitution")}
                        intelligence={get("intelligence")}
                        wisdom={get("wisdom")}
                        charisma={get("charisma")}
                    />
                </StatToggle>

                <StatToggle className="mb-3" title={"Extra"}>
                    <ExtraStats
                        proficiencies={get("proficiencies")}
                        senses={get("senses")}
                        languages={get("languages")}
                        cr={get("challenge_rating")}
                        xp={get("xp")}
                        pb={get("proficiency_bonus")}
                        flattingDictionary={flattingDictionary}
                    />
                </StatToggle>
            </div>
            <div>
                <StatToggle className="mb-3" title={"Traits"}>
                    <TraitsAndActions
                        data={get("special_abilities")}
                        answer={get("name")}
                        censor={!reveal}
                    />
                </StatToggle>
                <StatToggle className="mb-3" title={"Actions"}>
                    <TraitsAndActions
                        data={get("actions")}
                        answer={get("name")}
                        censor={!reveal}
                    />
                </StatToggle>

                {(get("legendary_actions") != "N/A" && get("legendary_actions").length > 0) && (<>
                    <StatToggle title={"Legendary Actions"}>
                        <TraitsAndActions
                            data={get("legendary_actions")}
                            answer={get("name")}
                            censor={!reveal}
                        />
                    </StatToggle>
                </>)}
            </div>
        </div>
        )}
    </section>);
};

export default StatUI;