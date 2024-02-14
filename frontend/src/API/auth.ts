import { SignupForm } from "../interfaces/user";
import { StoreToken } from "../utils/localstorage";
import axios from "axios";

const SignupAPI = async (data: SignupForm) => {
  try {
    const res = await axios.post("http://localhost:3002/api/v1/signup", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    StoreToken(res.data.token);
  } catch (err) {
    console.log(err);
  }
};

const LoginAPI = async (username: string, password: string) => {
  try {
    const res = await axios.get(`http://localhost:3002/api/v1/user/login?username=${username}&password=${password}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export { SignupAPI, LoginAPI };
