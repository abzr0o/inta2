/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from "react";
import style from "../../styles/Card.module.scss";
import { ThumbsUp } from "react-feather";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import moment from "moment";
import { useInfiniteQuery } from "react-query";
import baseurl from "../../utils/api/baseurl";
import { useInView } from "react-intersection-observer";
import { Spinner } from "reactstrap";
interface Card {
  postion: string;
  inaitdata?: any;
  title: string;
}
const ActivityCard: any = ({ title, row }: any) => {
  const { ref, inView } = useInView();
  const {
    hasNextPage,
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    isError,
    error,
  } = useInfiniteQuery(
    "activity",
    async (a) => {
      const data = await baseurl.get("/activity", {
        params: { sort: "Date:desc", curser: a.pageParam },
      });
      return data.data;
    },
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastpage) => {
        return lastpage.pageInfo.LastCursor;
      },
      retry: 3,
    }
  );
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  const scroll = () => {
    if (data) {
      return data.pages.map((page) => {
        return page.activty.map((item: any, i: number) => {
          if (i === 4) {
            return (
              <div ref={ref} key={item.id} className={style.scrollItem}>
                <img
                  className={style.img}
                  src={item.profile.imgurl}
                  alt="profile"
                />

                <div className={style.info}>
                  <h5>{item.profile.username}</h5>
                  <h6>{item.post.body}</h6>
                </div>
                <div className={style.right}>
                  <h6>{moment(item.Date).fromNow()}</h6>
                  <div>
                    <h5>{item.post._count.likes}</h5>
                    <ThumbsUp size={20} />
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div key={item.id} className={style.scrollItem}>
                <img
                  className={style.img}
                  src={item.profile.imgurl}
                  alt="profile"
                />

                <div className={style.info}>
                  <h5>{item.profile.username}</h5>
                  <h6>{item.post.body}</h6>
                </div>
                <div className={style.right}>
                  <h6>{moment(item.Date).fromNow()}</h6>
                  <div>
                    <h5>{item.post._count.likes}</h5>
                    <ThumbsUp size={20} />
                  </div>
                </div>
              </div>
            );
          }
        });
      });
    } else if (isError && (error as any).request.status === 404) {
      return <div>no posts</div>;
    } else if (isError && !isLoading) {
      return <div>something went wrong try again</div>;
    }
  };

  return (
    <div className={style.CardBase}>
      <h3>{title}</h3>

      <div className={style.scrollContiner}>
        {scroll()}
        {isFetchingNextPage || isLoading ? (
          <div>
            <Spinner size="12" color="info" type="grow" />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ActivityCard;
