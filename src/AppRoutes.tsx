import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layouts/Layout.jsx"
import Home from "./pages/Home.js"
import AuthCallbackPage from "./pages/AuthCallbackPage.js"
import UserProfilePage from "./pages/UserProfilePage.js"
import ProtectedRoute from "./auth/ProtectedRoute.js"
import ManageRestaurantPage from "./forms/manage-restaurant-form/ManageRestaurantPage.js"

function AppRoutes() {
  return (
    <Routes>
      {/* [1]. Basic Routes */}
      <Route path="/"               element={<Layout showHero={true}><Home/></Layout>}/>
      <Route path="/auth-callback"  element={<AuthCallbackPage />}/>
      {/* Basic Routes Ends*/}

      {/* [2]. Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/user-profile" element={<Layout showHero={false}><UserProfilePage /></Layout>}/>
        <Route path="/manage-restaurant" element={<Layout showHero={false}><ManageRestaurantPage /></Layout>}/>
      </Route>
      <Route path="*"               element={<Navigate to="/" />}/>
      {/* protected Routes End */}

    </Routes>
  )
}

export default AppRoutes