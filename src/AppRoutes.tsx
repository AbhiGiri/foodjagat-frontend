import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layouts/Layout.jsx"
import Home from "./pages/Home.js"
import AuthCallbackPage from "./pages/AuthCallbackPage.js"
import UserProfilePage from "./pages/UserProfilePage.js"
import ProtectedRoute from "./auth/ProtectedRoute.js"
import ManageRestaurantPage from "./forms/manage-restaurant-form/ManageRestaurantPage.js"
import SearchPage from "./pages/SearchPage.js"
import DetailPage from "./pages/DetailPage.js"

function AppRoutes() {
  return (
    <Routes>
      {/* [1]. Basic Routes */}
      <Route path="/"                     element={<Layout showHero={true}>  <Home/>       </Layout>}/>
      <Route path="/auth-callback"        element={<AuthCallbackPage />}/>
      <Route path="/search/:city"         element={<Layout showHero={false}> <SearchPage/> </Layout>}/>
      <Route path="/detail/:restaurantId" element={<Layout showHero={false}> <DetailPage/> </Layout>}/>
      {/* Basic Routes Ends*/}

      {/* [2]. Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/user-profile"      element={<Layout showHero={false}> <UserProfilePage />      </Layout>}/>
        <Route path="/manage-restaurant" element={<Layout showHero={false}> <ManageRestaurantPage /> </Layout>}/>
      </Route>
      <Route path="*" element={<Navigate to="/" />}/>
      {/* protected Routes End */}
    </Routes>
  )
}

export default AppRoutes