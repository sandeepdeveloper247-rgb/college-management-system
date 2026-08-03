import { useNavigate } from "react-router-dom";

function AdminDashboard(){
  const user=JSON.parse(localStorage.getItem("user"));
  const navigate=useNavigate();
  function handleLogout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  }
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Welcome {user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default AdminDashboard;