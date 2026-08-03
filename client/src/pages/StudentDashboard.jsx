import User from "../../../server/src/models/User";

function StudentDashboard(){
  const user=JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <h1>Student Dashboard</h1>
      <h2>Welcome {User.name}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}

export default StudentDashboard;