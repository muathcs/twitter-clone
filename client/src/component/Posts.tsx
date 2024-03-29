import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { setPosts } from "../Redux/postsReducer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { apiUrl } from "../utilities/path";

function Posts({
  post,
  comment,
  setPostExpanded,
  setPost,
  postExpanded,
  postArr,
}: {
  post?: any;
  comment?: any;
  setPostExpanded?: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  setPost: any;
  postExpanded: boolean;
  postArr?: any;
}) {
  const user = useSelector((state: RootState) => state.setSigned);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser }: any = useAuth();

  console.log("API-URL: ", apiUrl);

  //Like functionality
  async function likePost(e: any) {
    if (!currentUser) {
      // if user attempts to like whilst not logged in, direct them to the login section
      navigate("/auth");
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/like`, {
        id: post._id,
        username: currentUser.displayName, //user likes and username
      });

      dispatch(setPosts(response.data.post));
    } catch (err: any) {
      console.log("error", err.message);
    }
  }

  // console.log("postContent: ", post);
  const liked =
    post &&
    post.likedBy &&
    Array.isArray(post.likedBy) &&
    post.likedBy.some((item: any) => item && item._id === user._id);

  return (
    <div
      onClick={(e) => {
        setPost(post);
        if (!setPostExpanded) return;
      }}
      id="post"
      className=" border-b  bg-[#15202B]  dark:bg-white dark:text-black hover:bg-[#162431] dark:border-gray-300 border-gray-600  min-h-[15%] w-full h-auto  relative cursor-pointer flex flex-col gap-2 items-center justify-end pt-8 pb-[1.5rem] "
    >
      <div className=" absolute left-2 top-2 flex gap-2     text-white h-auto w-1/2">
        <div className="w-[40px] h-[40px] rounded-[100%] bg-white dark:bg-gray-300 relative flex item-center justify-center">
          <i className="fa-regular fa-user text-black dark:text-white text-[28px] relative top-[15%] "></i>
        </div>
        <p className="dark:text-black">{post.username}</p>
      </div>
      <div
        id="post"
        className="text-left w-4/5 h-auto justify-self-end left-5 relative text-gray-600"
      >
        {post.content}
      </div>
      {postExpanded && (
        <div className="text-left w-4/5 h-auto justify-self-end left-5 relative border-b">
          23/09/2008
        </div>
      )}
      {
        <div
          id="post"
          className={` ${
            postExpanded && "border-b"
          }  flex  w-4/5 relative  justify-end left-5 items-center gap-10 text-[20px] text-gray-400 flex-row-reverse `}
        >
          <i
            onClick={(e) => {
              likePost(e);
            }}
            className={`fa-regular fa-heart flex  items-start relative justify-center cursor-pointer hover:text-red-600  ${
              liked ? "text-red-600" : ""
            }`}
          >
            <span className="text-xs ml-3  ">
              {post.likes < 1 ? "" : post.likes}
            </span>
          </i>
          <i className="fa-solid fa-retweet"></i>
          <i className="fa-regular fa-comment"></i>{" "}
        </div>
      }
    </div>
  );
}

export default Posts;
