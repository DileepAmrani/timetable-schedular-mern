import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Button
} from "@material-tailwind/react";

import {
  authorsTableData,
  teachersTableData
} from "@/data";
import axiosInstance from "@/configs/axios"

export function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loader, setLoader] = useState(false);

  const getData = async () => {
    try {
      const response = await axiosInstance.get("/teacher/get");
      console.log(response?.data?.teachers);
      setTeachers(response?.data?.teachers)
      setLoader(false);
    } catch (error) {
      console.log("Login failed", error);
    }
  }
  useEffect(() => {
    getData();
  }, [])


  const onHandleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/teacher/remove/${id}`);
      getData();
    } catch (error) {
      console.log("Login failed", error);
    }
  }

  return (
    <div className="mt-12">

      <div className="px-4">
        <a href="/dashboard/createteachers">
          <Button>Create</Button>
        </a>
      </div>
      <div className="my-16">
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Teachers
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["name", "gender", "qualification", "contact", "courses", ""].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {teachers.map(
                  ({ name, email, qualification, contact, gender, courses, _id }, key) => {
                    const className = `py-3 px-5 ${key === authorsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                      }`;

                    return (
                      <tr key={name}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            {/* <Avatar src={img} alt={name} size="sm" variant="rounded" /> */}
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {name}
                              </Typography>
                              <Typography className="text-xs font-normal text-blue-gray-500">
                                {email}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600 capitalize">
                            {gender}
                          </Typography>

                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {qualification}
                          </Typography>

                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {contact}
                          </Typography>
                        </td> <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600 flex items-center gap-2 flex-wrap">
                            {courses.map((v,i)=> {
                              return <p className="bg-gray-200 px-2 p-1 rounded">{v.name}</p>
                            })}
                          </Typography>
                        </td>
                        
                        <td className={className}>
                          <Typography 
                               as="button"
                            onClick={() => onHandleDelete(_id)}
                            className="text-xs font-semibold text-red-600"
                          >
                            Delete
                          </Typography>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>

      </div>
    </div>
  );
}

export default Teachers;
