import { Button } from "src/components/libraryComponents/button";
import { Input } from "src/components/libraryComponents/input";
import { Label } from "src/components/libraryComponents/label";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Store } from "../../api/Store";
import { Link, useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import Loader from "./Loader";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const state = useSnapshot(Store);
  const navigate = useNavigate();
  const { register, reset, handleSubmit } = useForm();

  const createLoginSession = useMutation({
    mutationKey: ["LOGIN"],
    mutationFn: Store.loginHandler,
    onSuccess: (res) => {
      if (res.stack) {
        toast.error(res.response.data.message);
      } else {
        const userRole = res?.data?.user?.role;
        if (userRole === "student") {
          navigate("/studDashboard");
        } else if (userRole === "admin") {
          navigate("/adminDashboard");
        }
      }
    },

    onError: (error) => {
      console.log(`Error in the login mutation`, error);
    },
  });

  async function submitHandler(data) {
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

                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
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

                <Input
                  {...register("rollNumber")}
                  type="text"
                  placeholder="12XYZ0"
                  className="text-black"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex justify-between items-center ">
                  <Label className="text-black" htmlFor="password">
                    Password
                  </Label>

                  <Link to="/forgotPassword">
                    <span className="my-2 text-slate-950 cursor-pointer text-sm underline">
                      Forgot Password?
                    </span>
                  </Link>
                </div>

                <Input
                  {...register("password")}
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