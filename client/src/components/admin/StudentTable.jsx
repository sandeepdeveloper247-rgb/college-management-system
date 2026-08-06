function StudentTable({
  sortedStudents,
  sortField,
  sortOrder,
  handleSort,
  editingStudent,
  setEditingStudent,
  handleEdit,
  handleSave,
  handleDelete,
}) {
  return (
    <table className="min-w-full">
      <thead className="bg-slate-100">
        <tr>
          <th
            onClick={() => handleSort("name")}
            className="cursor-pointer px-6 py-3 text-left"
          >
            Name{" "}
            {sortField === "name"
              ? sortOrder === "asc"
                ? "↑"
                : "↓"
              : ""}
          </th>

          <th className="px-6 py-3 text-left">
            Email
          </th>

          <th className="px-6 py-3 text-left">
            Department
          </th>

          <th
            onClick={() => handleSort("semester")}
            className="cursor-pointer px-6 py-3 text-left"
          >
            Semester{" "}
            {sortField === "semester"
              ? sortOrder === "asc"
                ? "↑"
                : "↓"
              : ""}
          </th>

          <th className="px-6 py-3 text-left">
            Action
          </th>
        </tr>
      </thead>

      <tbody>
        {sortedStudents.length > 0 ? (
          sortedStudents.map((student) => (
            <tr
              key={student._id}
              className="border-t hover:bg-slate-50"
            >
              <td className="px-6 py-4">
                {editingStudent?._id === student._id ? (
                  <input
                    type="text"
                    value={editingStudent.name}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        name: e.target.value,
                      })
                    }
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : (
                  student.name
                )}
              </td>

              <td className="px-6 py-4">
                {student.email}
              </td>

              <td className="px-6 py-4">
                {editingStudent?._id === student._id ? (
                  <input
                    type="text"
                    value={editingStudent.department}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        department: e.target.value,
                      })
                    }
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : (
                  student.department
                )}
              </td>

              <td className="px-6 py-4">
                {editingStudent?._id === student._id ? (
                  <input
                    type="number"
                    value={editingStudent.semester}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        semester: e.target.value,
                      })
                    }
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : (
                  student.semester
                )}
              </td>

              <td className="px-6 py-4 space-x-2">
                {editingStudent?._id === student._id ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Save
                    </button>

                    <button
                      onClick={() => setEditingStudent(null)}
                      className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(student)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(student._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="5"
              className="text-center py-8 text-gray-500"
            >
              No students found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default StudentTable;