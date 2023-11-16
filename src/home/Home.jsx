import React, { useState } from "react";
import * as XLSX from "xlsx";
import "./home.css";
import { Box } from "@chakra-ui/react";
import { useEffect } from "react";

const Home = () => {
  const [excelFileError, setExcelFileError] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      setExcelFileError("Please select any file.");
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(selectedFile);

    fileReader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(jsonData.slice(0, 100)); // Limit to the top 100 rows
      setDisplayedData(jsonData.slice(0, 100)); // Initial display

      setExcelFileError(null);
    };

    fileReader.onerror = () => {
      setExcelFileError("Error reading the file.");
    };
  };

  useEffect(() => {});

  return (
    <>
      <div className="outBox">
        <Box>
          <h2>Upload Excel file</h2>
          <div className="main">
            <form className="form-group" autoComplete="off">
              <br></br>
              <input
                type="file"
                className="form-control"
                accept=".xlsx,.xls"
                onChange={handleFile}
                required
              ></input>
              {excelFileError ? (
                <div className="text-danger" style={{ marginTop: "5px" }}>
                  {excelFileError}
                </div>
              ) : (
                <p>Enter the Correct Format of Data</p>
              )}
            </form>
          </div>
          <br></br>
          <div className="viewer">
            <h5>View Excel file</h5>
            {excelData.length === 0 && <>No file selected</>}
            {excelData.length > 0 && (
              <div className="table-responsive-lg">
                <table className="table ">
                  <thead>
                    <tr>
                      {Object.keys(excelData[0]).map((header, index) => (
                        <th key={index} scope="col">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {displayedData.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {Object.values(row).map((cell, cellIndex) => (
                          <td key={cellIndex}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Box>
      </div>
    </>
  );
};

export default Home;
