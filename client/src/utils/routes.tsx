import DashboardPage from "../pages/DashboardPage"
import FocusTimerPage from "../pages/FocusTimerPage"
import GoalsPage from "../pages/GoalsPage"
import ProductinoPage from "../pages/ProductinoPage"
import { Route } from "../types"

const routes: Route[] = [
  {
    path: "/",
    routeName: "Dashboard",
    element: <DashboardPage/>
  },
  {
    path: "/goals",
    routeName: "Goals",
    element: <GoalsPage/>
  },
  {
    path: "/focustimer",
    routeName: "Focus Timer",
    element: <FocusTimerPage/>
  },
  {
    path: "/productino",
    routeName: "Productino AI",
    element: <ProductinoPage/>
  },
]

export default routes