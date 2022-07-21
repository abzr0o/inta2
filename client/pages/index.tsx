import type { NextPage } from "next";
import Image from "next/image";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import test from "../assets/test.jpg";
import ActivityCard from "../components/activity/Card";
import Card from "../components/Card/Card";
import { getTrending } from "../components/Card/reducer";
import ColBase from "../components/posts/ColBase";
import Post from "../components/posts/post";
import baseurl from "../utils/api/baseurl";
const Home: NextPage = ({}: any) => {
  return (
    <div className="base">
      <nav className="navBar"></nav>
      <div className="wrapper">
        <div className="continer">
          <div className="CardContiner CardLeft">
            <ActivityCard title="activty" />
            <Card title="trendning" />
          </div>
          <ColBase />
          <div className="CardContiner CardRight">
            <ActivityCard title="activty" />
            <Card title="trendning" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
