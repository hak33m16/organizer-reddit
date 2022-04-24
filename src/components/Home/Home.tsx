import { Button } from "@mui/material";
import { useContext } from "react";
import * as uuid from "uuid";
import { StateContext } from "../App/App";
import { HomeDiv, RowDiv } from "./styles";

function Home() {
  const state = useContext(StateContext);

  const id = uuid.v4();
  // const clientId = "y5_3-2xqzdvK9GuvX8P7Ng";
  const clientId = "k9geY3UahcbIN1iL10ybrA";
  const redirectUrl = "http://localhost:3000/authorization";
  const duration = "temporary";
  const scope = "identity save";

  const url = `https://www.reddit.com/api/v1/authorize?\
client_id=${clientId}&\
response_type=code&\
state=${id}&\
redirect_uri=${redirectUrl}&\
duration=${duration}&\
scope=${scope}`;

  return (
    <HomeDiv id="home">
      <RowDiv>
        <Button variant={"contained"} href={url}>
          Save Posts
        </Button>
      </RowDiv>
      <RowDiv>
        <span>Token: {state.token}</span>
      </RowDiv>
    </HomeDiv>
  );
}

export default Home;
