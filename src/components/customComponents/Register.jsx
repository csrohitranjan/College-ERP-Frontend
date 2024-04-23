import { Label } from "src/components/libraryComponents/label";
import { Input } from "src/components/libraryComponents/input";
import { Button } from "src/components/libraryComponents/button";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Store } from "src/api/Store";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSnapshot } from "valtio";
import Loader from "./Loader";
import { ToastContainer, toast } from "react-toastify";

export function Register() {

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const state = useSnapshot(Store);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const registerUser = useMutation({
    mutationKey: ["REGISTER"],
    mutationFn: Store.registerHandler,
    onSuccess: (res) => {
      if (res.stack) {
        toast.error(`${res.response.data.message}`);
      } else {
        toast.success(`${res.data.message}`);
        // navigate("/login");
      }
    },

    onError: (err) => {
      console.log(err);
    },
  });

  const submitHandler = (data) => {
    registerUser.mutate({
      fullName: data.fullName,
      fatherName: data.fatherName,
      classRollNumber: data.classRollNumber,
      registrationNumber: data.regNumber,
      examRollNumber: data.examRollNumber,
      programme: data.programme,
      department: data.department,
      password: data.password,
    });

    reset({
      fullName: "",
      fatherName: "",
      classRollNumber: "",
      regNumber: "",
      examRollNumber: "",
      programme: "",
      department: "",
      password: "",
    });
  };

  return (
    <div className="h-[calc(100vh-64px)] flex justify-center items-center flex-col w-full">
      {state.loading && (
        <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 size-20">
          <Loader />
        </div>
      )}

      {error && <div className="text-red-500">{error}</div>}

      <form
        onSubmit={handleSubmit(submitHandler)}
        className="mx-auto max-w-lg px-5 py-4 rounded-md bg-gray-100"
      >
        <h1 className="text-3xl text-black font-bold text-start mb-2">
          Register
        </h1>
        <p className="mb-6 text-black">Enter your information to register</p>

        <div
          className="scrollable-form-container overflow-y-auto py-4"
          style={{
            maxHeight: "250px",
            overflowY: "auto",
            scrollbarWidth: "thin",
          }}
        >
          <div className="space-y-4">
            <div>
              <Label className="text-black" htmlFor="fullName">
                Full name
              </Label>
              <Input
                {...register("fullName")}
                id="fullName"
                placeholder="Rohit Ranjan"
                className="input-field text-black"
              />
              {errors?.fullName && (
                <span className="text-red-500">
                  {errors?.fullName?.message}
                </span>
              )}
            </div>

            <div>
              <Label
                className="text-black"
                htmlFor="fatherName"
              >{`Father's name`}</Label>
              <Input
                {...register("fatherName")}
                id="fatherName"
                placeholder="Enter your father's name"
                className="input-field text-black"
              />
              {errors?.fatherName && (
                <span className="text-red-500">
                  {errors?.fatherName?.message}
                </span>
              )}
            </div>

            <div>
              <Label className="text-black" htmlFor="classRollNumber">
                Class roll number
              </Label>
              <Input
                {...register("classRollNumber")}
                id="classRollNumber"
                placeholder="123"
                className="input-field text-black"
              />
              {errors?.classRollNumber && (
                <span className="text-red-500">
                  {errors?.classRollNumber?.message}
                </span>
              )}
            </div>

            <div>
              <Label className="text-black" htmlFor="regNumber">
                Registration number
              </Label>
              <Input
                {...register("regNumber")}
                id="regNumber"
                placeholder="21ABC012345"
                className="input-field text-black"
              />
              {errors?.regNumber && (
                <span className="text-red-500">
                  {errors?.regNumber?.message}
                </span>
              )}
            </div>

            <div>
              <Label className="text-black" htmlFor="examRollNumber">
                Exam roll number
              </Label>
              <Input
                {...register("examRollNumber")}
                id="examRollNumber"
                placeholder="21ABCD012345"
                className="input-field text-black"
              />
              {errors?.examRollNumber && (
                <span className="text-red-500">
                  {errors?.examRollNumber?.message}
                </span>
              )}
            </div>

            <div>
              <Label className="text-black" htmlFor="programme">
                Programme
              </Label>
              <select
                {...register("programme")}
                id="programme"
                className="w-full bg-gray-200 border border-gray-300 rounded-md p-2 text-black"
              >
                <option value="" hidden>
                  Select Programme
                </option>
                <option value="B.Sc (Honours) Computer Application">
                  B.Sc (Honours) Computer Application
                </option>
                <option value="B.Sc (Honours) Information Technology">
                  B.Sc (Honours) Information Technology
                </option>
              </select>
              {errors?.programme && (
                <div className="text-red-500">{errors.programme.message}</div>
              )}
            </div>

            <div>
              <Label className="text-black" htmlFor="department">
                Department
              </Label>
              <select
                {...register("department")}
                id="department"
                className="w-full bg-gray-200 border border-gray-300 rounded-md p-2 text-black "
              >
                <option value="" hidden>
                  Select Department
                </option>
                <option value="BCA">BCA</option>
                <option value="BIT">BIT</option>
              </select>
              {errors?.department && (
                <div className="text-red-500">{errors.department.message}</div>
              )}
            </div>

            <div>
              <Label className="text-black" htmlFor="password">
                Password
              </Label>
              <Input
                {...register("password")}
                id="password"
                placeholder="(Optional) Last Five Digit of Exam Roll No"
                className="input-field text-black"
              />
            </div>
          </div>
        </div>

        <div style={{ marginTop: "25px" }}>
          <Button
            type="submit"
            className="w-full text-white relative mb-2 bg-slate-900 hover:bg-slate-950"
            disabled={state.loading}
          >
            Register
          </Button>
        </div>
        <span className="text-sm text-black">
          {"Already have an account? "}
          <Link to="/login" className="text-blue-900 underlines">
            Login Now
          </Link>
        </span>
      </form>
      <ToastContainer theme="dark" />
    </div>
  );
}
