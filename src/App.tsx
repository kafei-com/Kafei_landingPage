import { Routes, Route } from "react-router-dom";
import Home from "./home";
import Overview from "./components/KafeiAi/overview";
import Login from "./components/page/auth/Login";
import Signup from "./components/page/auth/Signup";
import Dashboard from "./components/KafeiAi/dashboard/main";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/KafeiAi" element={<Overview />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
    </Routes>
  );
};

export default App;
