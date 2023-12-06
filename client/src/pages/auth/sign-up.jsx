import React, { useState } from 'react'
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "@/configs/axios"


export function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState("")

  const handleSignup = async (e) => {
        e.preventDefault();
        setLoader(true);
        setResponse("");
        setError(false)
        try {
            const response = await axiosInstance.post("/users/register", {
                email: email,
                password: password,
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
    };

  return (
    <section className="flex justify-center items-center">

      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Join Us Today</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to register.</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSignup}>
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
            <Input
              type="password"
              size="lg"
              placeholder="Password"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />
          </div>
      
          <Button className="mt-6" fullWidth type='submit'>
            Register Now
          </Button>

          <Typography variant="paragraph" className="text-center text-red-500 font-medium mt-4">
          {response}
          </Typography>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-2">
            Already have an account?
            <Link to="/auth/sign-in" className="text-gray-900 ml-1">Sign in</Link>
          </Typography>
        </form>

      </div>
    </section>
  );
}

export default SignUp;
