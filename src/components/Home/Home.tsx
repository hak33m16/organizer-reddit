import { Button } from "@mui/material";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as uuid from "uuid";
import { RowDiv } from "../common/styles";
import { StateContext } from "../StateProvider/StateProvider";
import { HomeDiv } from "./styles";

function Home() {
  const context = useContext(StateContext);
  const navigate = useNavigate();

  const id = uuid.v4();
  const clientId = "o5zEOr40IKtc0Q2lbNMWzg";
  const redirectUrl = "http://localhost:3000/authorization";
  const duration = "permanent";
  const scope = "vote history identity read save";

  const url = `https://www.reddit.com/api/v1/authorize?\
client_id=${clientId}&\
response_type=code&\
state=${id}&\
redirect_uri=${redirectUrl}&\
duration=${duration}&\
scope=${scope}`;

  useEffect(() => {
    if (context.state.token) {
      navigate("/organizer");
    }
  }, []);

  return (
    <HomeDiv id="home">
      <RowDiv>
        <Button variant={"contained"} href={url}>
          Login with Reddit
        </Button>
      </RowDiv>
    </HomeDiv>
  );
}

export default Home;
