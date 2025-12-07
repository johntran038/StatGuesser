import React, { useState } from "react";

const ListOfMonsters = ({ list }) => {
    
    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl mt-4">List of Monsters</h2>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 mt-5">
                {list.map((monster, i) => (
                    <div className="tracking-wider" key={i}>{monster}</div>
                ))}
            </div>
        </div>
    );
};

export default ListOfMonsters;