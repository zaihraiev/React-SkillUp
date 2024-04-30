﻿import { Link, NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
export default function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              to="/products"
              end
            >
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
