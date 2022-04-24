import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
} from "@mui/material";

export type PostType = "t1" | "t3";

export interface PostProps {
  title?: string;
  subreddit?: string;
  author?: string;
  type?: PostType;
  url?: string;
  permalink?: string;
  thumbnail?: string;
  media?: any;
}

function Post(props: PostProps) {
  return (
    <>
      <span>test2</span>
      <Card>
        <CardHeader>{props.title}</CardHeader>
        {props.thumbnail ? (
          props.media ? (
            <CardMedia component={"video"} image={props.media}></CardMedia>
          ) : (
            <CardMedia component={"img"} image={props.url} />
          )
        ) : (
          <></>
        )}
        <CardActions>
          <Button size="small" href={`https://reddit.com${props.permalink}`}>
            Visit on Reddit
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default Post;
