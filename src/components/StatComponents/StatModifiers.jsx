import React from "react";

const StatModifiers = ({ strength, dexterity, constitution, intelligence, wisdom, charisma }) => {

    const tdStyle = "px-2";
    const topStyle = "bg-[#EDEACA]";
    const buttomStyle = "bg-[#C7C7C7]";

    const modifierStyle = "mr-[10px] font-[600]";

    return (<section>
        <table>
            <tbody>
                <tr className="grid grid-cols-3 gap-4">
                    <td className={`${tdStyle} ${topStyle}`}><span className={`${modifierStyle}`}>STR:</span> {strength}</td>
                    <td className={`${tdStyle} ${topStyle}`}><span className={`${modifierStyle}`}>DEX:</span> {dexterity}</td>
                    <td className={`${tdStyle} ${topStyle}`}><span className={`${modifierStyle}`}>CON:</span> {constitution}</td>
                </tr>
                <tr className="grid grid-cols-3 gap-4">
                    <td className={`${tdStyle} ${buttomStyle}`}><span className={`${modifierStyle}`}>INT:</span> {intelligence}</td>
                    <td className={`${tdStyle} ${buttomStyle}`}><span className={`${modifierStyle}`}>WIS:</span> {wisdom}</td>
                    <td className={`${tdStyle} ${buttomStyle}`}><span className={`${modifierStyle}`}>CHA:</span> {charisma}</td>
                </tr>
            </tbody>
        </table>
    </section>);
};

export default StatModifiers;