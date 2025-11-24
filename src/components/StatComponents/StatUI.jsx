import React, { useState, useEffect } from "react";

const StatUI = () => {

    return (<section className="mt-[2em]">
        <div className="grid grid-cols-2">
            <div>
                <h2>Name</h2>
                type
                <h2>Stats</h2>
                ac
                hp
                speed

                str dex con
                int wis cha
                <h2>Proficiencies</h2>
                skills
                senses
                languages
                cr
            </div>
            <div>
                <h2>Traits</h2>
                desc
                <h2>Actions</h2>
                abilities
            </div>
        </div>
    </section>);
};

export default StatUI;