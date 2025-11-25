import React from "react";

const TraitsAndActions = ({ data }) => {

    const renderInfo = (info, index) => {

        const name = info?.name;
        const desc = info?.desc;

        return (
            <p key={index} className="space-x-2">
                <span className="font-[600]">{name}.</span>
                <span className="">{desc}</span>
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