import React, { useState, useEffect } from "react";
import BasicStats from "./BasicStats";
import StatModifier from "./StatModifiers";
import ExtraStats from "./ExtraStats";
import TraitsAndActions from "./TraitsAndActions";

const StatUI = ({ currentWordDetails }) => {
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

    useEffect(() => {
        setWordDetails(currentWordDetails);
    }, [currentWordDetails]);

    useEffect(() => {
        console.log(wordDetails?.legendary_actions, " dfsdfsdf");
    }, [wordDetails]);


    return (<section className="mt-[2em] px-10 w-[60em]">
        {wordDetails && (<div className="grid grid-cols-2">
            <div className="mr-10">
                <section>
                    <h2>Name: {get("name")}</h2>
                    <h2>Type: {get("type")}</h2>
                </section>

                <section>
                    <h2>---Stats---</h2>
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
                </section>

                <section>
                    <h2>---Extra---</h2>
                    <ExtraStats
                        proficiencies={get("proficiencies")}
                        senses={get("senses")}
                        languages={get("languages")}
                        cr={get("challenge_rating")}
                        xp={get("xp")}
                        pb={get("proficiency_bonus")}
                        flattingDictionary={flattingDictionary}
                    />
                </section>
            </div>
            <div>
                <h2>---Traits---</h2>
                <TraitsAndActions
                    data={get("special_abilities")}
                />
                <h2>---Actions---</h2>
                <TraitsAndActions
                    data={get("actions")}
                />
                {(get("legendary_actions") != "N/A" && get("legendary_actions").length > 0) && (<>
                    <h2>---Legendary Actions---</h2>
                    <TraitsAndActions
                        data={get("legendary_actions")}
                    />
                </>)}
            </div>
        </div>
        )}
    </section>);
};

export default StatUI;