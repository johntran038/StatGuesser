import React from "react";
import { Tooltip } from "@material-tailwind/react";

const TraitsAndActions = ({ data, answer, censor }) => {

    const getCensoredDesciption = (desc) => {
        let wordsToCensor = answer.split(" ");
        let result = desc;
        for (let i = 0; i < wordsToCensor.length; i++) {
            const regex = new RegExp(wordsToCensor[i], "gi");
            result = result.replace(regex, "???");
        }
        return result;
    };

    const renderInfo = (info, index) => {

        const name = info?.name;
        const desc = !censor ?
            info?.desc :
            getCensoredDesciption(info?.desc).split("???");

        if (censor) {
            return (
                <p key={index} className="space-x-2">
                    <span className="font-[600]">{name}.</span>
                    <span>{desc.map((result, index) => (
                        <span key={index}>
                            {result}
                            {index < desc.length - 1 && (
                                <Tooltip className="bg-gray-700 opacity-100 text-white p-1 text-sm" content="This Content Is Hidden">???</Tooltip>
                            )}
                        </span>
                    ))}</span>
                </p>
            )
        }

        return (
            <p key={index} className="space-x-2">
                <span className="font-[600]">{name}.</span>
                <span>{desc}</span>
            </p>
        );
    };

    return (<>
        {data && data.length > 0 ? (
            data
                .map((info, index) => renderInfo(info, index))
        ) : (
            <span>N/A</span>
        )}
    </>);
};

export default TraitsAndActions;