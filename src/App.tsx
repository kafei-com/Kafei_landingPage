import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import Overview from "@/features/kafei-ai/components/KafeiAi/overview";
import { Login, Signup } from "@/features/auth/components";
import { Wishlist } from "@/features/wishlist/components";
import Dashboard from "@/features/kafei-ai/components/KafeiAi/dashboard/main";
import { PrivateRoute } from "@/components/common";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product" element={<Home />} />
      <Route path="/features" element={<Home />} />
      <Route path="/pricing" element={<Home />} />
      <Route path="/KafeiAi" element={<Overview />} />
      <Route path="/about" element={<AboutUs />} />

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

      {/* Catchall route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
