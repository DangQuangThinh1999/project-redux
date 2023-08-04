import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { login } from "../../redux/slice/authSlice";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { ReactComponent as ShowIcon } from "@/assets/show.svg";
import { ReactComponent as HideIcon } from "@/assets/hide.svg";

import style from "./loginStyle.module.scss";
export interface UserInfo {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.rootReducer.auth.isAuthenticated
  );
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserInfo>({
    criteriaMode: "all",
  });
  const onSubmit = (data: UserInfo) => {
    handleLogin(data);
  };
  const handleLogin = (data: UserInfo) => {
    dispatch(login(data));
  };

  if (isAuthenticated) {
    // Redirect the user to the main application if already authenticated

    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-teal-400">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                className="px-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="user@gmail.com"
                {...register("email", {
                  required: "Please enter a valid email address.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "This input is email only.",
                  },
                })}
              />
              <div className={style.wrapper}>
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ messages }) => {
                    return (
                      messages &&
                      Object.entries(messages).map(([type, message], index) => (
                        <p key={type}>{message}</p>
                      ))
                    );
                  }}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <Link
                  to="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2 relative ">
              <input
                defaultValue={"thinh1234@gmail"}
                type={show ? "text" : "password"}
                className="px-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("password", {
                  required: "Please enter a valid password",
                  minLength: {
                    value: 9,
                    message: "This input must exceed 10 characters",
                  },
                })}
              />
              <div
                className="absolute right-5 top-2"
                onClick={() => setShow((value) => !value)}
              >
                {!show ? (
                  <ShowIcon className="h-6 w-6" />
                ) : (
                  <HideIcon className="h-6 w-6" />
                )}
              </div>
              <div className={style.wrapper}>
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ messages }) => {
                    return (
                      messages &&
                      Object.entries(messages).map(([type, message], index) => (
                        <p key={type}>{message}</p>
                      ))
                    );
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <input
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              value="Sign in"
            />
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            to=""
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Create Acount
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
