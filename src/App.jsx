import { RouterProvider, createBrowserRouter } from "react-router";
import Layout from "./components/layout/Layout";
import LandingPage from "./pages/LandingPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [{ path: "/", index: true, element: <LandingPage /> }],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_startTransition: true,
    },
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
