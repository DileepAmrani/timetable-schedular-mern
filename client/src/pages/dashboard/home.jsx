import React, { useState, useEffect } from "react";
import {
  Typography,
} from "@material-tailwind/react";

import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsChartsData,
} from "@/data";
import { ClockIcon } from "@heroicons/react/24/solid";
import {
} from "@material-tailwind/react";

import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  BookOpenIcon
} from "@heroicons/react/24/solid";
import axiosInstance from "@/configs/axios"

export function Home() {
  const [totalTeachers, setTotalTeachers] = useState(0)
  const [totalCourses, setTotalCourses] = useState(0)
  const [totalRooms, setTotalRooms] = useState(0)
  const [totalSemester, setTotalSemesters] = useState(0)
  const [timeTable, setTimeTable] = useState([[],[]])

  const generateTimetable = () => {
    const semesters = []; // Array to hold semesters

    for (let semesterCount = 0; semesterCount < 2; semesterCount++) {
      const daysInWeek = [3, 3, 3, 3, 2]; // Number of classes per day for each semester

      const timetable = [];

      for (let dayIndex = 0; dayIndex < daysInWeek.length; dayIndex++) {
        const day = {
          dayOfWeek: dayIndex + 1,
          classes: [],
        };

        const classesForDay = daysInWeek[dayIndex];

        for (let classIndex = 0; classIndex < classesForDay; classIndex++) {
          const randomCourse = totalCourses[Math.floor(Math.random() * totalCourses.length)];
          const randomRoom = totalRooms[Math.floor(Math.random() * totalRooms.length)];
          const randomTeacher = totalTeachers[Math.floor(Math.random() * totalTeachers.length)];

          const newClass = {
            course: randomCourse,
            room: randomRoom,
            teacher: randomTeacher,
          };

          day.classes.push(newClass);
        }

        timetable.push(day);
      }

      semesters.push(timetable);
    }

    return semesters;
  }



  const handleButtonClick = async () => {
    const generatedTimetable = generateTimetable();
    console.log(timeTable);
    setTimeTable(generatedTimetable)
    // You can save this to the database or use it as needed
  }

  const getTeachers = async () => {
    try {
      const response = await axiosInstance.get("/teacher/get");
      setTotalTeachers(response?.data?.teachers)
      setLoader(false);
    } catch (error) {
      console.log("Login failed", error);
    }
  }

  const getCourses = async () => {
    try {
      const response = await axiosInstance.get("/course/get");
      setTotalCourses(response?.data?.courses)
    } catch (error) {
      console.log("Login failed", error);
    }
  }

  const getRooms = async () => {
    try {
      const response = await axiosInstance.get("/room/get");
      setTotalRooms(response?.data?.rooms)
    } catch (error) {
      console.log("Login failed", error);
    }
  }

  const getSemesters = async () => {
    try {
      const response = await axiosInstance.get("/semester/get");
      setTotalSemesters(response?.data?.semesters)
    } catch (error) {
      console.log("Login failed", error);
    }
  }

  useEffect(() => {
    getCourses();
    getRooms();
    getSemesters();
    getTeachers()
  }, [])

  return (
    <div className="mt-12">
      <button onClick={() => handleButtonClick()}>Generate</button>
      <table className="w-full min-w-[640px] table-auto">
        {/* <thead>
          <tr>
            {["name", "code", "is lab", ""].map((el) => (
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
        </thead> */}
        <tbody>
          {timeTable[1].map((v, key) => {
            const className = `py-3 px-5 ${key === timeTable.length - 1
              ? ""
              : "border-b border-blue-gray-50"
              }`;

            return (
              <tr key={key}>
                {/* <td className={className}>
                  <div className="flex items-center gap-4">
                    <div>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {v.dayOfWeek}
                      </Typography>

                    </div>
                  </div>
                </td> */}
                <td className={className}>
                  <Typography className="text-xs font-semibold text-blue-gray-600 flex gap-4">
                    {v.classes.map((val, ind) => {
                      return <div className="flex-1">
                        <p>{val.course.name}</p>
                        <p>{val.teacher.name}</p>
                        <p>{val.room.name}</p>
                      </div>
                    })}
                  </Typography>

                </td>

              </tr>
            );
          }
          )}
        </tbody>
        <tbody>
          {timeTable[0].map((v, key) => {
            const className = `py-3 px-5 ${key === timeTable.length - 1
              ? ""
              : "border-b border-blue-gray-50"
              }`;

            return (
              <tr key={key}>
                {/* <td className={className}>
                  <div className="flex items-center gap-4">
                    <div>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {v.dayOfWeek}
                      </Typography>

                    </div>
                  </div>
                </td> */}
                <td className={className}>
                  <Typography className="text-xs font-semibold text-blue-gray-600 flex gap-4">
                    {v.classes.map((val, ind) => {
                      return <div className="flex-1">
                        <p>{val.course.name}</p>
                        <p>{val.teacher.name}</p>
                        <p>{val.room.name}</p>
                      </div>
                    })}
                  </Typography>

                </td>

              </tr>
            );
          }
          )}
        </tbody>
      </table>
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        <StatisticsCard
          key={"Teachers"}
          value={totalTeachers.length}
          title={"Teachers"}
          icon={React.createElement(UsersIcon, {
            className: "w-6 h-6 text-white",
          })}
        />
        <StatisticsCard
          key={"Courses"}
          value={totalCourses.length}
          title={"Courses"}
          icon={React.createElement(AcademicCapIcon, {
            className: "w-6 h-6 text-white",
          })}
        />
        <StatisticsCard
          key={"Rooms"}
          value={totalRooms.length}
          title={"Rooms"}
          icon={React.createElement(BuildingOfficeIcon, {
            className: "w-6 h-6 text-white",
          })}
        />
        <StatisticsCard
          key={"Semester"}
          value={totalSemester.length}
          title={"Semester"}
          icon={React.createElement(BookOpenIcon, {
            className: "w-6 h-6 text-white",
          })}
        />

      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>

    </div>
  );
}

export default Home;
