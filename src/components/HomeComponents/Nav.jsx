import React from "react";
import { FaGear } from "react-icons/fa6";
import { FaQuestion } from "react-icons/fa";


export default function Nav({ onSettingsClick, onHelpClick }) {
    return (
        <nav className="w-full bg-white border-b border-gray-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
                {/* Left: Brand / Title */}
                <div className="flex items-center gap-2">
                    <img src="./StatGuesser.png" width="25em" /><span className="text-xl font-semibold text-gray-900">Stat Guesser</span>
                </div>

                {/* Right: Icons */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        aria-label="Help"
                        className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={onHelpClick}
                        title="Help"
                    >
                        <FaQuestion className="h-6 w-6 text-gray-700" />
                    </button>
                    <button
                        type="button"
                        aria-label="Settings"
                        className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={onSettingsClick}
                        title="Settings"
                    >
                        <FaGear className="h-6 w-6 text-gray-700" />
                    </button>
                </div>
            </div>
        </nav>
    );
}