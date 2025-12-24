import { Routes, Route } from "react-router-dom";
import Home from "./home";
import Overview from "@/features/kafei-ai/components/KafeiAi/overview";
import { Login, Signup } from "@/features/auth/components";
import { Wishlist } from "@/features/wishlist/components";
import Dashboard from "@/features/kafei-ai/components/KafeiAi/dashboard/main";
import { PrivateRoute } from "@/components/common";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/KafeiAi" element={<Overview />} />

      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
