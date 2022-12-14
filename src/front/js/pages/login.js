import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    fetch(
      "https://3001-rivervil16-sistemadeaut-co2nxc05x30.ws-us71.gitpod.io/api/login",
      opts
    )
      .then((resp) => {
        if (resp.status === 200) return resp.json();
        else alert("there has been some error");
      })
      .then()
      .catch((error) => {
        console.error("there was an error!!!", error);
      });
  };

  // fetch(process.env.BACKEND_URL + "/usuario", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: localStorage.getItem("accessToken"),
  //   },
  //   body: JSON.stringify(body), //Convertimos la data a JSON
  // });

  return (
    <div className="text-center mt-5">
      <h1>Login</h1>
      <div>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <button onClick={handleClick}>Login</button>
      </div>
    </div>
  );
};
