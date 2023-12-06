import React, { useState } from 'react'
import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "@/configs/axios"

export function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse("");
    setError(false)
    setLoader(true);
    try {
      const response = await axiosInstance.post("/users/login", {
        email,
        password,
      });
      console.log(response);
      const { token, role, message } = response.data;
      setResponse(message);
      localStorage.setItem("auth", JSON.stringify({ token, role }));
      navigate("/dashboard/home");
      setLoader(false);

    } catch (error) {
      console.log("Login failed", error);
      setResponse(error?.response?.data?.message);
      setError(true);
    }
  }

  return (
    <section className="flex justify-center gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />
          </div>
      
          <Button className="mt-6" fullWidth type='submit'>
            Sign In
          </Button>

          <div className="flex items-center justify-between gap-2 mt-6">
          
            <Typography variant="small" className="font-medium text-gray-900">
              <a href="#">
                Forgot Password
              </a>
            </Typography>
          </div>
          <Typography variant="paragraph" className="text-center text-red-500 font-medium mt-4">
          {response}
          </Typography>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-2">
            Not registered?
            <Link to="/auth/sign-up" className="text-gray-900 ml-1">Create account</Link>
          </Typography>
        </form>

      </div>
    </section>
  );
}

export default SignIn;
