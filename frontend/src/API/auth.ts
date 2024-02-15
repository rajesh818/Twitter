import { SignupForm } from "../interfaces/user";
import { StoreToken } from "../utils/localstorage";
import axios from "axios";
import StatusCodeReslover from "../utils/status-code-resolver";

const SignupAPI = async (data: SignupForm) => {
  try {
    const res = await axios.post("http://localhost:3002/api/v1/signup", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    StoreToken(res.data.token);
    return {
      "response": res.data,
      "status": StatusCodeReslover(res.status)
    }
  } catch (err) {
    console.log(err);
    return undefined;
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
    return {
      "response": res.data,
      "status": StatusCodeReslover(res.status)
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const CheckTokenAPI = async (token: string) => {
  try {
    const res = await axios.get(`http://localhost:3002/api/v1/checktoken?token=${token}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return {
      "response": res.data,
      "status": StatusCodeReslover(res.status)
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export { SignupAPI, LoginAPI, CheckTokenAPI };
