function StudentForm({
    showAddForm,
    setShowAddForm,
    newStudent,
    setNewStudent,
    handleCreateStudent,
}) {

    if (!showAddForm) return null;

    return (
        <div className="mb-8 p-6 border rounded-lg shadow bg-white">

            <h2 className="text-2xl font-semibold mb-4">
                + Add Student
            </h2>

            <div className="grid grid-cols-2 gap-4">

                <input
                    type="text"
                    placeholder="Name"
                    value={newStudent.name}
                    onChange={(e) =>
                        setNewStudent({
                            ...newStudent,
                            name: e.target.value,
                        })
                    }
                    className="border p-2 rounded"
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={newStudent.email}
                    onChange={(e) =>
                        setNewStudent({
                            ...newStudent,
                            email: e.target.value,
                        })
                    }
                    className="border p-2 rounded"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={newStudent.password}
                    onChange={(e) =>
                        setNewStudent({
                            ...newStudent,
                            password: e.target.value,
                        })
                    }
                    className="border p-2 rounded"
                />

                <input
                    type="text"
                    placeholder="Department"
                    value={newStudent.department}
                    onChange={(e) =>
                        setNewStudent({
                            ...newStudent,
                            department: e.target.value,
                        })
                    }
                    className="border p-2 rounded"
                />

                <input
                    type="number"
                    placeholder="Semester"
                    value={newStudent.semester}
                    onChange={(e) =>
                        setNewStudent({
                            ...newStudent,
                            semester: e.target.value,
                        })
                    }
                    className="border p-2 rounded"
                />

                <input
                    type="text"
                    placeholder="Discord ID"
                    value={newStudent.discordId}
                    onChange={(e) =>
                        setNewStudent({
                            ...newStudent,
                            discordId: e.target.value,
                        })
                    }
                    className="border p-2 rounded"
                />

            </div>

            <div className="mt-6 space-x-3">

                <button
                    onClick={handleCreateStudent}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Create Student
                </button>

                <button
                    onClick={() => setShowAddForm(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                    Cancel
                </button>

            </div>

        </div>
    );
}

export default StudentForm;