import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../Post/Post";
import { StateContext } from "../StateProvider/StateProvider";

function Organizer() {
  const context = useContext(StateContext);
  const navigate = useNavigate();

  const [savedPostData, setSavedPostData] = useState([] as any[]);

  useEffect(() => {
    if (context.state.token && context.state.username) {
      fetch(
        `https://oauth.reddit.com/user/${context.state.username}/saved?limit=5`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            Authorization: `bearer ${context.state.token}`,
          },
        }
      ).then((res) =>
        res.json().then((body) => {
          setSavedPostData([...savedPostData, ...body?.data?.children]);
        })
      );
    } else {
      navigate("/");
    }
  }, []);

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
