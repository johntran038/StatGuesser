import React from "react";

const ExtraStats = ({ proficiencies, senses, languages, cr, xp, pb, flattingDictionary }) => {

    const renderProficiency = (skill) => {
        const index = skill?.proficiency.index;
        const name = skill?.proficiency.name.split(": ")[1];
        const value = skill?.value;

        return (
            <span key={index} className="after:content-[','] last:after:content-none">{name} +{value}</span>
        );
    };

    return (<>
        <p className="space-x-2">
            <span>Skills:</span>
            {proficiencies && proficiencies.length > 0 ? (
                proficiencies
                    .filter(data => data.proficiency.index.startsWith("skill"))
                    .map(skill => renderProficiency(skill))
            ) : (
                <span>N/A</span>
            )}
        </p>
        <p>Senses: {flattingDictionary(senses)}</p>
        <p>Languages: {languages}</p>
        <span>CR {cr} </span>
        <span>(XP {xp}, </span>
        <span>PB +{pb})</span>
    </>);
};

export default ExtraStats;