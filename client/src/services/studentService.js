import api from "./api";

export const getStudents=()=>api.get("/admin/students");

export const createStudent = (studentData) =>
    api.post("/admin/students", studentData);

export const updateStudent = (id, studentData) =>
    api.put(`/admin/students/${id}`, studentData);

export const deleteStudent = (id) =>
    api.delete(`/admin/students/${id}`);