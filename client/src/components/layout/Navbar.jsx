import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
    const { user } = useContext(AuthContext);
    return (
        <div className="h-16 bg-white shadow flex items-center justify-between px-6">

            <h1 className="text-xl font-semibold">
                Welcome, {user?.name}
            </h1>

            <div className="flex items-center gap-4">

                <button className="text-2xl">
                    🔔
                </button>

                {/* <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold">
                    S
                </div> */}
                <div className="flex items-center gap-3">

                <div className="text-right">

                    <p className="font-semibold">
                        {user?.name}
                    </p>

                    <p className="text-sm text-gray-500 capitalize">
                        {user?.role}
                    </p>

                </div>

                <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                </div>

            </div>

            </div>

        </div>
    );
}

export default Navbar;