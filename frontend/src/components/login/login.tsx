import React, { ChangeEvent, useState } from "react";
import {SignupForm} from '../../interfaces/user';
import { SignupAPI, LoginAPI } from "../../API/auth";
import "./login.css";

interface Props {
  setLogin: (b: boolean) => void;
}

const intialSignupForm: SignupForm = {
  name: "",
  username: "",
  password: "",
  email: "",
};

const Signup: React.FC<Props> = (props) => {
  const [form, setForm] = useState<SignupForm>(intialSignupForm);
  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  // function generatedHiddenPassword() {
  //   return "*".repeat(form.password.length);
  // }

  async function  registerUser()  {
    const res = await SignupAPI(form);
    console.log(res);
  }
  return (
    <div className="login-component">
      <div className="flex flex-col justify-between">
        <input
          onChange={handleFormChange}
          type="text"
          name="name"
          value={form.name}
          placeholder="Enter your Name"
        />
        <input
          onChange={handleFormChange}
          type="text"
          name="username"
          value={form.username}
          placeholder="Username"
        />
        <input
          onChange={handleFormChange}
          type="text"
          name="email"
          value={form.email}
          placeholder="Email"
        />
        <input
          onChange={handleFormChange}
          type="text"
          name="password"
          value={form.password}
          placeholder="Password"
        />
      </div>
      <button className="signup-button" onClick={registerUser}>
        Sign up
      </button>
      <br />
      <br />
      <div>
        Already have an account?{" "}
        <span
          className="text-blue-800 cursor-pointer"
          onClick={() => props.setLogin(true)}
        >
          Log in
        </span>
      </div>
    </div>
  );
};

const Login: React.FC<Props> = (props) => {
  const [username, setusername] = useState<string>("");
  const [password, setpassword] = useState<string>("");

  // function generatedHiddenPassword() {
  //   return "*".repeat(password.length);
  // }

  const LoginUser = async () => {
    const res = await LoginAPI(username, password);
    console.log(res);
  }
  return (
    <div className="login-component">
      <div className="flex flex-col justify-between">
        <input
          onChange={(e) => {
            setusername(e.target.value);
          }}
          type="text"
          value={username}
          placeholder="username"
        />
        <input
          onChange={(e) => {
            setpassword(e.target.value);
          }}
          type="text"
          value={password}
          placeholder="password"
        />
      </div>
      <button onClick={LoginUser} className="login-button">Log in</button>
      <br />
      <br />
      <div>
        Don't have an account?{" "}
        <span
          className="text-rose-800 cursor-pointer"
          onClick={() => props.setLogin(false)}
        >
          Sign up
        </span>
      </div>
    </div>
  );
};

const LoginComponent: React.FC = () => {
  const [login, setLogin] = useState<boolean>(false);
  return (
    <div className="login-page bg-blue-50">
      {login ? <Login setLogin={setLogin} /> : <Signup setLogin={setLogin} />}
    </div>
  );
};

export default LoginComponent;
