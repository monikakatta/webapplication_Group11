import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import "./home.css";
import { Box } from "@chakra-ui/react";
import Papa from "papaparse"; // Import Papaparse for CSV handling

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

import GraphView from "./GraphView";
import HeaderButton from "../../header/HeaderButton";
import { useDispatch, useSelector } from "react-redux";
import { setExcelDataGlo } from "../../../redux/excelDataSlice";

const Home = () => {
  const dispatch = useDispatch();
  const reduxExcelData  = useSelector((state) => state.excelData.data);

  const [excelFileError, setExcelFileError] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const handleFile = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      setExcelFileError("Please select any file.");
      return;
    }
    const fileName = selectedFile.name.toLowerCase();
    const isCSV = fileName.endsWith(".csv"); // Check if it's a CSV file

    if (isCSV) {
      // Handle CSV file
      Papa.parse(selectedFile, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const csvData = result.data;
          setExcelData(csvData.slice(0, 100)); // Limit to the top 100 rows
          setDisplayedData(csvData.slice(0, 100)); // Initial display
          dispatch(setExcelDataGlo(csvData));
          setExcelFileError(null);
        },
        error: () => {
          setExcelFileError("Error parsing the CSV file.");
        },
      });
    }else{ 
    // Check if the selected file has one of the allowed file extensions
    const allowedExtensions = [".xlsx", ".xlsm", ".xlsb", ".xls"];
    const fileName = selectedFile.name.toLowerCase();
    const isValidExtension = allowedExtensions.some((ext) =>
      fileName.endsWith(ext)
    );

    if (!isValidExtension) {
      setExcelFileError("Invalid file type. Please select a .xlsx, .xls file.");
      // setExcelFileError(null);
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
      dispatch(setExcelDataGlo(jsonData));
      setExcelFileError(null);
    };
    fileReader.onerror = () => {
      setExcelFileError("Error reading the file.");
    };
  }
  };



  useEffect(() => {
    // Check if the local state is empty and the Redux store has data
    if (excelData.length === 0 && reduxExcelData.length > 0) {
      setExcelData(reduxExcelData);
      setDisplayedData(reduxExcelData);
    }
  }, [reduxExcelData, excelData]);



  return (
    <>
      <div className="outBox">
        <HeaderButton />
        <Box>
          {/* <div className="main">
            <form className="form-group" autoComplete="off">
              <br></br>
              <input
                type="file"
                className="form-control"
                accept=".xlsx,.xls"
                onChange={handleFile}
                required
              ></input>
              <div className="dragDiv">
                <p className="dragText">Drag and Drop</p>
              </div>
              {excelFileError ? (
                <div className="text-danger" style={{ marginTop: "10px" }}>
                  {excelFileError}
                </div>
              ) : (
                <p style={{ marginTop: "10px", color: "white" }}></p>
              )}
            </form>
          </div> */}



          {excelData.length === 0 && (
            <div className="dragAndDropDiv">
              <br></br>
              <input
                type="file"
                className="form-control"
                accept=".xlsx,.xls,.csv"
                onChange={handleFile}
                required
              ></input>
              <br />
              {excelFileError ? (
                <div className="text-danger" style={{ marginTop: "10px" }}>
                  {excelFileError}
                </div>
              ) : (
                <p style={{ marginTop: "10px", color: "white" }}></p>
              )}
            </div>
          )}

          <br></br>
          {/* <div className="container">
            <TableComponent excelData={excelData} />
          </div> */}
          <div className="viewer">
            {excelData.length === 0 && <p style={{ color: "white" }}></p>}
            {excelData.length > 0 && (
              <div className="table-responsive">
                <TableContainer>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        {Object.keys(excelData[0]).map((header, index) => (
                          <TableCell
                            style={{
                              fontSize: "15px",
                              fontWeight: "600",
                              background: "ffd8d8",
                            }}
                            key={index}
                          >
                            {header}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {displayedData.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                          {Object.values(row).map((cell, cellIndex) => (
                            <TableCell
                              key={cellIndex}
                              style={{
                                border: "2px,solid,black",
                                background: "",
                              }}
                            >
                              {cell}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            )}
          </div>
        </Box>
      </div>

      {/* <div className="bar-graph-container">
        {excelData.length > 0 && <GraphView excelData={excelData} />}
      </div> */}
    </>
  );
};
export default Home;