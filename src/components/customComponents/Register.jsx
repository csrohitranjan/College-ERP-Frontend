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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the Zod schema for validation
const registerSchema = z.object({
  fullName: z.string().nonempty("Full name is required"),
  fatherName: z.string().nonempty("Father's name is required"),
  classRollNumber: z.string().nonempty("Class Roll No is required"),
  regNumber: z.string().nonempty("Registration No is required").min(5, "Registration No must be at least 5 characters long"),
  examRollNumber: z.string().nonempty("Exam Roll No is required").min(5, "Exam Roll No must be at least 5 characters long"),
  programme: z.string().nonempty("Programme is required"),
  department: z.string().nonempty("Department is required"),
  password: z.string().optional(),
});



export function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const state = useSnapshot(Store);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const registerUser = useMutation({
    mutationKey: ["REGISTER"],
    mutationFn: Store.registerHandler,
    onSuccess: (res) => {
      if (res.stack) {
        toast.error(`${res.response.data.message}`);
      } else {
        toast.success(`${res.data.message}`);
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Delay navigation for 2 seconds to show the toast message
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
                placeholder="Enter your full name"
                className={`input-field text-black ${errors.fullName ? "border-red-500" : ""}`}
              />
              {errors?.fullName && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors?.fullName?.message}
                </span>
              )}
            </div>

            <div>
              <Label className="text-black" htmlFor="fatherName">
                Father's name
              </Label>
              <Input
                {...register("fatherName")}
                id="fatherName"
                placeholder="Enter your father's name"
                className={`input-field text-black ${errors.fatherName ? "border-red-500" : ""}`}
              />
              {errors?.fatherName && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors?.fatherName?.message}
                </span>
              )}
            </div>

            <div>
              <Label className="text-black" htmlFor="classRollNumber">
                Class Roll No
              </Label>
              <Input
                {...register("classRollNumber")}
                id="classRollNumber"
                placeholder="Enter your class roll number"
                className={`input-field text-black ${errors.classRollNumber ? "border-red-500" : ""}`}
              />
              {errors?.classRollNumber && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors?.classRollNumber?.message}
                </span>
              )}
            </div>

            <div>
              <Label className="text-black" htmlFor="regNumber">
                Registration No
              </Label>
              <Input
                {...register("regNumber")}
                id="regNumber"
                placeholder="Enter your registration number"
                className={`input-field text-black ${errors.regNumber ? "border-red-500" : ""}`}
              />
              {errors?.regNumber && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors?.regNumber?.message}
                </span>
              )}
            </div>

            <div>
              <Label className="text-black" htmlFor="examRollNumber">
                Exam Roll No
              </Label>
              <Input
                {...register("examRollNumber")}
                id="examRollNumber"
                placeholder="Enter your exam roll number"
                className={`input-field text-black ${errors.examRollNumber ? "border-red-500" : ""}`}
              />
              {errors?.examRollNumber && (
                <span className="text-red-500 text-sm mt-1 block">
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
                className={`w-full bg-gray-200 border border-gray-300 rounded-md p-2 text-black ${errors.programme ? "border-red-500" : ""}`}
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
                <span className="text-red-500 text-sm mt-1 block">
                  {errors?.programme?.message}
                </span>
              )}
            </div>

            <div>
              <Label className="text-black" htmlFor="department">
                Department
              </Label>
              <select
                {...register("department")}
                id="department"
                className={`w-full bg-gray-200 border border-gray-300 rounded-md p-2 text-black ${errors.department ? "border-red-500" : ""}`}
              >
                <option value="" hidden>
                  Select Department
                </option>
                <option value="BCA">BCA</option>
                <option value="BIT">BIT</option>
              </select>
              {errors?.department && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors?.department?.message}
                </span>
              )}
            </div>

            <div>
              <Label className="text-black" htmlFor="password">
                Password
              </Label>
              <Input
                {...register("password")}
                type="password"
                id="password"
                placeholder="Enter a secure password"
                className={`input-field text-black ${errors.password ? "border-red-500" : ""}`}
              />
              {errors?.password && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors?.password?.message}
                </span>
              )}
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
