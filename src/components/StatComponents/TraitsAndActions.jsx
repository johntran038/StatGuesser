import React from "react";
import { Tooltip } from "@material-tailwind/react";
import CensorAnswer from "./HelperComponents/CensorAnswer";

const TraitsAndActions = ({ data, answer, censor }) => {

    const renderInfo = (info, index) => {

        const name = info?.name;
        const desc = info?.desc;

        return (
            <div key={index} className="space-x-2">
                <span className="font-[600]"><CensorAnswer censor={censor} answer={answer} description={name}/>.</span>
                <CensorAnswer censor={censor} answer={answer} description={desc}/>
            </div>
        )
    };

    return (<>
        {data && data.length > 0 ? (
            data.map((info, index) => renderInfo(info, index))
        ) : (
            <span>N/A</span>
        )}
    </>);
};

export default TraitsAndActions;