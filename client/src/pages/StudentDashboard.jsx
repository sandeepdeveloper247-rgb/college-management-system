// import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function StudentDashboard(){
  // const user=JSON.parse(localStorage.getItem("user"));
  const { user } = useContext(AuthContext);
  if (!user) {
    return null;
  } 
  // const navigate=useNavigate();
  // const { setUser, setToken } = useContext(AuthContext);
  // function handleLogout(){
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");

  //   setUser(null);
  //   setToken(null);

  //   navigate("/");
  // }
  return (
    // <div className="min-h-screen flex items-center justify-center bg-gray-100">
    //   <div className="bg-white p-8 rounded-xl shadow-lg">
    <DashboardLayout>
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <h2 className="text-3xl font-bold">Welcome {user.name}</h2>
        <p className="mt-4">Email: {user.email}</p>
        <p>Role: {user.role}</p>
        {/* <button onClick={handleLogout}
         className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Logout
        </button> */}
    </DashboardLayout>
    //   </div>
    // </div>
  );
}

export default StudentDashboard;