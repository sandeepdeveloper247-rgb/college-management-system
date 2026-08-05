import { useEffect,useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import api from "../services/api";

function Students(){
  const[students,setStudents]=useState([]);
  const[loading,setLoading]=useState(true);
  useEffect(()=>{
    async function fetchStudents(){
      try{
        const response=await api.get("/admin/students");
        // console.log(response.data);
        setStudents(response.data);
        setLoading(false);
      }catch(error){
        console.error(error);
      }
    }
    fetchStudents();
  },[]);

  if(loading){
    return(
      <DashboardLayout>
        <h1 className="text-2xl">Loading...</h1>
      </DashboardLayout>
    );
  }
  async function handleDelete(id){
    const confirmDelete=window.confirm(
      "Are you sure you want to delete this student?"
    );
    if(!confirmDelete) return;

    try{
      await api.delete(`/admin/students/${id}`);
      setStudents((prevStudents)=>
        prevStudents.filter((student)=>student._id!==id)
      );
      alert("Student deleted successfully!");
    }catch(error){
      console.error(error);
      alert("Failed to delete student.");
    }
  }
return (
    <DashboardLayout>

        <h1 className="text-3xl font-bold mb-6">
            Students
        </h1>

        <div className="bg-white rounded-xl shadow overflow-hidden">

            <table className="min-w-full">

                <thead className="bg-slate-100">

                    <tr>

                        <th className="px-6 py-3 text-left">
                            Name
                        </th>

                        <th className="px-6 py-3 text-left">
                            Email
                        </th>

                        <th className="px-6 py-3 text-left">
                            Department
                        </th>

                        <th className="px-6 py-3 text-left">
                            Semester
                        </th>
                        <th className="px-6 py-3 text-left">
                            Action
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {students.map((student) => (

                        <tr
                            key={student._id}
                            className="border-t hover:bg-slate-50"
                        >

                            <td className="px-6 py-4">
                                {student.name}
                            </td>

                            <td className="px-6 py-4">
                                {student.email}
                            </td>

                            <td className="px-6 py-4">
                                {student.department}
                            </td>

                            <td className="px-6 py-4">
                                {student.semester}
                            </td>
                            <td className="px-6 py-4">
                              <button
                              onClick={() => handleDelete(student._id)}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                                Delete
                              </button>
                            </td>
                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    </DashboardLayout>
);
}

export default Students;