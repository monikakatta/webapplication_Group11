import { useNavigate } from "react-router-dom";
import ListComp from "../ListComp/ListComp";
import HeaderButton from "../header/HeaderButton";
import useSpeech from "../keyboardShorcut/textToSpeech";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";



const Shorcuts = () => {



    return (
        <>
            <HeaderButton name="spring1" />
            <div className="container-he">
                <ol className='list-style-ol' >
                    <li>Home Press H</li>
                    <li>Female Read Loud Press F</li>
                    <li>Male Voice Loud Press M</li>
                    <li>ShortCuts Press S</li>
                    <li>Statistical Calculator c</li>
                    <li>Bar Graph Visualization B</li>
                    <li>Audiable Bar Graph A</li>
                </ol>
            </div>
        </>
    )
}

export default Shorcuts