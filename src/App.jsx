import React, { useEffect } from "react";
import Header from "./components/header/Header";
import Banner from "./components/banner/Banner";
import Coursesclassroom from "./components/classroomCourses/Coursesclassroom";
import Findcourses from "./components/findcourses/Findcourses";
import Courses from "./components/course/Courses";
import Topperszone from "./components/ToppersZone/ToppersZone";
import GetTheApp from "./components/getTheApp/GetTheApp";
import ImpactAtscale from "./components/Impactscale/ImpactAtscale";
import Storiesinspire from "./components/StoriesThatInspire/Storiesinspire";
import LatestNewsArticles from "./components/LatestNews/LatestNewsArticles";
import EMedicozFeatured from "./components/eMedicozFeatured/EMedicozFeatured";
import Footer from "./components/footer/Footer";
import Myprofile from "./components/header/Myprofile";
import CoursePlan from "./components/course/CoursePlan";
import Store from "./components/Store/Store";
import Router from "./Router";
import "./API/images";
import Profile from "./components/header/Profile";
import ReactDOM from "react-dom";
import "./App.css";

function App() {
  return (
    <>
      <Router />
      {/*
    <Profile/>
    */}
    </>
  );
}

export default App;
