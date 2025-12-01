import React from "react";
import CensorAnswer from "./HelperComponents/CensorAnswer";

const ExtraStats = ({ proficiencies, senses, languages, cr, xp, pb, flattingDictionary, answer, censor }) => {

    const renderProficiency = (skill) => {
        const index = skill?.proficiency.index;
        const name = skill?.proficiency.name.split(": ")[1];
        const value = skill?.value;

        return (
            <span key={index} className="after:content-[','] last:after:content-none">{name} +{value}</span>
        );
    };

    const getSense = (sense) => {
        return sense.replaceAll("_", ' ').replace(
            /\w\S*/g,
            text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
        );
    }

    const formatSenses = (senses) => {
        let formatedResult = {};
        for (let sense in senses)
            formatedResult[getSense(sense)] = senses[sense];

        return formatedResult;
    }

    return (<section>
        <div className="space-x-2">
            <span className="font-[600]">Skills:</span>
            {proficiencies && proficiencies.length > 0 ? (
                proficiencies
                    .filter(data => data.proficiency.index.startsWith("skill"))
                    .map(skill => renderProficiency(skill))
            ) : (
                <span>N/A</span>
            )}
        </div>
        <div><span className="font-[600]">Senses:</span> {flattingDictionary(formatSenses(senses))}</div>
        <div><span className="font-[600]">Languages: </span>
            <CensorAnswer censor={censor} answer={answer} description={languages}/>
        </div>
        <div>
            <span><span className="font-[600]">CR</span> {cr} </span>
            <span>(XP {xp}, </span>
            <span>PB +{pb})</span>
        </div>
    </section>);
};

export default ExtraStats;