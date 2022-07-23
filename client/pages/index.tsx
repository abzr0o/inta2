import type { NextPage } from "next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import ActivityCard from "../components/activity/Card";
import Card from "../components/Card/Card";

import PostScroll from "../components/posts/PostScroll";
import BaseLayout from "../layout/BaseLayout";
import CardLayoutLeft from "../layout/CardLayoutLeft";
import CardLayoutRight from "../layout/CardLayoutRight";
import CenterLayout from "../layout/CenterLayout";
import { checkCookie } from "../utils/reducers/auth/auth";

const Home: NextPage = ({}: any) => {
  return (
    <BaseLayout>
      <CardLayoutLeft>
        <ActivityCard title="activty" />
        <Card title="trendning" />
      </CardLayoutLeft>

      <PostScroll />

      <CardLayoutRight>
        <ActivityCard title="activty" />
        <Card title="trendning" />
      </CardLayoutRight>
    </BaseLayout>
  );
};

export default Home;
