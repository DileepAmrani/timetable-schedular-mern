import React, { useState, useEffect} from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody, Button,

} from "@material-tailwind/react";

import {
  authorsTableData,
  coursesTableData
} from "@/data";
import axiosInstance from "@/configs/axios"

export function Courses() {
  const [courses, setCourses] = useState([]);
  const [loader, setLoader] = useState(false);

  const getData = async () => {
    try {
      const response = await axiosInstance.get("/course/get");
      console.log(response?.data?.courses);
      setCourses(response?.data?.courses)
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
      await axiosInstance.delete(`/course/remove/${id}`);
      getData();
    } catch (error) {
      console.log("Login failed", error);
    }
  }


  return (
    <div className="mt-12">
      <div className="px-4">
        <a href="/dashboard/createcourses">
          <Button>Create</Button>
        </a>
      </div>
      <div className="my-16">
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Courses
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll md:overflow-hidden px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["title", "code", "credit hours", "contract hours", ""].map((el) => (
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
                {courses.map(
                  ({ name, code, contantHours, creditHours , _id}, key) => {
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

                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {code}
                          </Typography>

                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {creditHours}
                          </Typography>

                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {contantHours}
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

export default Courses;
