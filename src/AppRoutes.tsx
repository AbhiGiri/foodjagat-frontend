import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layouts/Layout.jsx"
import Home from "./pages/Home.js"
import AuthCallbackPage from "./pages/AuthCallbackPage.js"
import UserProfilePage from "./pages/UserProfilePage.js"
import ProtectedRoute from "./auth/ProtectedRoute.js"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout showHero={true}><Home/></Layout>}/>
      <Route path="/auth-callback" element={<AuthCallbackPage />}/>
      <Route element={<ProtectedRoute />}>
        <Route path="/user-profile" element={<Layout showHero={false}><UserProfilePage /></Layout>}/>
      </Route>
      <Route path="*" element={<Navigate to="/" />}/>
    </Routes>
  )
}

export default AppRoutes