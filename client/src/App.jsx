import React, { useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { loadUser } from "./features/auth/authSlice";
import Layout from "./pages/Layout";

// Lazy load components
const Login = lazy(() => import("./components/Login"));
const Signup = lazy(() => import("./components/Signup"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const Home = lazy(() => import("./pages/Home"));
const BMIPage = lazy(() => import("./pages/BMIPage"));
const BodyFatPage = lazy(() => import("./pages/BodyFatPage"));
const OfferPage = lazy(() => import("./pages/OfferPage"));

// Loading component
const Loading = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  // Load token from local storage on initial render
  useEffect(() => {
    if (token) {
      dispatch(loadUser()); // Load user data when the app starts
    }
  }, [dispatch, token]);

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/offer" element={<OfferPage />} />
            <Route path="/bmi" element={<BMIPage />} />
            <Route path="/bodyfat" element={<BodyFatPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route
              path="/dashboard"
              element={token ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="*"
              element={<Navigate to={token ? "/dashboard" : "/login"} />}
            />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
