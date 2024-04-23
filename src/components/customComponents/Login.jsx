import { Button } from "src/components/libraryComponents/button";
import { Input } from "src/components/libraryComponents/input";
import { Label } from "src/components/libraryComponents/label";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Store } from "src/api/Store";
import { Link, useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const state = useSnapshot(Store);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createLoginSession = useMutation({
    mutationKey: ["LOGIN"],
    mutationFn: Store.loginHandler,
    onSuccess: (success) => {
      if (success.stack) {
        toast.error(`${success.response.data.message}`);
      } else {
        const userRole = success?.data?.user?.role;
        if (userRole === "student") {
          navigate("/studDashboard");
        } else if (userRole === "admin") {
          navigate("/adminDashboard");
        }
      }
    },

    onError: (error) => {
      console.log(`error in the login mutation`, error);
    },
  });

  async function submitHandler(data) {
    console.log("data", data);

    try {
      createLoginSession.mutate({
        email: data.email,
        examRollNumber: data.rollNumber,
        password: data.password,
      });
    } catch (error) {
      console.log(error);
    } finally {
      reset({
        email: "",
        password: "",
        rollNumber: "",
      });
    }
  }

  return (
    <>
      {
        <div className="h-[calc(100vh-64px)] bg-gray-950 flex flex-col justify-center items-center relative">
          {state.loading && (
            <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 size-20">
              <Loader />
            </div>
          )}

          {error && <div className="text-red-500">{error}</div>}
          <form
            onSubmit={handleSubmit(submitHandler)}
            style={{ width: "400px", height: "auto" }}
            className="bg-white rounded-lg shadow-lg px-8 py-4"
          >
            <h1 className="text-3xl font-bold mb-4 text-black">Login</h1>
            <p className="mb-6 text-black">
              Enter your credentials to login to your account.
            </p>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label className="text-black" htmlFor="email">
                  Email
                </Label>
                {errors?.email?.message && (
                  <div className="text-red-500"> {errors?.email?.message} </div>
                )}

                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                  className="text-black"
                />
              </div>

              <div className="flex justify-center items-center font-bold text-black">
                <span>OR</span>
              </div>

              <div className="grid gap-2">
                <Label className="text-black" htmlFor="email">
                  Exam roll number
                </Label>
                {errors?.rollNumber?.message && (
                  <div className="text-red-500"> {errors?.email?.message} </div>
                )}

                <Input
                  {...register("rollNumber")}
                  type="text"
                  placeholder="21ABCD012345"
                  className="text-black"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex justify-between items-center ">
                  <Label className="text-black" htmlFor="password">
                    Password
                  </Label>
                  <span className="my-2 text-slate-950 cursor-pointer text-sm underline">
                    Forgot Password?
                  </span>
                </div>

                {errors?.password?.message && (
                  <div className="text-red-500">
                    {errors?.password?.message}{" "}
                  </div>
                )}
                <Input
                  {...register("password")}
                  type="password"
                  id="password"
                  className="text-black"
                  placeholder="john123@"
                />
              </div>
            </div>

            <Button
              className="w-full text-white mt-4 relative mb-2 bg-slate-900 hover:bg-slate-950"
              type="submit"
              disabled={state.loading}
            >
              Sign in
            </Button>

            <span className="text-sm text-black">
              {"Don't have an account? "}
              <Link to="/register" className="text-blue-900 underlines">
                Register Now
              </Link>
            </span>
          </form>

          <ToastContainer theme="dark" />
        </div>
      }
    </>
  );
};

export default Login;
