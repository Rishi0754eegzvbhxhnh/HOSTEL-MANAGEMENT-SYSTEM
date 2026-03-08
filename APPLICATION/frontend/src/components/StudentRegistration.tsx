import React, { useState } from "react";

interface Student {
    name: string;
    email: string;
    course: string;
}

const StudentRegistration: React.FC = () => {
    const [student, setStudent] = useState<Student>({
        name: "",
        email: "",
        course: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Registered Student:", student);
        // Later: send to backend API with fetch/axios
        alert(`Student ${student.name} registered successfully!`);
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
            <h2>Student Registration</h2>
            <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={student.name}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={student.email}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="course"
                placeholder="Course"
                value={student.course}
                onChange={handleChange}
                required
            />
            <button type="submit">Register</button>
        </form>
    );
};

export default StudentRegistration;