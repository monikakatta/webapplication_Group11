import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import HeaderButton from "../header/HeaderButton";
import './graph.css';
import useSpeech from "../keyboardShorcut/textToSpeech";


const BarGraphEle = () => {
  const { stopSpeech } = useSpeech()
  const excelData = useSelector((state) => state.excelData.data);
  const [xColumn, setXColumn] = useState('');
  const [yColumn, setYColumn] = useState('');
  const [speaking, setSpeaking] = useState(false);




  const handleXaxis = (val) => {
    setXColumn(val);
  };

  const handleYaxis = (val) => {
    setYColumn(val);
  };

  const filteredData = excelData.map(row => ({
    xValue: row[xColumn],
    yValue: row[yColumn],
  }));

  const handleKeyPress = (event) => {
    if (event.key === "b") {
      // Stop speech when "B" key is pressed
      stopSpeech();
    }
    if (event.key === 'v') {
      readSelectedData();
    }
  };


  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      const speechSynthesis = window.speechSynthesis;
      const speechText = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(speechText);
    } else {
      console.error("Text-to-speech not supported in this browser.");
    }
  };

  const readSelectedData = () => {
    if (xColumn && yColumn) {
      const selectedXData = excelData.map(row => row[xColumn]).join(", ");
      const selectedYData = excelData.map(row => row[yColumn]).join(", ");
      const text = `Selected X-axis data: ${selectedXData}. Selected Y-axis data: ${selectedYData}.`;
      speakText(text);
      setSpeaking(true);
    }
  };

  useEffect(() => {
    // Add the event listener when the component mounts
    document.addEventListener("keydown", handleKeyPress);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [xColumn, yColumn]);

  return (
    <>
      <HeaderButton />
    { excelData.length>0&& <button
            onClick={readSelectedData}
            style={{
              backgroundColor: "rgb(160, 186, 211)",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              position:'relative',
              left:'50%'
            }}
          >
           Audiable Graph
          </button>}
      <div className="graph-container">
        <div className="box-1">
          <ColumnSelectComp
            axis='X-Axis'
            excelData={excelData.length > 0 ? excelData : 'No Excel Sheet'}
            onClick={handleXaxis}
            selectedColumn={xColumn}
          />
          <ColumnSelectComp
            axis='Y-Axis'
            excelData={excelData.length > 0 ? excelData : 'No Excel Sheet'}
            onClick={handleYaxis}
            selectedColumn={yColumn}
          />
         
        </div>
        <div className="graph">
          <h3>Bar Graph Element</h3>
          <br />
          <BarChart width={1000} height={420} data={filteredData} style={{ margin: 'auto' }}>
            <CartesianGrid
              vertical={true}
              horizontal={false}
              stroke="#56829a"
              strokeWidth={1}
            />
            <XAxis dataKey="xValue" label={{ value: "X-Axis", position: "insideBottom" }} tick={{ fill: "#a0bad3" }} />
            <YAxis
              label={{
                value: "Y-Axis",
                angle: -90,
                position: "insideLeft",
              }}
              tick={{ fill: "#a0bad3" }}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="yValue" fill="white" />
          </BarChart>
        </div>
        <br />
        <br />
      </div>
    </>
  );
};

export default BarGraphEle;

const ColumnSelectComp = ({ excelData, axis, onClick, selectedColumn }) => {
  return (
    <>
      <aside className="table-aside">
        <h5>{axis}</h5>
        <ul>
          {Object.keys(excelData[0]).map((header, index) => {
            return (
              <li
                key={index}
                onClick={() => onClick(header)}
                className={selectedColumn === header ? "selected" : ""}
              >
                {header}
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
};
