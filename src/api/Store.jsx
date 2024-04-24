// import { useNavigate } from "react-router-dom";
import { proxy } from "valtio";
import { Axios } from "./axios";

export const Store = proxy({
  loading: false,
  userData: null,
  isLoggedIn: false,
  examRollNumber: "",

  storeTokenInLS: (token) => {
    return localStorage.setItem("token", token);
  },


  //  ############   USERS #####################


  registerHandler: async ({
    fullName,
    fatherName,
    classRollNumber,
    registrationNumber,
    examRollNumber,
    programme,
    department,
    password,
  }) => {
    Store.loading = true;

    try {
      const res = await Axios.post("/api/v1/users/registerUser", {
        fullName,
        fatherName,
        classRollNumber,
        registrationNumber,
        examRollNumber,
        programme,
        department,
        password,
      });
      // console.log("user registered", res);
      return res;
    } catch (error) {
      console.log(`Error in the register handler`, error);
      return error;
    } finally {
      Store.loading = false;
    }
  },


  loginHandler: async ({ email, examRollNumber, password }) => {
    console.log(Store.loading);
    // console.log("login handler runs");
    Store.loading = true;

    try {
      // console.log("email", email);
      const res = await Axios.post("/api/v1/users/loginUser", {
        email,
        examRollNumber,
        password,
      });

      if (res) {
        // console.log("response", res);
        // console.log("token", res.data.accessToken);
        Store.storeTokenInLS(res.data.accessToken);
        Store.isLoggedIn = true;
        const userDataString = JSON.stringify(res);
        localStorage.setItem("userData", userDataString);
        return res;
      }
    } catch (error) {
      console.log("Error in the login handler function", error);
      return error;
    } finally {
      Store.loading = false;
      // console.log("finally runs");
    }
  },

  getUserData: async () => {
    try {
      const response = await Axios.get("/api/v1/users/getCurrentUser");
      Store.userData = response;

      if (response) {
        // console.log("user details", response);

        return response;
      }
    } catch (error) {
      Store.userData = null;
      // console.log(Store.userData);
      console.error("Error fetching user data:", error);
      return error;
    }
  },


  updateData: async ({ currentSemester, gender, email, phoneNumber }) => {
    // console.log(currentSemester);
    // console.log(gender);
    // console.log(email);
    // console.log(phoneNumber);
    Store.loading = true;
    try {
      const res = await Axios.put("/api/v1/users/updateProfile", {
        currentSemester,
        gender,
        email,
        phoneNumber,
      });
      return res;
    } catch (error) {
      console.log(`Error while updating the data`, error);
      return error;
    } finally {
      Store.loading = false;
    }
  },


  changePassword: async ({ oldPassword, newPassword }) => {
    // console.log(oldPassword);
    // console.log(newPassword);
    try {
      const res = await Axios.put("/api/v1/users/changePassword", {
        oldPassword,
        newPassword,
      });

      if (res) {
        // console.log(res);
        return res;
      }
    } catch (error) {
      console.log(`Error while getting the lors`);
      return error;
    }
  },


  logOut: async () => {
    Store.loading = true;

    try {
      const res = await Axios.post("/api/v1/users/logout");
      // console.log("user log out successfully", res);
      if (res) {
        localStorage.removeItem("token");
        Store.isLoggedIn = false;
        // console.log("login status", Store.isLoggedIn);
        return res;
      }
    } catch (error) {
      console.log(`Error in the logout function`, error);
    } finally {
      Store.loading = false;
    }
  },


  //   ############   STUDENTS  #################



  applyForLor: async ({ companyName, companyAddress }) => {
    // console.log("company name", companyName);
    // console.log("company address", companyAddress);
    Store.loading = true;
    try {
      const res = await Axios.post("/api/v1/users/requestLOR", {
        companyName,
        companyAddress,
      });
      return res;
    } catch (error) {
      console.log(`Error in the apply for lor function`, error);
      return error;
    } finally {
      Store.loading = false;
    }
  },


  getAllLors: async () => {
    try {
      const res = await Axios.get("/api/v1/users/getAllLorsOfLoggedInUser");
      if (res) {
        return res;
      }
    } catch (error) {
      console.log(`Error while getting the lors`);
    }
  },


  // ##############    ADMIN ################


  registerAdmin: async ({ fullName, email, phoneNumber, password }) => {
    // console.log(fullName);
    // console.log(email);
    // console.log(phoneNumber);
    // console.log(password);

    try {
      const res = await Axios.post("/api/v1/users/registerAsAdmin", {
        fullName,
        email,
        phoneNumber,
        password,
      });
      // console.log("register admin", res);
      return res;
    } catch (error) {
      console.log(`Error while registering new admin`, error);
      return error;
    }
  },


  getPendingLor: async () => {

    try {
      const res = await Axios.get("/api/v1/users/allPendingLOR");
      // console.log(res);
      return res.data;
    } catch (error) {
      console.log(`Error while getting the pending lor`, error);
      return error;
    }
  },


  approveLorGet: async () => {
    Store.loading = true;
    // console.log("approve lor get method triggerd");

    try {
      const res = await Axios.get("/api/v1/users/allApprovedLOR");
      return res.data;
    } catch (error) {
      console.log(`Error while getting the approve lor`, error);
    } finally {
      Store.loading = false;
    }
  },


  rejectedLorGet: async () => {
    Store.loading = true;
    // console.log("approve lor get method triggerd");

    try {
      const res = await Axios.get("/api/v1/users/allRejectedLOR");
      // console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(`Error while getting the rejected lor`, error);
    } finally {
      Store.loading = false;
    }
  },


  updateLor: async ({
    recipient,
    recipientDepartment,
    companyName,
    companyAddress,
    lorId,
  }) => {
    // console.log(recipient);
    // console.log(recipientDepartment);
    // console.log("companyAddress", companyAddress);
    // console.log(companyName);
    Store.loading = true;
    try {
      const res = await Axios.put(`/api/v1/users/${lorId}/updateLORrequest`, {
        recipient,
        recipientDepartment,
        companyName,
        companyAddress,
      });

      // console.log(res.data);

      return res.data;
    } catch (error) {
      console.log(`Error while updating the lor`, error);
      return error;
    } finally {
      Store.loading = false;
    }
  },



  approveLor: async ({ lorId }) => {
    // console.log(lorId);

    try {
      const res = await Axios.post(`/api/v1/users/${lorId}/approveLORrequest`);
      return res;
    } catch (error) {
      console.log(`Error in the approve lor`, error);
      return error;
    }
  },



  rejectLor: async ({ lorId }) => {
    // console.log("lor id reject", lorId);

    try {
      const res = await Axios.post(`/api/v1/users/${lorId}/rejectLORrequest`);
      // console.log("rejected lor", res.data);

      return res.data;
    } catch (error) {
      console.log(`Error in the reject lor`, error);
      return error;
    }
  },



  filteringLor: async (ExamRollNumber) => {
    // console.log("exam roll number", ExamRollNumber);

    try {
      const res = await Axios.get(
        `/api/v1/users/${ExamRollNumber}/findLorsByExamRollNumber`
      );
      // console.log("filtered lor", res);
      return res;
    } catch (error) {
      console.log(`Error while filtering the lor`, error);
      throw error;
    }
  },


  forgotPassword: async ({ registrationNumber, email }) => {
    console.log(registrationNumber);
    console.log(email);

    Store.loading = true;
    try {
      const res = await Axios.post("/api/v1/users/forgetPassword", {
        registrationNumber,
        email,
      });
      // console.log("forgot password response", res);

      return res;
    } catch (error) {
      // console.log("error in the forgot password", error);
      return error;
    } finally {
      Store.loading = false;
    }
  },

});
