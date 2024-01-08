import App from "../pages";
import Chats from "../pages/chats";
import Devices from "../pages/devices";
import ErrorPage from "../pages/error-page";
import People from "../pages/people";
import Profile from "../pages/profile";
import Settings from "../pages/settings";
import Signin from "../pages/signin";
import Room from '../pages/room'

export const routes = [
  {
    path: "/",
    element: <Chats />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/chats",
    element: <Chats />,
  },
  {
    path: "/room",
    element: <Room />,
  },
  {
    path: "/people",
    element: <People />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/devices",
    element: <Devices />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/sign-in",
    element: <Signin />,
  },
];
