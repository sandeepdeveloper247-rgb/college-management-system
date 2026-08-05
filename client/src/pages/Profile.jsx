import { useEffect,useState } from "react";
import api from "../services/api";

function Profile(){
  const [profile,setProfile]=useState(null);
  const [loading,setLoading]=useState(true);
  const [editing, setEditing] = useState(false);
  useEffect(()=>{
    async function fetchProfile(){

      try{
        const response=await api.get("/students/profile");
        setProfile(response.data);
        setLoading(false);
      }catch(error){
        console.error(error);
      }
    }
    fetchProfile();
  },[]);
  function handleChange(e) {
    setProfile({
        ...profile,
        [e.target.name]: e.target.value,
    });
}
async function handleSave(){
  try{
    const response=await api.put("/students/profile",{
      name: profile.name,
      department: profile.department,
      semester: profile.semester,
      discordId: profile.discordId,
    });
    setProfile(response.data.user);
    setEditing(false);
    alert("Profile updated successfully");
  }catch(error){
    console.error(error);
    alert("Failed to update profile.");
  }
}
  if (loading) {
    return (
        <div className="p-6 text-xl">
            Loading...
        </div>
    );
}
  return (<div className="p-8">
        <h1 className="text-3xl font-bold mb-6">
        Profile
        </h1>
        {
    editing ? (

        <div className="space-y-4">

            <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="border p-2 rounded w-full"
            />

            <input
                type="text"
                name="department"
                value={profile.department}
                onChange={handleChange}
                className="border p-2 rounded w-full"
            />

            <input
                type="number"
                name="semester"
                value={profile.semester}
                onChange={handleChange}
                className="border p-2 rounded w-full"
            />

            <input
                type="text"
                name="discordId"
                value={profile.discordId}
                onChange={handleChange}
                className="border p-2 rounded w-full"
            />

        </div>

    ) : (

        <div>

            <p><strong>Name:</strong> {profile.name}</p>

            <p><strong>Email:</strong> {profile.email}</p>

            <p><strong>Role:</strong> {profile.role}</p>

            <p><strong>Department:</strong> {profile.department}</p>

            <p><strong>Semester:</strong> {profile.semester}</p>

            <p><strong>Discord ID:</strong> {profile.discordId || "Not Added"}</p>

        </div>

    )
}
        
        {
    editing ? (

        <div className="mt-6 flex gap-4">

            <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
                Save Changes
            </button>

            <button
                onClick={() => setEditing(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
                Cancel
            </button>

        </div>

    ) : (

        <button
            onClick={() => setEditing(true)}
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
            Edit Profile
        </button>

    )
}
  </div>
  );
};

export default Profile;