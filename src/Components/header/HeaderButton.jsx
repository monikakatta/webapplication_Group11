import { Box } from "@chakra-ui/react";
import useSpeech from "../keyboardShorcut/textToSpeech";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './sidebar.css'
import { setExcelDataGlo, visualMode } from "../../redux/excelDataSlice";


const HeaderButton = ({ name }) => {


  const location = useLocation();

  const isButtonActive = (route) => location.pathname === route;

  const dispatch = useDispatch()


  const excelData = useSelector((state) => state.excelData.data);
  const [speechSynthesis, setSpeechSynthesis] = useState(null);

  const [textData, setTextData] = useState('')

  const { stopSpeech } = useSpeech();

  const navigate = useNavigate()
  // console.log(location)

  function handleNavigator(val) {
    navigate(val);
  }

  // Function to speak text
  const speakText = (text, voiceIndex) => {
    // console.log(text)
    const cleaned = text.replace(/[^a-zA-Z0-9\s]/g, "");
    if (speechSynthesis) {
      // console.log(text)
      const voices = speechSynthesis.getVoices();
      const utterance = new SpeechSynthesisUtterance(cleaned);
      utterance.voice = voices[voiceIndex];
      speechSynthesis.speak(utterance);
    }
  };


  const handleKeyPress = (event) => {
    if (event.key === "f") {
      console.log('firing')
      alert('You are in Undisturb Mode')
      // console.log(JSON.stringify(excelData))
      const limitedData = excelData.slice(0, 100); // Extract the first 100 rows of data
      const jsonLimitedData = JSON.stringify(limitedData);
      // setSpeech(jsonLimitedData)
      // console.log('f')
      speakText(jsonLimitedData, 2); // Trigger female voice speech
    }
    if (event.key === "m") {
      alert('You are in Undisturb Mode')
      const limitedData = excelData.slice(0, 100); // Extract the first 100 rows of data
      const jsonLimitedData = JSON.stringify(limitedData);
      // setSpeech(jsonLimitedData)
      // console.log('f')
      speakText(jsonLimitedData, 1);
    }
    if (event.key === "f" || event.key === "m") {
      alert('You are in Undisturb Mode');
      const limitedData = excelData.slice(0, 100);
      const jsonLimitedData = JSON.stringify(limitedData);
      speakText(jsonLimitedData, event.key === "f" ? 2 : 1);
    }
    if (event.key === "b") {
      stopSpeech(); // Trigger voice stop
    }
    if (event.ctrlKey && event.key === 'b') {
      // Handle Ctrl + B for bar chart
      navigate('/bargraph')
    }
    if (event.key === 'h') {

      navigate('/')
    }
    if (event.key === 'c') {

      navigate('/statistics')
    }
    if (event.key === 's') {

      navigate('/shortcuts')
    }
    if (event.key === 'a') {

      navigate('/audiobar')
    }
    if (event.key === 'n') {

      dispatch(setExcelDataGlo([]));
      handleNavigator("/")
    }
  };



  useEffect(() => {
    // console.log(name)
    // setTextData(excelData)
    setSpeechSynthesis(window.speechSynthesis);


    document.addEventListener("keydown", handleKeyPress);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("keydown", handleKeyPress);
    };


  }, [excelData]);


  const [isOpen, setIsopen] = useState(false);

  const toggleSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true);
  }




  return (
    <>

      <div className=""
        tabIndex="0" // Make the component focusable
        onKeyPress={handleKeyPress} // Handle key press events
      >

<center><h1 style={{ color:"#a0bad3" }}>Inclusivity in Data Visualization</h1></center>


        <Box className="">
          <div className="topButtons navbar">
            <Button
              text="bar graph visualisation"
              backgroundColor={isButtonActive("/bargraph") ? "#56829a" : "#a0bad3"}
              onClick={() => handleNavigator("/bargraph")}
            />
            <Button
              text="focused typography"
              backgroundColor={isButtonActive("/focused-typography") ? "#56829a" : "#a0bad3"}
              onClick={toggleSidebar}
            />
            <Button
              text="statistical calculator"
              backgroundColor={isButtonActive("/statistics") ? "#56829a" : "#a0bad3"}
              onClick={() => handleNavigator("/statistics")}
            />

            <div className="dropdown">
              <Button
                text="accessibility shortcut"
                backgroundColor={isButtonActive("/shortcuts") ? "#56829a" : "#a0bad3"}
                onClick={() => handleNavigator("/shortcuts")}
              />
            </div>
            <Button text="New File"
              backgroundColor={isButtonActive("/audiobar") ? "#56829a" : "#a0bad3"}
              onClick={() => {

                dispatch(setExcelDataGlo([]));
                handleNavigator("/")
              }}
            />

            {/* <Button text="audible statics"
            // backgroundColor={isButtonActive("/statistics") ? "#56829a" : "#a0bad3"}
            /> */}
            <Button text="undisturbed mode"
              onClick={() => stopSpeech()}
            />
            <Button text="Home" onClick={() => handleNavigator("/")} backgroundColor={isButtonActive("/") ? "#56829a" : "#a0bad3"} />
            {/* <div className="dropdown-item">
            <Button text="readout loud"
              backgroundColor={isButtonActive("/shortcuts") ? "#56829a" : "#a0bad3"}
              onClick={() => handleNavigator("/shortcuts")} />
          </div> */}
          </div>
        </Box>
        <Sidebar
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
        />
      </div>
    </>
  );
};

export default HeaderButton;



const Button = ({ text, backgroundColor, onClick }) => {
  return (
    <button
      style={{ background: backgroundColor || "#a0bad3" }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}; 



const Sidebar = ({ isOpen, toggleSidebar }) => {

  const dispatch = useDispatch()

  const isVisualComfortMode1 = useSelector((state) => state.excelData.mode)

  const [openProfile, setProfile] = useState(false);

  const [font, setFont] = useState(14)
  const [weight, setWeight] = useState(400)

  // const [isVisualComfortMode, setVisualComfortMode] = useState(false);
  const [updateFont, setUpdateFont] = useState(false)

  const handleToggleVisualComfortMode = () => {
    dispatch(visualMode(!isVisualComfortMode1))
    // setVisualComfortMode(!isVisualComfortMode);
  };

  useEffect(() => {

  }, [isVisualComfortMode1])


  return (
    <>
      <style>
        {`
          body {
            background-color: ${isVisualComfortMode1 ? "#333" : "#fff"};
            color: ${isVisualComfortMode1 ? "#fff" : "#000"};
            font-family: ${updateFont ? "Rubik, sans-serif" : "Ubuntu, sans-serif"};
            font-size:${font}px;
            font-weight:${weight} !important;
            
          }
          #root{
            background-color: ${isVisualComfortMode1 ? "#333" : "#fff"};
            color: ${isVisualComfortMode1 ? "#fff" : "#000"};
          }
        .table-aside {
          border:solid 1px ${isVisualComfortMode1 ? "#fff" : "#000"} !important;
        }
          
          .topButtons button {
            background-color: ${isVisualComfortMode1 ? "#333" : "#fff"};
            color: ${isVisualComfortMode1 ? "#fff" : "#000"};
            font-weight:${weight} !important;
          }
          .sidebar,.sd-body , .sd-link{
            background-color: ${isVisualComfortMode1 ? "rgb(86, 130, 154)" : "#fff"};
            color: ${isVisualComfortMode1 ? "#fff" : "#000"};
          }
         
          .recharts-layer path {
            background-color: ${isVisualComfortMode1 ? "#333" : "#fff"};
            fill: ${isVisualComfortMode1 ? "#fff" : "#000"};
          }
          .list-style-ol{
            color: ${isVisualComfortMode1 ? "#fff" : "#333"}
          }
          .css-1ex1afd-MuiTableCell-root{
            background-color: ${isVisualComfortMode1 ? "#333" : "#fff"};
            color: ${isVisualComfortMode1 ? "#fff" : "#000"};
            border:solid 1px ${isVisualComfortMode1 ? "#fff" : "#000"} !important;
          }
          // You can add additional styles here for other elements
        `}
      </style>


      <div className="container-fluid mt-3">
        <div className="btn btn-primary iconOuter" onClick={toggleSidebar}  >
          <i className="gg-chevron-double-right-r"></i>
        </div>

        <div className={`sidebar ${isOpen == true ? 'active' : ''}`}>
          <div className="sd-header">
            <h4 className="mb-0">Comfort Zone</h4>
            <div className="btn btn-primary iconOuter" onClick={toggleSidebar}><i className="gg-move-left"></i></div>
          </div>
          <div className="sd-body topButtons navbar ">


            <Button
              text="visual comfort mode"
              backgroundColor={isVisualComfortMode1 ? "#a0bad3" : "#56829a"}
              onClick={() => {
                handleToggleVisualComfortMode(); // Toggle visual comfort mode
              }}
            />
            <Button
              text={`${updateFont ? "Rubik, sans-serif" : "Ubuntu, sans-serif"}`}
              backgroundColor={isVisualComfortMode1 ? "#a0bad3" : "#56829a"}
              onClick={() => {
                setUpdateFont(!updateFont); // Toggle visual comfort mode
              }}
            />
            <div className="d-flex txtIcon mt-4" style={{ justifyContent: 'space-around', width: '100%', alignItems: 'center' }}>


              <label htmlFor="font" style={{ marginBottom: '0px' }}>Font Size</label>
              <i className="gg-add" onClick={() => { setFont(font + 1) }}></i>
              <i className="fa-solid fa-magnifying-glass-minus" onClick={() => { setFont(font - 1) }}></i>

            </div>
            <div className="d-flex " style={{ justifyContent: 'space-around', width: '100%', alignItems: 'center' }}>


              <label htmlFor="font" style={{ marginBottom: '0px' }}>Font Weight</label>
              <i className="gg-add" onClick={() => {
                if (weight < 1000) {
                  setWeight(weight + 100)
                }
              }}></i>
              <i className="fa-solid fa-magnifying-glass-minus" onClick={() => {
                if (weight > 0) {
                  setWeight(weight - 100)
                }

              }}></i>

            </div>



          </div>
        </div>
        <div className={`sidebar-overlay ${isOpen == true ? 'active' : ''}`} onClick={toggleSidebar}></div>
      </div>
    </>
  )
}
