import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        <button
          onClick={() => actions.login({ email: email, password: password })}
        >
          Login
        </button>
      </div>
    </div>
  );
};
