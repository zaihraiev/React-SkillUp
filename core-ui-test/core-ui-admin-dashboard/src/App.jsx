import React, { Suspense, useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import UserTable from "./components/Users/UserTable.jsx";
import { Route, RouterProvider, Routes } from "react-router-dom";
import routes from "./routes.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="wrapper d-flex flex-column min-vh-100">
      <Header />
      <Suspense>
        <Routes>
          {routes.map((route, idx) => {
            return (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                element={route.element}
              />
            );
          })}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
