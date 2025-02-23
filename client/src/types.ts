import { ReactElement } from "react";

export type Route = {
  path: string;
  routeName: string;
  element: ReactElement;
}