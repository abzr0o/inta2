/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import React from "react";
import { useInfiniteQuery } from "react-query";
import { Spinner } from "reactstrap";
import ActivityCard from "../../../components/activity/Card";
import Card from "../../../components/Card/Card";
import Templet from "../../../components/posts/templet";
import { comment, commentsQuery, post } from "../../../interface/post";
import BaseLayout from "../../../layout/BaseLayout";
import CardLayoutLeft from "../../../layout/CardLayoutLeft";
import CardLayoutRight from "../../../layout/CardLayoutRight";
import CenterLayout from "../../../layout/CenterLayout";
import baseurl from "../../../utils/api/baseurl";
import styles from "../../../styles/comment.module.scss";
import moment from "moment";
import { MoreHorizontal } from "react-feather";
import { useSelector } from "react-redux";

interface props {
  post: { posts: post };
  err: null | any;
}
function Comments({ post }: props) {
  const store = useSelector((store: any) => store.authUser);

  const router = useRouter();
  const { postid } = router.query;
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isError,
    error,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery(
    `${postid} comments`,
    async (a) => {
      const data = await baseurl.get("/comments", {
        params: {
          sort: "datepost:desc",
          curser: a.pageParam,
          PostId: postid,
        },
      });
      return data.data;
    },
    {
      getNextPageParam: (lastpage) => {
        return lastpage?.pageInfo?.LastCursor;
      },
      retry: 3,
      refetchOnWindowFocus: false,
    }
  );
  if (isError) console.log((error as any).response.status);

  return (
    <BaseLayout>
      <CardLayoutLeft>
        {" "}
        <ActivityCard />
        <Card />
      </CardLayoutLeft>
      <CenterLayout>
        {post ? (
          <Templet post={post.posts} refeth={refetch} />
        ) : (
          <Spinner></Spinner>
        )}

        {isLoading || isFetchingNextPage ? <Spinner></Spinner> : null}
        <div className={styles.commentContiner}>
          {data
            ? data.pages.map((page: any) => {
                return page.comments.map(
                  ({
                    datepost,
                    id,
                    msg,
                    postid,
                    profile,
                    profileid,
                  }: comment) => {
                    return (
                      <div key={id} className={styles.commentbase}>
                        <div className={styles.left}>
                          <img
                            className={styles.profilepic}
                            src={"http://localhost:2000" + profile.imgurl}
                            alt="profile picture"
                          />
                          <div>{profile.username}</div>
                        </div>
                        <div className={styles.msg}>{msg}</div>
                        <div className={styles.right}>
                          <div>{moment(datepost).fromNow()}</div>
                          {store.isloggedin ? (
                            <div className={styles.actions}>
                              <span className={styles.edit}>edit</span>
                              <span className={styles.delete}>delete</span>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    );
                  }
                );
              })
            : null}
          {hasNextPage ? (
            <span onClick={() => fetchNextPage()} className={styles.loadmore}>
              load more comments
            </span>
          ) : null}
        </div>
      </CenterLayout>
      <CardLayoutRight>
        <ActivityCard />
        <Card />
      </CardLayoutRight>
    </BaseLayout>
  );
}

export default Comments;
export async function getServerSideProps(ctx: any) {
  // Fetch data from external API
  try {
    const postData = await baseurl.get(`post/${ctx.query.postid}`);
    //   console.log(res.data);
    return { props: { post: postData.data, err: null } };
  } catch (err: any) {
    console.log(err);
    return {
      props: { post: null, err: 1 },
    };
  }

  // Pass data to the page via props
}
