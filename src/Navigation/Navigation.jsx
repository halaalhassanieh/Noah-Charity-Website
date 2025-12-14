import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainLayout from "./Layouts/MainLayout"
import { Public } from "./routes/Public"
import { Private } from "./routes/Private"
import DashboardRouteProtect from "./Layouts/DashboardRouteProtect"
import Authentication from "./Layouts/Authentication"
import { Auth } from "./routes/Auth"



const router = createBrowserRouter(
    [
        {
            element: <MainLayout />,
            children: [
                {
                    children: Public,
                },
                {
                    element: <DashboardRouteProtect />,
                    children: Private,
                },
                {
                    element: <Authentication />,
                    children: Auth,
                },
            ]

        },
    ],
    //  { basename: "Hope-Charity-Website" },
)
const Navigation = () => {

    return (
          <RouterProvider router={router} />
    )
}

export default Navigation

