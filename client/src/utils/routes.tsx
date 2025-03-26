import DashboardPage from "../pages/DashboardPage"
import FocusTimerPage from "../pages/FocusTimerPage"
import GoalsPage from "../pages/GoalsPage"
import ProductinoPage from "../pages/ProductinoPage"
import TasksPage from "../pages/TasksPage"
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
    path: "/tasks",
    routeName: "Daily Tasks",
    element: <TasksPage/>
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