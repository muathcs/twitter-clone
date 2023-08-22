import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { setPosts } from "../Redux/postsReducer";

function Posts({ post }: any) {
  // useEffect(() => {
  //   getPosts();
  // }, []);

  // console.log("On Posts component");
  const user = useSelector((state: RootState) => state.setSigned);
  const poster = useSelector((state: RootState) => state.postsRedux);
  const dispatch = useDispatch();

  async function likePost(e: any) {
    // console.log("isnide: ", post);

    // e.target.className += " text-red-600";
    try {
      const response = await axios.post("http://localhost:3001/like", {
        id: post._id,
        username: user.username, //user likes and username
      });

      // console.log("res: ", response.data);
      await dispatch(setPosts(response.data.post));
    } catch (err: any) {
      console.log("error", err.message);
    }
  }

  const liked = post.likedBy.some((item: any) => item._id == user._id);

  return (
    <div className="border-b bg-[#15202B] border-gray-600 min-h-[15%] w-full h-auto  relative    flex flex-col gap-2 items-center justify-end pt-8 pb-[1.5rem] ">
      <div className=" absolute left-2 top-2 flex gap-2     text-white h-auto w-1/2">
        <div className="w-[40px] h-[40px] rounded-[100%] bg-white relative "></div>
        <p>{post.username}</p>
      </div>
      <div className="text-left w-4/5 h-auto justify-self-end left-5 relative">
        {post.content}
      </div>
      <div className="flex  w-4/5 relative  justify-end left-6 items-center gap-10 text-[20px] text-gray-400 flex-row-reverse ">
        <i
          onClick={(e) => likePost(e)}
          className={`fa-regular fa-heart flex  items-start relative justify-center ${
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
    </div>
  );
}

export default Posts;
