import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CenteredProgressBar } from "../common/styles";
import { UserVisibleError, StateContext } from "../StateProvider/StateProvider";

function Authorization() {
  const location = useLocation();
  const navigate = useNavigate();

  const context = useContext(StateContext);

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
            const token = body?.data?.token;
            context.dispatch({ key: "token", value: token });

            if (token) {
              await fetch("https://oauth.reddit.com/api/v1/me", {
                method: "GET",
                mode: "cors",
                headers: {
                  Authorization: `bearer ${token}`,
                },
              })
                .then(
                  async (res) =>
                    await res
                      .json()
                      .then((body) =>
                        context.dispatch({ key: "username", value: body?.name })
                      )
                )
                .catch((err) => {
                  context.dispatch({
                    key: "error",
                    value: {
                      title: "Error communicating with Reddit",
                      messages: [
                        "Failed to retrieve user information, please try again.",
                        'If you\'re using Firefox, make sure "Enhanced Tracking Protection" is disabled.',
                      ],
                    } as UserVisibleError,
                  });
                  navigate("/", { replace: true });
                });
            }
          })
        )
        .then(() => {
          navigate("/", { replace: true });
        })
        .catch((err) => {
          context.dispatch({
            key: "error",
            value: {
              title: "Error communicating with Organizer for Reddit",
              messages: [
                "Failed to authenticate using our API, please try again.",
              ],
            } as UserVisibleError,
          });
          navigate("/", { replace: true });
        });
    }
  }, []);

  return <CenteredProgressBar />;
}

export default Authorization;
