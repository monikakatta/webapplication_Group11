import { useNavigate } from "react-router-dom";
import ListComp from "../ListComp/ListComp";
import HeaderButton from "../header/HeaderButton";
import useSpeech from "../keyboardShorcut/textToSpeech";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import './shortcuts.css';

const Shorcuts = () => {
    const navigationList = [
        "Home Press h",
        "Female Read Loud Press f",
        "Stop Voiceover b",
        "Male Voice Loud Press m",
        "ShortCuts Press s",
        "Statistical Calculator c",
        "Add New File n",
        "Bar Graph Visualization ctrl + b",
        "Audiable Bar Graph a",
    ];

    return (
        <div className="Shortcutpage">
            <HeaderButton name="spring1" />
            <div className="container-he">
                <ol className='list-style-ol'>
                    {navigationList.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ol>
            </div>
        </div>
    )
}

export default Shorcuts;