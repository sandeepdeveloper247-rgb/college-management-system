import{Routes,Route} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
function App(){
  return(
    <Routes>
      <Route path="/" element={
        <PublicRoute>
            <Login />
        </PublicRoute>}/>
      <Route path="/register" element={
        <PublicRoute>
            <Register />
        </PublicRoute>}/>
      <Route path="/student/dashboard" element={
        <ProtectedRoute>
            <StudentDashboard />
        </ProtectedRoute>
      }/>
      <Route path="/admin/dashboard" element={
        <ProtectedRoute>
            <AdminDashboard />
        </ProtectedRoute>
      }/>
    </Routes>
  );
}

export default App;