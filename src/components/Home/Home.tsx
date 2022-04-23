import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import * as uuid from "uuid";
import { useLocation, useNavigate } from "react-router-dom";
import { HomeDiv, RowDiv } from "./styles";
import axios from "axios";

function Home() {
  const id = uuid.v4();
  // const clientId = "y5_3-2xqzdvK9GuvX8P7Ng";
  const clientId = "k9geY3UahcbIN1iL10ybrA";
  const redirectUrl = "http://localhost:3000";
  const duration = "temporary";
  const scope = "identity save";

  const url = `https://www.reddit.com/api/v1/authorize?\
client_id=${clientId}&\
response_type=code&\
state=${id}&\
redirect_uri=${redirectUrl}&\
duration=${duration}&\
scope=${scope}`;

  // const { search } = useLocation();
  // const query = React.useMemo(() => new URLSearchParams(search), [search]);
  // const code = query.get('code')

  const [code, setCode] = useState("");
  const [token, setToken] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    if (queryParams.has("code")) {
      setCode(queryParams.get("code") as string);
      const currentCode = queryParams.get("code") as string;
      queryParams.delete("code");
      navigate("/", { replace: true });

      // fetch("https://www.reddit.com/api/v1/access_token", {
      //   method: "POST",
      //   mode: "cors",
      //   body: JSON.stringify({
      //     grant_type: "authorization_code",
      //     code: currentCode,
      //     redirect_uri: redirectUrl,
      //   }),
      fetch("http://localhost:8080/token", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ code: currentCode }),
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      }).then((res) =>
        res.json().then((body) => {
          console.log("code response:", body?.data);
          setToken(body?.data?.token);
        })
      );
    }
  }, []);

  // useEffect(() => {
  //   if (token) {
  //     fetch("https://oauth.reddit.com/api/v1/me", {
  //       method: "GET",
  //       mode: "cors",
  //       credentials: "include",
  //       headers: {
  //         "Access-Control-Allow-Origin": "http://localhost:3000",
  //         "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  //         "Access-Control-Allow-Credentials": "true",
  //         authorization: `bearer ${token}`,
  //       },
  //     }).then((res) => res.json().then((body) => console.log(body)));
  //   }
  // }, [token])

  // useEffect(() => {
  //   if (token) {
  //     const xhr = new XMLHttpRequest();
  //     xhr.open("GET", "https://oauth.reddit.com/api/v1/me", true);
  //     xhr.onload = (e) => {
  //       if (xhr.readyState === 4) {
  //         if (xhr.status === 200) {
  //           console.log("Response text: %o", xhr.responseText);
  //         } else {
  //           console.log(
  //             "Error, status code: %o, response: %o",
  //             xhr.status,
  //             xhr.responseText
  //           );
  //         }
  //       }
  //     };
  //     xhr.setRequestHeader("Access-Control-Request-Headers", "authorization");
  //     xhr.setRequestHeader("Accept", "application/json, text/plain, */*");
  //     xhr.setRequestHeader("authorization", `bearer ${token}}`);
  //     xhr.withCredentials = true;
  //     xhr.send();
  //   }
  // }, [token]);

  useEffect(() => {
    if (token) {
      axios
        .request({
          method: "get",
          url: "https://oauth.reddit.com/api/v1/me",
          headers: { authorization: `bearer ${token}` },
        })
        .then(function (res: any) {
          console.log(res);
        })
        .catch(function (e) {
          console.log("Axios error: %o", e);
        });
    }
  }, [token]);

  return (
    <HomeDiv id="home">
      <RowDiv>
        <Button variant={"contained"} href={url}>
          Save Posts
        </Button>
      </RowDiv>
      <RowDiv>
        <span>Code: {code}</span>
      </RowDiv>
      <RowDiv>
        <span>Token: {token}</span>
      </RowDiv>
    </HomeDiv>
  );
}

export default Home;
