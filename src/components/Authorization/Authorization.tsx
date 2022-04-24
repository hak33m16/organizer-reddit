import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StateContext } from "../App/App";

function Authorization() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = useContext(StateContext);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    if (queryParams.has("code")) {
      const currentCode = queryParams.get("code") as string;
      queryParams.delete("code");
      navigate("/authorization", { replace: true });

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
          state.token = body?.data?.token;
          navigate("/", { replace: true });
        })
      );
    }
  }, []);

  //   useEffect(() => {
  //     if (token) {
  //       fetch("https://oauth.reddit.com/api/v1/me", {
  //         method: "GET",
  //         mode: "cors",
  //         headers: {
  //           Authorization: `bearer ${token}`,
  //         },
  //       }).then((res) => res.json().then((body) => console.log(body)));
  //     }
  //   }, [token]);

  return <></>;
}

export default Authorization;
