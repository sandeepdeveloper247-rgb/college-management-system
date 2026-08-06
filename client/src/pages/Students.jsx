import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../services/studentService";
import StudentForm from "../components/admin/StudentForm";
import StudentTable from "../components/admin/StudentTable";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    semester: "",
    discordId: "",
  });
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [semesterFilter, setSemesterFilter] = useState("All");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      student.name.toLowerCase().includes(searchText) ||
      student.email.toLowerCase().includes(searchText);

    const matchesDepartment =
      departmentFilter === "All" || student.department === departmentFilter;

    const matchesSemester =
      semesterFilter === "All" ||
      student.semester.toString() === semesterFilter;
    return matchesSearch && matchesDepartment && matchesSemester;
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (!sortField) return 0;

    if (sortField === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }

    if (sortField === "semester") {
      return sortOrder === "asc"
        ? a.semester - b.semester
        : b.semester - a.semester;
    }

    return 0;
  });
  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await getStudents();
        // console.log(response.data);
        setStudents(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchStudents();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <h1 className="text-2xl">Loading...</h1>
      </DashboardLayout>
    );
  }
  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?",
    );
    if (!confirmDelete) return;

    try {
      await deleteStudent(id);
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student._id !== id),
      );
      alert("Student deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete student.");
    }
  }

  function handleEdit(student) {
    setEditingStudent({ ...student });
  }
  async function handleSave() {
    try {
      const response = await updateStudent(editingStudent._id, {
        name: editingStudent.name,
        department: editingStudent.department,
        semester: editingStudent.semester,
        discordId: editingStudent.discordId,
      });
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student._id === editingStudent._id ? response.data.student : student,
        ),
      );
      setEditingStudent(null);
      alert("Student updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update student.");
    }
  }

  async function handleCreateStudent() {
    try {
      const response = await createStudent(newStudent);

      setStudents((prevStudents) => [...prevStudents, response.data.student]);

      setNewStudent({
        name: "",
        email: "",
        password: "",
        department: "",
        semester: "",
        discordId: "",
      });

      setShowAddForm(false);

      alert("Student created successfully!");
    } catch (error) {
      console.error(error);

      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Failed to create student.");
      }
    }
  }
  function handleSort(field) {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  }
  console.log(showAddForm);
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Students</h1>
      <button
        onClick={() => setShowAddForm(true)}
        className="mb-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        + Add Student
      </button>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 border rounded px-4 py-2"
        />
      </div>
      <div className="mb-6 flex gap-4">
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="border rounded px-4 py-2"
        >
          <option value="All">All Departments</option>
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
          <option value="ECE">ECE</option>
          <option value="ME">ME</option>
        </select>

        <select
          value={semesterFilter}
          onChange={(e) => setSemesterFilter(e.target.value)}
          className="border rounded px-4 py-2"
        >
          <option value="All">All Semesters</option>

          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
      </div>
      <StudentForm
        showAddForm={showAddForm}
        setShowAddForm={setShowAddForm}
        newStudent={newStudent}
        setNewStudent={setNewStudent}
        handleCreateStudent={handleCreateStudent}
      />
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <StudentTable
          sortedStudents={sortedStudents}
          sortField={sortField}
          sortOrder={sortOrder}
          handleSort={handleSort}
          editingStudent={editingStudent}
          setEditingStudent={setEditingStudent}
          handleEdit={handleEdit}
          handleSave={handleSave}
          handleDelete={handleDelete}
        />
      </div>
    </DashboardLayout>
  );
}

export default Students;
