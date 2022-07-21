/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import moment from "moment";
import styles from "../../styles/post.module.scss";
import { useInfiniteQuery } from "react-query";
import { post } from "../../interface/post";
import baseurl from "../../utils/api/baseurl";
import { MoreHorizontal, MoreVertical } from "react-feather";
import { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Spinner,
} from "reactstrap";
import { useInView } from "react-intersection-observer";
import Templet from "./templet";
const url = "http://localhost:2000";
function Post({}: any) {
  const { ref, inView } = useInView();

  const { data, isFetchingNextPage, hasNextPage, isLoading, fetchNextPage } =
    useInfiniteQuery(
      "posts",
      async (a) => {
        const data = await baseurl.get("/posts", {
          params: { curser: a.pageParam },
        });
        return data.data;
      },
      {
        refetchOnWindowFocus: false,
        getNextPageParam: (lastpage) => {
          return lastpage.pageInfo.LastCursor;
        },
      }
    );
  useEffect(() => {
    if (hasNextPage && inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className={styles.postwrap}>
      {data?.pages.map((page) => {
        return page.posts.map((post: post, i: number) => {
          if (i === 4) {
            return <Templet key={post.id} ref={ref} post={post} />;
          }
          return <Templet key={post.id} post={post} />;
        });
      })}
      {isLoading || isFetchingNextPage ? (
        <Spinner style={{ marginLeft: "2rem" }} color="info" />
      ) : null}
    </div>
  );
}

export default Post;
