import React, { useState } from "react";
import Genderbox from "./Genderbox";
import { NavLink } from "react-router-dom";
import useSignup from "../../hooks/useSignup";
import GoppoSeo from "../../components/GoppoSeo";

const SignUp = () => {
  const [input, setInput] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const { loading, signup } = useSignup();
  const handleCheckboxChange = (gender) => {
    setInput({ ...input, gender });
  };

  const handelsignup = async (e) => {
    e.preventDefault();
    await signup(input);
  };
  return (
    <>
      <GoppoSeo />
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <h1 className="text-3xl font-semibold text-center text-gray-300">
            Sign Up <span className="text-blue-500"> Goppo</span>
          </h1>

          <form onSubmit={handelsignup}>
            <div>
              <label className="label p-2">
                <span className="text-base label-text text-gray-200">
                  Full Name
                </span>
              </label>
              <input
                type="text"
                placeholder="Pranab Bhowmik"
                className="w-full input input-bordered  h-10"
                value={input.fullName}
                onChange={(e) =>
                  setInput({ ...input, fullName: e.target.value })
                }
              />
            </div>

            <div>
              <label className="label p-2 ">
                <span className="text-base label-text text-gray-200">
                  Username
                </span>
              </label>
              <input
                type="text"
                placeholder="Pranab Bhowmik"
                className="w-full input input-bordered h-10"
                value={input.username}
                onChange={(e) =>
                  setInput({ ...input, username: e.target.value })
                }
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
                value={input.password}
                onChange={(e) =>
                  setInput({ ...input, password: e.target.value })
                }
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text text-gray-200">
                  Confirm Password
                </span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full input input-bordered h-10"
                value={input.confirmPassword}
                onChange={(e) =>
                  setInput({ ...input, confirmPassword: e.target.value })
                }
              />
            </div>
            <Genderbox
              onCheckboxChange={handleCheckboxChange}
              selectedGender={input.gender}
            />
            <NavLink
              className="text-sm hover:underline text-gray-200 hover:text-blue-600 mt-2 inline-block"
              to={"/login"}
            >
              Already have an account?
            </NavLink>

            <div>
              <button
                className="btn btn-block btn-sm mt-2 border border-slate-700"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
