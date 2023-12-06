import React, { useState, useEffect } from "react";
import {
  Card,
  Input,
  MenuItem,
  Button,
  Typography,
  // Select,
  Option,
  Table
} from "@material-tailwind/react";
import Select from 'react-select';
import axiosInstance from "@/configs/axios"
import { useNavigate } from "react-router-dom";

export function CreateSemester() {
  const navigate = useNavigate()
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("it");
  const [selectedCourses, setSelectedCourses] = useState([]); // State to hold selected courses
  const [loader, setLoader] = useState(false);
  const [response, setResponse] = useState("")

  const getCourses = async () => {
    try {
      const response = await axiosInstance.get("/course/get");
      console.log(response?.data?.courses);
      const arr = []
      response?.data?.courses.forEach((v) => {
        arr.push({ value: v._id, label: v.name })
      })
      setCourses(arr)
      setLoader(false);
    } catch (error) {
      console.log("Login failed", error);
    }
  }
  useEffect(() => {
    getCourses();
  }, [])


  const onHandleSubmit = async (e) => {
    e.preventDefault();
    setResponse("");
    setLoader(true);
    const courseArr = []
    selectedCourses.forEach(v => {
      courseArr.push(v.value)
    })
    try {
      const response = await axiosInstance.post("/semester/create", {
        name, department, courses: courseArr
      });
      navigate("/dashboard/semesters");
      setLoader(false);
    } catch (error) {
      console.log("Login failed", error);
      setResponse(error?.response?.data?.message);
    }
  }

  return (
    <div className="mt-12">

      <div className="my-16">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Create a new Semester
          </Typography>

          <form className="mt-8 mb-2 max-w-screen-lg" onSubmit={onHandleSubmit}>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 flex flex-col gap-3">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Name
                </Typography>
                <Input
                  size="lg"
                  placeholder="name@mail.com"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Department
                </Typography>
                <Select
                  onChange={(selectedOptions) =>
                    setDepartment(selectedOptions.value)}
                  options={[{ label: 'BS IT', value: "it" }, { label: 'BS CS', value: "cs" }]}
                />


              </div>
              <div className="flex-1 flex flex-col gap-3">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Courses
                </Typography>
                <Select
                  isMulti
                  value={selectedCourses}
                  onChange={(selectedOptions) =>
                    setSelectedCourses(selectedOptions)}
                  options={courses}
                />

              </div>
            </div>
            <Typography variant="paragraph" className="text-center text-red-500 font-medium mt-4">
              {response}
            </Typography>
            <Button className="mt-6" type="submit" >
              Add Semester
            </Button>

          </form>
        </Card>
      </div>
    </div>
  );
}

export default CreateSemester;
