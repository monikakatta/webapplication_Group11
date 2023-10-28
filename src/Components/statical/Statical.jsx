import { useSelector } from "react-redux";
import HeaderButton from "../header/HeaderButton";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ColumnSelectComp } from "../BarGraph/BarGraphEle";
import useSpeech from "../keyboardShorcut/textToSpeech";
import './Statical.css'

const Statistical = () => {
  const { stopSpeech } = useSpeech()
  const excelData = useSelector((state) => state.excelData.data);
  const [jobTitleCounts, setJobTitleCounts] = useState({});
  const [mean, setMean] = useState(null);
  const [mode, setMode] = useState(null);
  const [xColumn, setXColumn] = useState('');

  useEffect(() => {
    const counts = {};

    excelData.forEach((row) => {
      const jobTitle = row[xColumn];

      if (!counts[jobTitle]) {
        counts[jobTitle] = 1;
      } else {
        counts[jobTitle]++;
      }
    });

    setJobTitleCounts(counts);
  }, [excelData, xColumn]);

  useEffect(() => {
    const jobTitles = excelData.map((row) => row[xColumn]);

    const totalRecords = excelData.length;
    const totalJobTitles = Object.keys(jobTitleCounts).length;
    const meanValue = totalRecords / totalJobTitles;
    setMean(meanValue);

    // Calculate the mode
    const mode = jobTitles.reduce(
      (accumulator, title) => {
        if (!accumulator.freq[title]) {
          accumulator.freq[title] = 1;
        } else {
          accumulator.freq[title]++;
        }
        if (accumulator.freq[title] > accumulator.maxFreq) {
          accumulator.mode = [title];
          accumulator.maxFreq = accumulator.freq[title];
        } else if (accumulator.freq[title] === accumulator.maxFreq) {
          accumulator.mode.push(title);
        }
        return accumulator;
      },
      { freq: {}, mode: [], maxFreq: 0 }
    );


    setMode(mode.mode.join(", "));
  }, [excelData]);

  const handleAudibleDescription = () => {
    if (window.speechSynthesis) {
      const speechText = generateAudibleDescription();
      const utterance = new SpeechSynthesisUtterance(speechText);
      window.speechSynthesis.speak(utterance);
    }
  };

  const generateAudibleDescription = () => {
    alert('You are in Undisturb Mode')
    const totalRecords = excelData.length;
    const totalJobTitles = Object.keys(jobTitleCounts).length;

    const mostCommonJobTitle = mode ? `The most common records ${mode}.` : 'There is no predominant job title.';
    const description = `There are ${totalRecords} records and ${totalJobTitles} most records are in the data is ${mostCommonJobTitle} The data consists of ${excelData.length} rows and ${excelData.length > 0 ? Object.keys(excelData[0]).length : 0} columns. Thanks `;



    return description;
  };


  const handleXaxis = (val) => {
    setXColumn(val);
  };



  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "v") {
        handleAudibleDescription();
      }
      if (event.key === "b") {
        stopSpeech();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="Staticalpage">
      <HeaderButton />
      
      <ol className="m-auto" style={{ margin: 'auto', width: 'fit-content', padding: '10px' }}>
        <li>Total No of Records in Excel Sheet : - {excelData.length}</li>
        <li>Total No :- {Object.keys(jobTitleCounts).length}</li>
        <li>Most of Records are :- {mode && mode}</li>
        <li>Total Number of Columns in Excel Sheet: {excelData.length > 0 ? Object.keys(excelData[0]).length : 0}</li>
        <li>Total Number of Rows in Excel Sheet: {excelData.length - 1}</li>
        {/* <li>Mean of all Records: {mean>0&&mean.toFixed(2)}</li> */}
      </ol>
      {excelData.length > 0 && <button
        onClick={handleAudibleDescription}
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
        Audible Statistics
      </button>}
      <div className="graph-container">
        <div className="box-1">
          <ColumnSelectComp
            axis='Select Column'
            excelData={excelData.length > 0 ? excelData : 'No Excel Sheet'}
            onClick={handleXaxis}
            selectedColumn={xColumn} //fixed the all files working
          />
          {/* <ColumnSelectComp
            axis='Y-Axis'
            excelData={excelData.length > 0 ? excelData : 'No Excel Sheet'}
            onClick={handleYaxis}
            selectedColumn={yColumn}
          /> */}

        </div>

        {excelData.length > 0 && (
          <div className="table-responsive">
            <div className="container">
              <TableContainer>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontSize: "15px", fontWeight: "600", background: "ffd8d8" }}>
                        Selected Column
                      </TableCell>
                      <TableCell style={{ fontSize: "15px", fontWeight: "600", background: "ffd8d8" }}>
                        Total
                      </TableCell>
                      <TableCell style={{ fontSize: "15px", fontWeight: "600", background: "ffd8d8" }}>
                        Percentage %
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {xColumn.length > 0 &&
                    <TableBody>
                      {Object.keys(jobTitleCounts).map((jobTitle, index) => (

                        <TableRow key={index}>
                          {/* {console.log(jobTitle)}   //removed for sample file data */}
                          <TableCell>{jobTitle}</TableCell>
                          <TableCell>{jobTitleCounts[jobTitle]}</TableCell>
                          <TableCell>{(jobTitleCounts[jobTitle] * 100 / excelData.length).toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  }
                </Table>
              </TableContainer>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

export default Statistical; 