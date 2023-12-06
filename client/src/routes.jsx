import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications, Teachers, CreateTeachers, Courses, CreateCourses, Rooms, CreateRooms, Semesters, CreateSemester } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "tables",
      //   path: "/tables",
      //   element: <Tables />,
      // },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "teachers",
        path: "/teachers",
        element: <Teachers />,
      },

      {
        icon: <InformationCircleIcon {...icon} />,
        name: "createteachers",
        path: "/createteachers",
        element: <CreateTeachers />,
      },

      {
        icon: <InformationCircleIcon {...icon} />,
        name: "courses",
        path: "/courses",
        element: <Courses />,
      },

      {
        icon: <InformationCircleIcon {...icon} />,
        name: "createcourses",
        path: "/createcourses",
        element: <CreateCourses />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "rooms",
        path: "/rooms",
        element: <Rooms />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "createrooms",
        path: "/createrooms",
        element: <CreateRooms />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "semesters",
        path: "/semesters",
        element: <Semesters />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "createsemester",
        path: "/createsemester",
        element: <CreateSemester />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
