import React, { useState } from "react";

import {
  authorsTableData,
  teachersTableData
} from "@/data";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option
} from "@material-tailwind/react";
import axiosInstance from "@/configs/axios"
import { useNavigate } from "react-router-dom";

export function CreateRooms() {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [isLab, setIsLab] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState("")

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    setResponse("");
    setError(false)
    setLoader(true);
    try {
      const response = await axiosInstance.post("/room/create", {
        name, code, isLab
      });
      navigate("/dashboard/rooms");
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
            Create a new Room
          </Typography>

          <form className="mt-8 mb-2 max-w-screen-lg" onSubmit={onHandleSubmit}>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 flex flex-col gap-3">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Name
                </Typography>
                <Input
                  size="lg"
                  placeholder="Name"
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
                  placeholder="Code"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />

              </div>
              <div className="flex-1 flex flex-col gap-3">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Is Lab?
                </Typography>
                <Select variant="outlined" label="Select Gender" className="p-4"
                  value={isLab}
                  onChange={(e) => setIsLab(e)}
                >
                  <Option value="true">True</Option>
                  <Option value="false">False</Option>
                </Select>

              </div>
            </div>
            <Typography variant="paragraph" className="text-center text-red-500 font-medium mt-4">
              {response}
            </Typography>
            <Button className="mt-6" type="submit">
              Add Room
            </Button>

          </form>
        </Card>
      </div>
    </div>
  );
}

export default CreateRooms;
