/** @format */

import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router";
import { LOGIN } from "../mutations/loginMutations.js";

const Login = ({ setToken }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    variables: { username, password },

    onError: (error) => {
      throw new Error(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("user-token", token);
      navigate("/");
    }
  }, [result.data]);

  const submit = async (event) => {
    event.preventDefault();

    login({ variables: { username, password } });
  };

  return (
    <div>
      <form
        className='flex flex-col gap-4 bg-base-300 p-8 py-12 rounded-box shadow-md'
        onSubmit={submit}>
        <h5 className='text-2xl font-mono font-bold my-4'>Login</h5>
        <div>
          <span>Username</span>
          <input
            className='input input-sm mx-2'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <span>Password</span>
          <input
            className='input input-sm mx-2'
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button
          className='btn btn-sm btn-outline btn-warning my-4'
          type='submit'>
          login
        </button>
      </form>
    </div>
  );
};

export default Login;
