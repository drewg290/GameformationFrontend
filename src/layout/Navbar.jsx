import { NavLink } from "react-router";

import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  return (
    <header id="navbar">
      <img src="../public/logo.png" id="logo" />
      <NavLink id="brand" to="/">
        <p>Home</p>
      </NavLink>
      <nav>
        {token ? (
          <button onClick={logout}>Log out</button>
        ) : (
          <NavLink to="/login">Log in</NavLink>
        )}
      </nav>
    </header>
  );
}
