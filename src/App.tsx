import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import HeaderLayout from "./components/layout/HeaderLayout";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import DayChallengePage from "./pages/DayChallengePage";
import DayChallengeLayout from "./components/layout/DayChallengeLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HeaderLayout />,
    children: [
      {
        element: <Layout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "home", element: <Navigate to="/" replace /> },
        ],
      },
      {
        path: "challenge/day-9",
        element: <DayChallengeLayout />,
        children: [{ index: true, element: <DayChallengePage /> }],
      },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
