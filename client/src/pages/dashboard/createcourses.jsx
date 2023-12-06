import React, { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option
} from "@material-tailwind/react";
import axiosInstance from "@/configs/axios"
import { useNavigate } from "react-router-dom";

export function CreateCourses() {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [department, setDepartment] = useState("");
  const [creditHours, setCreditHours] = useState("");
  const [contantHours, setContantHours] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState("")

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    setResponse("");
    setError(false)
    setLoader(true);
    try {
      const response = await axiosInstance.post("/course/create", {
        name, code, department, creditHours, contantHours
      });
      navigate("/dashboard/courses");
      setLoader(false);

    } catch (error) {
      console.log("Login failed", error);
      setResponse(error?.response?.data?.message);
      setError(true);
    }
  }
  return (
    <div className="mt-12">

      <div className="my-16">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Create a new Course
          </Typography>

          <form className="mt-8 mb-2 max-w-screen-lg" onSubmit={onHandleSubmit}>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 flex flex-col gap-3">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Name
                </Typography>
                <Input
                  size="lg"
                  placeholder="English, Math etc"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Code
                </Typography>
                <Input
                  size="lg"
                  placeholder="BR-450"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Department
                </Typography>
                <Select variant="outlined" label="Select Department"
                  className="p-4"
                  value={department}
                  onChange={(e) => setDepartment(e)}>
                  <Option value="it">BS IT</Option>
                  <Option value="cs">BS CS</Option>
                </Select>
              </div>
              <div className="flex-1 flex flex-col gap-3">

                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Credit Hours
                </Typography>
                <Select variant="outlined" label="Select Credit Hours"
                  className="p-4"
                  value={creditHours}
                  onChange={(e) => setCreditHours(e)}>
                  <Option value="2+0">2+0</Option>
                  <Option value="2+1">2+1</Option>
                  <Option value="3+0">3+0</Option>
                  <Option value="3+1">3+1</Option>
                </Select>

                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Contant Hours
                </Typography>
                <Input
                  size="lg"
                  placeholder="2,3 etc"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  value={contantHours}
                  onChange={(e) => setContantHours(e.target.value)}
                />

              </div>
            </div>
            <Typography variant="paragraph" className="text-center text-red-500 font-medium mt-4">
              {response}
            </Typography>
            <Button className="mt-6" type="submit">
              Add Course
            </Button>

          </form>
        </Card>
      </div>
    </div>
  );
}

export default CreateCourses;
