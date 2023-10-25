import React, { useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import useSpeech from "../keyboardShorcut/textToSpeech";

const BarGraphEle = () => {
  const excelData = useSelector((state) => state.excelData.data);
  const navigate = useNavigate();
  const { stopSpeech } = useSpeech()

  // Create a data structure with unique job types and their counts
  const jobTypeCounts = {};

  excelData.forEach((row) => {
    const jobType = row["Job Title"];
    if (jobTypeCounts[jobType]) {
      jobTypeCounts[jobType] += 1;
    } else {
      jobTypeCounts[jobType] = 1;
    }
  });

  const jobData = Object.keys(jobTypeCounts).map((jobType) => ({
    jobType,
    count: jobTypeCounts[jobType],
  }));

  const handleKeyPress = (event) => {
    if (event.key === "b") {
      // Stop speech when "B" key is pressed
      stopSpeech();
    }
  };

  useEffect(() => {
    const speak = (text) => {
      if ("speechSynthesis" in window) {
        const speechSynthesis = window.speechSynthesis;
        const speechText = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(speechText);
      } else {
        console.error("Text-to-speech not supported in this browser.");
      }
    };

    const describeGraph = () => {
      const graphTitle = "Distribution";
      const xAxisLabel = "Type";
      const yAxisLabel = "total number of record";
      const dataDescription = jobData.map(
        (entry) =>
          `Job Type ${entry.jobType} has ${entry.count} total number of record.`
      );
      const graphDescription = `${graphTitle}. ${xAxisLabel} on the x-axis. ${yAxisLabel} on the y-axis. ${dataDescription.join(" ")}`;
      speak(graphDescription);
    };

    if (excelData.length > 0) {
      describeGraph();
    }

    // Add the event listener when the component mounts
    document.addEventListener("keydown", handleKeyPress);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [excelData, jobData]);

  return (
    <div
      tabIndex="0" // Make the component focusable
      onKeyPress={handleKeyPress} // Handle key press events
    >
      <HeaderButton />
      <div className="graph mt-4">
        <h3>Bar Graph Element</h3>
        <br />
        <BarChart width={1000} height={420} data={jobData} style={{ margin: 'auto' }}>
          <CartesianGrid
            vertical={true}
            horizontal={false}
            stroke="#56829a"
            strokeWidth={1}
          />
          <XAxis dataKey="jobType" label={{ value: "Job Type", position: "insideBottom", fill: 'white' }} tick={{ fill: "#a0bad3" }} />
          <YAxis
            label={{
              value: "No Of Data",
              angle: -90,
              position: "insideLeft",
              fill: 'white'
            }}
            tick={{ fill: "#a0bad3" }}
          />
          <Legend />
          <Bar dataKey="count" fill="white" />
        </BarChart>
      </div>
      <br />
      <br />
    </div>
  );
};

export default BarGraphEle;
