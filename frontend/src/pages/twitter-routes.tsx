import { useEffect, useState } from "react";
import { CheckTokenAPI } from "../API/auth";
import LoginComponent from "../components/login/login";

const TwitterRoutes = () => {
  const [isAuthenticated, setisAuthenticated] = useState<boolean>(false);
  async function handleAuthentication() {
    console.log("handleAuthentication");
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      const res = await CheckTokenAPI(token);
      console.log("API Triggered");
      if (res && res.status === "SUCCESS") {
        console.log(res);
        setisAuthenticated(true);
      }
    }
    else {
      setisAuthenticated(false);
    }
    
  }
  useEffect(() => {
    handleAuthentication();
  }, []);
  useEffect (() => {
    console.log(`isAuthenticated: ${isAuthenticated}`);
  },[isAuthenticated]);

  return (
    <>
      {isAuthenticated ? 
        <div>Hello world</div>
      : <LoginComponent handleAuthentication={handleAuthentication}/>}
    </>
  )
};

export default TwitterRoutes;
