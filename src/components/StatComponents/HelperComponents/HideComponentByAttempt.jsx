import React from "react";
import { Tooltip } from "@material-tailwind/react";

const HideComponentByAttempt = ({ className, children, reveal, attemptCount, revealAtAttempt }) => {

    return (<div className={className}>
        {reveal || attemptCount >= revealAtAttempt
            ? (<>{children}</>)
            : (
                <Tooltip className="bg-gray-700 p-1 text-white text-sm"
                    content={`This stat will be revealed in ${revealAtAttempt} attempt${revealAtAttempt == 1 ? "" : "s"}.`}>
                    <span className="text-gray-500 underline decoration-dotted p-1">
                        ???
                    </span>
                </Tooltip>
            )
        }
    </div>);
};

export default HideComponentByAttempt;