import { clearAuthToken } from "../util/auth";
import { redirect } from "react-router-dom";

export function action() {
  clearAuthToken();

  return redirect("/");
}
