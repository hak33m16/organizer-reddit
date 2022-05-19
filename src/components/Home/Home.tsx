import { Alert, AlertTitle, Button, Collapse, Stack } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as uuid from "uuid";
import { RowDiv } from "../common/styles";
import { StateContext } from "../StateProvider/StateProvider";
import { HomeDiv, StyledButton, StyledCollapse } from "./styles";

function Home() {
  const context = useContext(StateContext);
  const navigate = useNavigate();

  const [errorOpen, setErrorOpen] = useState(true);

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

  const onLoginAttempt = () => {
    context.dispatch({ key: "error", value: undefined });
  };

  return (
    <>
      {context.state.error ? (
        <StyledCollapse in={errorOpen}>
          <Alert severity="error" onClose={() => setErrorOpen(false)}>
            <AlertTitle>{context.state.error.title}</AlertTitle>
            {context.state.error.messages.map((message) => (
              <React.Fragment key={message}>
                <span>{message}</span>
                <br />
              </React.Fragment>
            ))}
          </Alert>
        </StyledCollapse>
      ) : (
        <></>
      )}
      <HomeDiv id="home">
        <Stack>
          <StyledButton
            variant={"contained"}
            href={url}
            onClick={onLoginAttempt}
          >
            Login with Reddit
          </StyledButton>
        </Stack>
      </HomeDiv>
    </>
  );
}

export default Home;
