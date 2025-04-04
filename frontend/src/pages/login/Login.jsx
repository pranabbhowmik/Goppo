import React, { useState } from "react";
import logo from "../../../public/goppo.png";
import { NavLink } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import GoppoSeo from "../../components/GoppoSeo";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();
  //  handleSubmit function is missing in the Login component
  const handelSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };
  return (
    <>
      <GoppoSeo />
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <img src={logo} alt="logo" className="w-28 h-28 mx-auto" />
          <h1 className="text-3xl font-semibold text-center text-gray-300">
            Login
            <span className="text-blue-500"> Goppo</span>
          </h1>

          <form onSubmit={handelSubmit}>
            <div>
              <label className="label p-2">
                <span className="text-base label-text text-gray-200">
                  Username
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter username"
                className="w-full input input-bordered h-10 "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text text-gray-200">
                  Password
                </span>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full input input-bordered h-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <NavLink
              to={"/signup"}
              className="text-sm  hover:underline hover:text-blue-600 mt-2 inline-block"
            >
              {"Don't"} have an account?
            </NavLink>

            <div>
              <button className="btn btn-block btn-sm mt-2" disabled={loading}>
                {loading ? (
                  <span className="loading loading-spinner "></span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
