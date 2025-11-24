import React, { useState, useEffect } from "react";

const StatUI = ({ currentWordDesc }) => {
    const [wordDescription, setWordDescription] = useState("");
    useEffect(() => { //Testing purposes
        setWordDescription(currentWordDesc);
    }, [currentWordDesc]);

    return (<section className="mt-[2em]">
        <div className="grid grid-cols-2">
            <div>
                <h2>Name: {wordDescription?.name ?? "Unknown"}</h2>
                <h2>Type: {wordDescription?.type ?? "Unknown"}</h2>
                <h2>---Stats---</h2>
                {/* <p>AC: {wordDescription?.armor_class ?? "Unknown"}</p> */}
                <p>HP: {wordDescription?.hit_points ?? "Unknown"}</p>
                {/* <p>Speed: {wordDescription?.speed ?? "Unknown"}</p> */}

                <b>str: {wordDescription?.strength ?? "Unknown"}</b>
                <b>dex: {wordDescription?.dexterity ?? "Unknown"}</b>
                <b>con: {wordDescription?.constitution ?? "Unknown"}</b>
                <b>int: {wordDescription?.intelligence ?? "Unknown"}</b>
                <b>wis: {wordDescription?.wisdom ?? "Unknown"}</b>
                <b>cha: {wordDescription?.charisma ?? "Unknown"}</b>
                
                <h2>---Proficiencies---</h2>
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