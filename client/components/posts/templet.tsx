/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import { post } from "../../interface/post";
import styles from "../../styles/post.module.scss";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import {
  CornerUpRight,
  MessageSquare,
  MoreHorizontal,
  MoreVertical,
  ThumbsUp,
} from "react-feather";
import React, { FC, forwardRef, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import baseurl from "../../utils/api/baseurl";
const url = "http://localhost:2000";
interface prop {
  post: post;
  ref?: any;
  refeth: any;
}
const Templet = React.forwardRef(({ post, refeth }: prop, ref: any) => {
  const router = useRouter();
  const store = useSelector((store: any) => store.authUser);
  const [readmore, setreadmore] = useState(false);
  const [dropDownOpen, setdropDownOpen] = useState(false);
  const openComment = () => {
    router.push(`/post/${post.id}/comments`);
  };
  const deletepost = async (id: any, userid: any) => {
    try {
      await baseurl.delete(`/post/${id}`, {
        params: {
          userid,
        },
      });
      if (router.pathname === "/") {
        refeth();
      } else {
        router.push("/");
      }
    } catch (err) {}
  };
  const toggoleDropDown = () => {
    setdropDownOpen(!dropDownOpen);
  };
  return (
    <div ref={ref} className={styles.postBase}>
      <div className={styles.postNav}>
        <img
          src={url + post.profile.imgurl}
          alt="profile picture"
          className={styles.profilePic}
        />
        <div className={styles.info}>
          <div className={styles.username}>{post.profile.username}</div>
          <div className={styles.time}>{moment(post.createdAt).fromNow()}</div>
        </div>
        <div className={styles.drop}>
          <Dropdown isOpen={dropDownOpen} toggle={toggoleDropDown}>
            <DropdownToggle
              tag="div"
              onClick={toggoleDropDown}
              data-toggle="dropdown"
              aria-expanded={dropDownOpen}
            >
              <MoreHorizontal size={30} />
            </DropdownToggle>
            <DropdownMenu>
              {store.user && store.user.id === post.profile.id ? (
                <DropdownItem
                  onClick={() => deletepost(post.id, store.user.id)}
                >
                  delete
                </DropdownItem>
              ) : null}
              <DropdownItem></DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className={styles.postBody}>
        <span className={styles.posttext}>
          {readmore ? post.body : post.body.slice(0, 100)}
          {!readmore && post.body.length > 100 ? (
            <span
              className="seemore"
              onClick={() => {
                setreadmore(true);
              }}
            >
              See more
            </span>
          ) : null}
        </span>
        {post.src.type === "video" ? (
          <video controls className={styles.postvideo}>
            <source src={url + post.src.imgurl} />
          </video>
        ) : (
          <img
            src={url + post.src.imgurl}
            alt="post picture"
            className={styles.postPicture}
          ></img>
        )}
      </div>
      <div className={styles.postFooter}>
        <span> {post._count.comments} comments</span>
        <div className={styles.likes}>
          <span>{post._count.likes}</span>
          <ThumbsUp />
        </div>
      </div>
      <div className="divider" />
      <div className={styles.actions}>
        <button className={`${styles.actionButton}  ${styles.like}`}>
          <ThumbsUp /> <span>like</span>
        </button>
        <button
          onClick={() => openComment()}
          className={`${styles.actionButton} ${styles.comment}`}
        >
          <MessageSquare /> <span>comments</span>
        </button>
        <button className={`${styles.actionButton} ${styles.share}`}>
          <CornerUpRight /> <span>share</span>
        </button>
      </div>
      <div className="divider" />
    </div>
  );
});
Templet.displayName = "Templet";
export default Templet;
