import { Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import { lazy, Suspense } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import PrivateRoute from "./components/PrivateRoute";

const Home = lazy(() => import("./pages/Home"));
const Facilities = lazy(() => import("./pages/Facilities"));
const FacilityDetails = lazy(() => import("./pages/FacilityDetails"));
const MyBookings = lazy(() => import("./pages/MyBookings"));
const AddFacility = lazy(() => import("./pages/AddFacility"));
const EditFacility = lazy(() => import("./pages/EditFacility"));
const ManageFacilities = lazy(() => import("./pages/ManageFacilities"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route
            path="/facility/:id"
            element={
              <PrivateRoute>
                <FacilityDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <PrivateRoute>
                <MyBookings />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-facility"
            element={
              <PrivateRoute>
                <AddFacility />
              </PrivateRoute>
            }
          />
          <Route
            path="/manage-facilities"
            element={
              <PrivateRoute>
                <ManageFacilities />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-facility/:id"
            element={
              <PrivateRoute>
                <EditFacility />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
export default App;

