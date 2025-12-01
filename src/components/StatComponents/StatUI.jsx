import React, { useState, useEffect } from "react";
import BasicStats from "./BasicStats";
import StatModifier from "./StatModifiers";
import ExtraStats from "./ExtraStats";
import TraitsAndActions from "./TraitsAndActions";
import StatToggle from "./HelperComponents/StatToggle";
import StatHeader from "./StatHeader";

const StatUI = ({ currentWordDetails, reveal, attemptCount, maxGuesses }) => {
    const [wordDetails, setWordDetails] = useState();

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

    const getType = () => {
        return get("type").replace(
            /\w\S*/g,
            text => text.toLowerCase() === "of" ? "of" : text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
        );
    }

    useEffect(() => {
        setWordDetails(currentWordDetails);
    }, [currentWordDetails]);

    useEffect(() => {
        // console.log(wordDetails, " dfsdfsdf");
    }, [wordDetails]);


    return (<section className="mt-[2em] px-10 w-[60em] md:w-[80%]">
        {wordDetails && (<div className="grid grid-cols-2">
            <div className="flex justify-center col-span-2 mb-4">
                <StatHeader
                    reveal={reveal}
                    answer={get("name")}
                    type={get("type")}
                    attemptCount={attemptCount}
                    maxGuesses={maxGuesses}
                />
            </div>
            <div className="mr-10">
                <StatToggle className="mb-3 space-y-1" title={"Stats"}>

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

                <StatToggle className="mb-3 space-y-1" title={"Extra"}>
                    <ExtraStats
                        proficiencies={get("proficiencies")}
                        senses={get("senses")}
                        languages={get("languages")}
                        cr={get("challenge_rating")}
                        xp={get("xp")}
                        pb={get("proficiency_bonus")}
                        flattingDictionary={flattingDictionary}
                        answer={get("name")}
                        censor={!reveal}
                    />
                </StatToggle>
                <StatToggle className="mb-3 space-y-1" title={"Actions"}>
                    <TraitsAndActions
                        data={get("actions")}
                        answer={get("name")}
                        censor={!reveal}
                    />
                </StatToggle>
            </div>
            <div>
                <StatToggle className="mb-3 space-y-1" title={"Traits"}>
                    <TraitsAndActions
                        data={get("special_abilities")}
                        answer={get("name")}
                        censor={!reveal}
                    />
                </StatToggle>

                {(get("legendary_actions") != "N/A" && get("legendary_actions").length > 0) && (<>
                    <StatToggle className="space-y-1" title={"Legendary Actions"}>
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