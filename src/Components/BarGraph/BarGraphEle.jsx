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
  PieChart,
  Pie,
  Cell
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
  const getUniqueXValues = () => {
    if (xColumn) {
      const uniqueXValues = Array.from(new Set(excelData.map(row => row[xColumn])))
      return uniqueXValues;
    }
    return [];
  };

  const filteredData = getUniqueXValues().map(xValue => ({
    xValue: xValue,
    yValue: excelData.filter(row => row[xColumn] === xValue)[0][yColumn],
  }));

  const handleKeyPress = (event) => {
    if (event.key === "b") {
      // Stop speech when "B" key is pressed
      stopSpeech();
    }
    if (event.key === 'a') {
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
    alert('You are in Undisturb Mode')
    if (xColumn && yColumn) {
      const uniqueXValues = Array.from(new Set(filteredData.map(item => item.xValue)));
      const selectedData = uniqueXValues.map(xValue => {
        const matchingItem = filteredData.find(item => item.xValue === xValue);
        return `${xValue}: ${matchingItem ? matchingItem.yValue : 'N/A'}`;
      });

      const dataDescription = selectedData.length > 0
        ? `Selected data: ${selectedData.join(", ")}.`
        : 'No data selected.';

      const text = `${dataDescription} X-axis: ${xColumn}, Y-axis: ${yColumn}.`;
      speakText(text);
      setSpeaking(true);
    }
  };

  const pieChartData = filteredData.map(entry => ({
    name: entry.xValue,
    value: entry.yValue,
  }));

  // useEffect hook to speak welcome message on component mount
  useEffect(() => {
    speakText("Welcome to the Bar Graph page.");
  }, []);




  useEffect(() => {
    // Add the event listener when the component mounts
    document.addEventListener("keydown", handleKeyPress);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [xColumn, yColumn]);

  const SimplePieChart = () => {
    const [showPieChart, setShowPieChart] = useState(false);

    const data = [
      { name: "A", value: 400 },
      { name: "B", value: 300 },
      { name: "C", value: 300 },
      { name: "D", value: 200 },
    ];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF19E0", "#FF195E", "#19FFB2", "#197DFF"];

    const renderPieChart = () => {
      setShowPieChart(true);
    };

    return (
      <div>
        <button onClick={renderPieChart}>Show Pie Chart</button>
        {showPieChart && (
          <div className="pie-chart">
            <h3>Simple Pie Chart</h3>
            <PieChart width={400} height={400}>
              <Pie
                data={pieChartData.slice(0,25)}
                dataKey="value"
                nameKey="name"
                cx={200}
                cy={200}
                innerRadius={60}
                outerRadius={100}
                fill= "#8884d8"
                paddingAngle={5}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <HeaderButton />
      {excelData.length > 0 && <button
        onClick={readSelectedData}
        style={{
          backgroundColor: "rgb(160, 186, 211)",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          position: 'relative',
          left: '50%'
        }}
      >
        Audible Graph
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
          <BarChart width={1000} height={420} data={filteredData.slice(0,100)} style={{ margin: 'auto' }}>
            <CartesianGrid
              vertical={true}
              horizontal={false}
              stroke="#56829a"
              strokeWidth={1}
            />
            <XAxis
              dataKey="xValue"
              label={{ value: "X-Axis", position: "insideBottom" }}
              tick={{ fill: "#a0bad3" }}

            />
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
          <SimplePieChart/>
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

export { ColumnSelectComp }

