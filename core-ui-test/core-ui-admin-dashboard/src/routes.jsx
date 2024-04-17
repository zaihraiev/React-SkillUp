import React from "react";

const UsersTable = React.lazy(() => import("./components/Users/UserTable.jsx"));

const routes = [
  { path: "/", element: null },
  { path: "/users", name: "UsersTable", element: <UsersTable /> },
];

export default routes;
