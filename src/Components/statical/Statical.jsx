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

const Statistical = () => {
  const excelData = useSelector((state) => state.excelData.data);
  const [jobTitleCounts, setJobTitleCounts] = useState({});
  const [mean, setMean] = useState(null);
  const [mode, setMode] = useState(null);

  useEffect(() => {
    const counts = {};

    excelData.forEach((row) => {
      const jobTitle = row["Job Title"];

      if (!counts[jobTitle]) {
        counts[jobTitle] = 1;
      } else {
        counts[jobTitle]++;
      }
    });

    setJobTitleCounts(counts);
  }, [excelData]);

  useEffect(() => {
    const jobTitles = excelData.map((row) => row["Job Title"]);

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
    const totalRecords = excelData.length;
    const totalJobTitles = Object.keys(jobTitleCounts).length;

    const mostCommonJobTitle = mode ? `The most common records ${mode}.` : 'There is no predominant job title.';

    return `There are ${totalRecords} records and ${totalJobTitles} most records are in the data is ${mode} The data consists of ${excelData.length} rows and ${excelData.length > 0 ? Object.keys(excelData[0]).length : 0} columns.`;
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "v") {
        handleAudibleDescription();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <>
      <HeaderButton />
      
      <ol className="m-auto" style={{ margin: 'auto', width: 'fit-content', padding: '10px' }}>
        <li>Total No of Records : - {excelData.length}</li>
        <li>Total No of Post :- {Object.keys(jobTitleCounts).length}</li>
        <li>Most of Records are :- {mode&&mode}</li>
        <li>Total Number of Columns: {excelData.length > 0 ? Object.keys(excelData[0]).length : 0}</li>
        <li>Total Number of Rows: {excelData.length-1}</li>
        {/* <li>Mean of all Records: {mean>0&&mean.toFixed(2)}</li> */}
      </ol>
      <Box>
        {excelData.length > 0 && (
          <div className="table-responsive">
            <TableContainer>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontSize: "15px", fontWeight: "600", background: "ffd8d8" }}>
                      Job Title
                    </TableCell>
                    <TableCell style={{ fontSize: "15px", fontWeight: "600", background: "ffd8d8" }}>
                      Count
                    </TableCell>
                    <TableCell style={{ fontSize: "15px", fontWeight: "600", background: "ffd8d8" }}>
                      Mean
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(jobTitleCounts).map((jobTitle, index) => (

                    <TableRow key={index}>
                      {console.log(jobTitle)}
                      <TableCell>{jobTitle}</TableCell>
                      <TableCell>{jobTitleCounts[jobTitle]}</TableCell>
                      <TableCell>{(jobTitleCounts[jobTitle]/Object.keys(jobTitleCounts).length).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </Box>
    </>
  );
};

export default Statistical;
