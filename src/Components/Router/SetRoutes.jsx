import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Statical from "../statical/Statical";
import Home from "../home/home/Home";
import { Provider } from "react-redux";
import store from "../../redux/store";
import Shorcuts from "../shortcuts/Shortcuts";
import BarGraphEle from "../BarGraph/BarGraphEle";
import AudiableBarGraph from "../BarGraph/AudiableBarGraph";

const SetRoutes = () => {
  return (
    <>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/statistics' element={<Statical/>}/>
        <Route path="/shortcuts" element={<Shorcuts/>} />
        <Route path="/bargraph" element={<BarGraphEle />} />
        <Route path="/audiobar" element={<AudiableBarGraph/>}/>
      </Routes>
      </BrowserRouter>
      </Provider>
    </>
  );
};
export default SetRoutes;
