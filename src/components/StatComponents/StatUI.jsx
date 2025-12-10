import React, { useState, useEffect } from "react";
import BasicStats from "./BasicStats";
import StatModifier from "./StatModifiers";
import ExtraStats from "./ExtraStats";
import TraitsAndActions from "./TraitsAndActions";
import StatToggle from "./HelperComponents/StatToggle";
import HideComponentByAttempt from "./HelperComponents/HideComponentByAttempt";
import StatHeader from "./StatHeader";

const StatUI = ({ currentWordDetails, reveal, attemptCount, maxGuesses, playAgain }) => {
    const [wordDetails, setWordDetails] = useState(null);

    const flattingDictionary = (list) => {
        // or return a fallback string
        if (!list) return '';
        return Object.entries(list)
            .map(([key, value]) => `${key} ${value}`)
            .join(', ');
    };

    const get = (type) => {
        if (!wordDetails?.[type]) return "N/A";
        return wordDetails?.[type];
    };

    useEffect(() => {
        if (playAgain) {
            setWordDetails(null)
        }
    }, [setWordDetails, playAgain]);

    useEffect(() => {
        setWordDetails(currentWordDetails);
    }, [currentWordDetails]);

    useEffect(() => {
        console.log(wordDetails, " dfsdfsdf");
    }, [wordDetails]);


    return (<section className="mt-[2em] px-10 w-[60em] md:w-[80%]">
        {wordDetails && (<div className="">
            <div className="flex justify-center col-span-2 mb-5">
                <StatHeader
                    reveal={reveal}
                    answer={get("name")}
                    type={get("type")}
                    attemptCount={attemptCount}
                    maxGuesses={maxGuesses}
                />
            </div>
            <div className="mr-auto grid lg:grid-cols-4 md:grid-cols-2 gap-4 mt-5">
                <StatToggle className="mb-3 space-y-1" title={"Stats"}>
                    <HideComponentByAttempt className="mb-3 space-y-1" reveal={reveal} revealAtAttempt={1} attemptCount={attemptCount}>
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
                    </HideComponentByAttempt>
                </StatToggle>
                <StatToggle className="mb-3 space-y-1" title={"Extra"}>
                    <HideComponentByAttempt className="mb-3 space-y-1" reveal={reveal} revealAtAttempt={2} attemptCount={attemptCount}>
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
                    </HideComponentByAttempt>
                </StatToggle>
                <StatToggle className="mb-3 space-y-1" title={"Actions"}>
                    <HideComponentByAttempt className="mb-3 space-y-1" reveal={reveal} revealAtAttempt={4} attemptCount={attemptCount}>
                        <TraitsAndActions
                            data={get("actions")}
                            answer={get("name")}
                            censor={!reveal}
                        />
                    </HideComponentByAttempt>
                </StatToggle>
                <StatToggle className="mb-3 space-y-1" title={"Traits"}>
                    <HideComponentByAttempt className="mb-3 space-y-1" reveal={reveal} revealAtAttempt={5} attemptCount={attemptCount}>
                        <TraitsAndActions
                            data={get("special_abilities")}
                            answer={get("name")}
                            censor={!reveal}
                        />
                    </HideComponentByAttempt>
                </StatToggle>

                {(get("legendary_actions") != "N/A" && get("legendary_actions").length > 0) && (<>
                    <StatToggle className="mb-3 space-y-1 lg:col-span-2 lg:col-start-2 md:col-span-2 md:col-start-1" title={"Legendary Actions"}>
                        <HideComponentByAttempt className="space-y-1" reveal={reveal} revealAtAttempt={4} attemptCount={attemptCount}>
                            <TraitsAndActions
                                data={get("legendary_actions")}
                                answer={get("name")}
                                censor={!reveal}
                            />
                        </HideComponentByAttempt>
                    </StatToggle>
                </>)}
            </div>
        </div>
        )}
    </section>);
};

export default StatUI;