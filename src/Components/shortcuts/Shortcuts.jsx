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
                    <li>Home Press h </li>
                    <li>Female Read Loud Press f </li>
                    <li>Stop Voiceover b </li>
                    <li>Male Voice Loud Press m </li>
                    <li>ShortCuts Press s </li>
                    <li>Statistical Calculator c</li>
                    <li>Add New File n </li>
                    <li>Bar Graph Visualization ctrl + b </li>
                    <li>Audiable Bar Graph a </li>
                </ol>
            </div>
        </>
    )
}

export default Shorcuts