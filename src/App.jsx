import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import GameDetails from "./games/GameDetails.jsx";
import GamePage from "./games/GamePage.jsx";
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
       
         <Route index element={<GamePage />} />
        <Route path="/games" element={<GamePage />} />
        <Route path="/games/:id" element={<GameDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
      </Route>
    </Routes>
  );
}
