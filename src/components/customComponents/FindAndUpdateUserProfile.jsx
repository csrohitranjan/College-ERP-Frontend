import { Input } from "components/libraryComponents/input";
import { Button } from "../libraryComponents/button";
import { useMutation } from "@tanstack/react-query";
import { Store } from "../../api/Store";
import { useSnapshot } from "valtio";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { ToastContainer, toast } from "react-toastify";
import Loader from "./Loader";


const FindAndUpdateUserProfile = () => {
    const state = useSnapshot(Store);
    const [userData, setUserData] = useState(null);
    const [initialUserData, setInitialUserData] = useState(null);
    const [editableField, setEditableField] = useState(null);
    const { register, handleSubmit, setValue, resetField } = useForm();

    const findUserProfile = useMutation({
        mutationKey: ["FIND_USER_PROFILE"],
        mutationFn: Store.findUserProfile,
        onSuccess: (res) => {
            if (res.stack) {
                toast.error(res.response.data.message);
            } else {
                setUserData(res.data.user);
                setInitialUserData(res.data.user);
                resetField("examRollNumber");
                toast.success(res.data.message); // =>  User profile found successfully.
            }
        },
        // onError: () => {
        //     toast.error("Error finding user profile.");
        // },
    });

    const updateUserProfile = useMutation({
        mutationKey: ["UPDATE_USER_PROFILE"],
        mutationFn: (data) => Store.updateUserProfile({ ...data, examRollNumber: userData.examRollNumber }),
        onSuccess: (res) => {
            if (res.stack) {
                toast.error(res.response.data.message);
            } else {
                setUserData(res.data.user);
                setInitialUserData(res.data.user);
                setEditableField(null);
                toast.success(res.data.message); // => User profile updated successfully
            }
        },
        // onError: () => {
        //     toast.error("Error updating user profile.");
        // },
    });

    const onSubmit = (data) => {
        findUserProfile.mutate({ examRollNumber: data.examRollNumber });
    };

    const onUpdate = () => {
        const updatedFields = {};
        Object.keys(userData).forEach(key => {
            if (userData[key] !== initialUserData[key]) {
                updatedFields[key] = userData[key];
            }
        });
        if (Object.keys(updatedFields).length > 0) {
            updateUserProfile.mutate(updatedFields);
        } else {
            toast.info("No changes detected to update.");
        }
    };

    const handleEditClick = (field) => {
        setEditableField(field);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    const renderField = (label, field, options = [], readOnly = false) => (
        <div key={field}>
            <label className="block mb-1 text-gray-400">{label}</label>
            <div className="flex items-center gap-2">
                {editableField === field && options.length > 0 ? (
                    <select
                        className="text-white w-full bg-gray-700 h-[35px] rounded-lg px-3 placeholder-gray-400"
                        name={field}
                        value={userData[field] || ""}
                        onChange={handleInputChange}
                    >
                        <option value="" disabled>{`Select ${label}`}</option>
                        {options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                ) : (
                    <Input
                        className={`text-white w-full bg-gray-700 h-[35px] rounded-lg px-3 placeholder-gray-400 ${editableField === field ? "border border-teal-500" : ""
                            }`}
                        name={field}
                        value={userData[field]}
                        readOnly={editableField !== field || readOnly}
                        onChange={handleInputChange}
                    />
                )}
                {!readOnly && (
                    <button
                        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded-md text-xs"
                        onClick={() => handleEditClick(field)}
                        data-tip="Edit"
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <div className="w-full h-auto bg-slate-900 text-white p-6 overflow-y-scroll">
            <ToastContainer theme="dark" />
            <ReactTooltip place="top" type="dark" effect="solid" />
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Student Profile Details</h1>
                {state.loading && (
                    <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 size-20">
                        <Loader />
                    </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)} className="flex gap-1 items-center">
                    <Input
                        className="text-black w-[150px] bg-gray-200 h-[30px]"
                        placeholder="Exam Roll Number"
                        {...register("examRollNumber", { required: true })}
                    />
                    <Button className="bg-black hover:bg-black/70 text-white px-3 py-1" type="submit">
                        Search
                    </Button>
                </form>
            </div>

            {userData && (
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {renderField("Full Name", "fullName")}
                        {renderField("Father's Name", "fatherName")}
                        {renderField("Class Roll Number", "classRollNumber")}
                        {renderField("Registration Number", "registrationNumber")}
                        {renderField("Exam Roll Number", "examRollNumber", [], true)}
                        {renderField("Programme", "programme", [
                            "B.Sc (Honours) Computer Application",
                            "B.Sc (Honours) Information Technology",
                        ])}
                        {renderField("Department", "department", ["BCA", "BIT"])}
                        {renderField("Current Semester", "currentSemester", [
                            "First",
                            "Second",
                            "Third",
                            "Fourth",
                            "Fifth",
                            "Sixth",
                        ])}
                        {renderField("Gender", "gender", ["Male", "Female"])}
                        {renderField("Email", "email")}
                        {renderField("Phone Number", "phoneNumber")}
                        {renderField("Role", "role")}
                    </div>
                </div>
            )}

            {userData && (
                <div className="flex justify-center mt-4">
                    <Button
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                        onClick={onUpdate}
                    >
                        Update
                    </Button>
                </div>
            )}
        </div>
    );
};

export default FindAndUpdateUserProfile;
