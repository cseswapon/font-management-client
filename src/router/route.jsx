import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import ListFonts from "../Pages/ListFonts";
import CreateFontGroup from "../Pages/CreateFontGroup";
import NotFound from "../Pages/NotFound";
import Layout from "../Components/shared/Layout";
import FontGroupList from "../Pages/FontGroupList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "list-fonts",
        element: <ListFonts />,
      },
      {
        path: "create-fonts-group",
        element: <CreateFontGroup />,
      },
      {
        path: "list-fonts-group",
        element: <FontGroupList />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
