import React, { useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <div>
      <p>Username:</p>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <p>Password:</p>
      <div className="flex">
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        ></input>
        <button
          onClick={() => {
            axios({
              method: "post",
              url: "http://localhost:8000/api/auth/login",
              data: { username, password },
            })
              .then((e) => {
                document.location.href = "/feed";
              })
              .catch((e) => {
                setUsername("");
                setPassword("");
                setError(e.response.data.data.message);
              });
          }}
        >
          Go!
        </button>{" "}
      </div>
      <p id="error">{error}</p>
    </div>
  );
}

export default Login;
