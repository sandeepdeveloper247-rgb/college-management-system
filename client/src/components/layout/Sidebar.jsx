import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link,useNavigate } from "react-router-dom";

function Sidebar() {
    const { user, setUser, setToken } = useContext(AuthContext);
    const navigate = useNavigate();
    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
        setToken(null);

        navigate("/");
    }   
    return (
        <div className="w-64 h-screen bg-slate-800 text-white flex flex-col">

            <div className="text-2xl font-bold p-6 border-b border-slate-700">
                College Portal
            </div>
                <nav className="flex flex-col p-4 gap-2">

    <Link
        to={user?.role === "admin"
    ? "/admin/dashboard"
    : "/student/dashboard"}
        className="px-4 py-2 rounded hover:bg-slate-700"
    >
        Dashboard
    </Link>

    {user?.role === "student" && (
        <>
            <Link
                to="#"
                className="px-4 py-2 rounded hover:bg-slate-700"
            >
                Attendance
            </Link>

            <Link
                to="#"
                className="px-4 py-2 rounded hover:bg-slate-700"
            >
                Assignments
            </Link>
        </>
    )}

    {user?.role === "admin" && (
        <>
            <Link
                to="/admin/students"
                className="px-4 py-2 rounded hover:bg-slate-700"
            >
                Students
            </Link>

            <Link
                to="#"
                className="px-4 py-2 rounded hover:bg-slate-700"
            >
                Faculty
            </Link>
        </>
    )}

    <Link
        to="#"
        className="px-4 py-2 rounded hover:bg-slate-700"
    >
        Notices
    </Link>

    <Link
        to="/profile"
        className="px-4 py-2 rounded hover:bg-slate-700"
    >
        Profile
    </Link>

    <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 hover:bg-red-600 rounded px-4 py-2"
    >
        Logout
    </button>

</nav>
           

        </div>
    );
}

export default Sidebar;