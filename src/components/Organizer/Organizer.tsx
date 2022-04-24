import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../App/App";
import Post from "../Post/Post";

function Organizer() {
  const state = useContext(StateContext);
  const navigate = useNavigate();

  const [savedPostData, setSavedPostData] = useState([] as any[]);

  useEffect(() => {
    if (state.token && state.username) {
      fetch(`https://oauth.reddit.com/user/${state.username}/saved?limit=5`, {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: `bearer ${state.token}`,
        },
      }).then((res) =>
        res.json().then((body) => {
          console.log(body?.data?.children);
          setSavedPostData([...savedPostData, ...body?.data?.children]);
        })
      );
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    console.log("saved post data set to: %o", savedPostData);
  }, [savedPostData]);

  return (
    <>
      <span>test1</span>
      {savedPostData.map((postData) => (
        <Post
          author={postData.data.author}
          permalink={postData.data.permalink}
          subreddit={postData.data.subreddit}
          thumbnail={postData.data.thumbnail}
          title={postData.data.title}
          type={postData.data.type}
          url={postData.data.url}
          media={postData.data.media?.reddit_video?.dash_url}
        />
      ))}
    </>
  );
}

export default Organizer;
