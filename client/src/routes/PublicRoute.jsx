import { Navigate } from "react-router-dom";

function PublicRoute({children}){
  const token=localStorage.getItem("token");
  const user=JSON.parse(localStorage.getItem("user"));
  if(token && user){
    if(user.role==="admin"){
      return <Navigate to="/admin/dashboard" />;
    }
    return <Navigate to="/student/dashboard" />;
  }
  return children;
}

export default PublicRoute;