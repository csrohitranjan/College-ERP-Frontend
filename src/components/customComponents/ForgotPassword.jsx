import { useForm } from "react-hook-form";
import { Input } from "../libraryComponents/input";
import { Label } from "../libraryComponents/label";
import { useMutation } from "@tanstack/react-query";
import { Store } from "../../api/Store";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "../libraryComponents/button";
import { useSnapshot } from "valtio";

const ForgotPassword = () => {
    const { register, reset, handleSubmit } = useForm();
    const state = useSnapshot(Store);
    const forgotPasswordMutation = useMutation({
        mutationKey: ["FORGOT_PASSWORD"],
        mutationFn: Store.forgotPassword,

        onSuccess: (res) => {
            if (res.stack) {
                toast.error(res.response.data.message);
            } else {
                toast.success(res?.data?.message);
            }
        },
    });

    async function forgotPasswordHandler(abc) {
        const inputDetails = {
            registrationNumber: abc.registrationNumber,
            email: abc.email,
        };

        try {
            forgotPasswordMutation.mutate({
                registrationNumber: inputDetails.registrationNumber,
                email: inputDetails.email,
            });
        } catch (error) {
            console.log(`Error in forgot password handler`, error);
        } finally {
            reset({
                registrationNumber: "",
                email: "",
            });
        }
    }

    return (
        <div className="h-[calc(100vh-64px)] bg-gray-950 flex flex-col justify-center items-center relative">
            <form
                onSubmit={handleSubmit(forgotPasswordHandler)}
                className="bg-white rounded-lg shadow-lg px-8 py-4"
            >
                <h1 className="text-3xl font-bold mb-4 text-black">Forgot Password</h1>
                <p className="mb-6 text-black">
                    Enter your credentials to get a new password.
                </p>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label className="text-black" htmlFor="email">
                            Registration Number
                        </Label>

                        <Input
                            {...register("registrationNumber")}
                            id="registrationNumber"
                            type="registrationNumber"
                            placeholder="1234"
                            className="text-black"
                        />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex justify-between items-center ">
                            <Label className="text-black" htmlFor="password">
                                Email
                            </Label>
                        </div>

                        <Input
                            {...register("email")}
                            id="email"
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
                    Submit
                </Button>
            </form>

            <ToastContainer theme="dark" />
        </div>
    );
};

export default ForgotPassword;