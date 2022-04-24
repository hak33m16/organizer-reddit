import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StateContext } from "../App/App";
import { CenteredProgressBar } from "../common/styles";

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
      })
        .then(async (res) =>
          res.json().then(async (body) => {
            state.token = body?.data?.token;

            if (state.token) {
              await fetch("https://oauth.reddit.com/api/v1/me", {
                method: "GET",
                mode: "cors",
                headers: {
                  Authorization: `bearer ${state.token}`,
                },
              }).then(
                async (res) =>
                  await res.json().then((body) => (state.username = body?.name))
              );
            }
          })
        )
        .then(() => {
          navigate("/", { replace: true });
        });
    }
  }, []);

  return <CenteredProgressBar />;
}

export default Authorization;
