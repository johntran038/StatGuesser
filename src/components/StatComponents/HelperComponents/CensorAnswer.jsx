import React from "react";
import { Tooltip } from "@material-tailwind/react";

const CensorAnswer = ({ className, censor, answer, description }) => {

    // Split answer into comma and space
    const words = answer.split(/[ ,]+/);
    

    const getCensoredDesciption = () => {

        // Regex for words split
        const regex = new RegExp(`(${words.join("|")})`, "gi");

        // Split description by words in answer
        const result = description
            .split(regex)
            .filter(data => data !== "");
        return result
    };

    const renderCensor = (content, key) => {

        return (<span key={key}>
            <span
                className={`transition-opacity duration-500
                     ${censor ? "opacity-100" : "opacity-0"}`}
            >
                <Tooltip className="bg-gray-700 text-white p-1 text-sm"
                    content="This Content Is Hidden">
                    <span className="text-gray-500 underline decoration-dotted">
                        {censor ? "???" : ""}
                    </span>
                </Tooltip>
            </span>
            <span
                className={`transition-opacity duration-500
                    ${censor ? "opacity-0" : "opacity-100"}`}
            >
                <span className="text-green-600">{!censor ? content : ""}</span>
            </span>
        </span>)
    }

    return (<span className={className}>
        {getCensoredDesciption().map((segment, i) => {
            if (!segment || typeof segment !== "string") return null;
            if (segment === " ") return " ";
            if (words.some(w => w.toLowerCase() === segment.toLowerCase())) return renderCensor(segment, i);
            return segment;
        })}
    </span>);

};

export default CensorAnswer;