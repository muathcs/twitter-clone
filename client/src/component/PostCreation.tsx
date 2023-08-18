import React, { useEffect, useState } from "react";
import axios from "axios";
import HomePage from "./HomePage";
import { useDispatch } from "react-redux";
import { PostType, setPosts } from "../Redux/postsReducer";
function PostCreation({ getPosts }: any) {
  const [postContent, setPostContent] = useState("");

  const dispatch = useDispatch();

  async function createPost() {
    try {
      const postReq = await axios.post("http://localhost:3001/post", {
        content: postContent,
      });

      console.log("POST:", postReq);

      const response = await axios.get("http://localhost:3001/posts", {
        params: {
          user: "abc",
        },
      });

      console.log("RES: ", response);
      await dispatch(setPosts(response.data));
    } catch (error) {}
  }

  // getPosts();

  // console.log("post Creation");
  return (
    <>
      <div className="h-[10rem] bg-[#15202B] hidden sm:block  relative border-b  ">
        {/* <input
          type="text"
          className="bg-[#15202B] border-none bg-none absolute left-[20%] top-2 w-full focus:outline-none text-white"
          placeholder="What is happening..."
        /> */}

        <textarea
          onChange={(e) => setPostContent(e.target.value)}
          name=""
          value={postContent}
          id=""
          placeholder="What is hapenning?!"
          cols={0}
          className="bg-[#15202B] border-none bg-none absolute left-[20%]  w-[80%] outline-none resize-none focus:outline-none text-white"
          rows={4}
        >
          {"hello"}
        </textarea>
        <button
          onClick={(e) => {
            // setLoad("load");
            setPostContent("");

            createPost();
            // getPosts();
          }}
          className="absolute right-2 text-white bottom-2 bg-[#359BF0] px-5 py-2 rounded-full"
        >
          Post
        </button>
      </div>
    </>
  );
}

export default PostCreation;