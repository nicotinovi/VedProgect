import React, { useState, useEffect } from 'react';
import axios from "../../../config/axios";
import { Navigate, useParams, Link } from 'react-router-dom';

function StudentData() {
    const { id } = useParams();
    const [student, setStudent] = useState({ name: "", student_group_id: "" });
    const [groups, setGroups] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        // 1. Получаем данные студента
        axios.get("/student/" + id)
            .then(res => {
                setStudent(res.data);
            })
            .catch(e => console.log(e));

        // 2. Получаем список групп для селекта
        axios.get("/listStudentGroups")
            .then(res => setGroups(res.data))
            .catch(e => console.log(e));
    }, [id]);

    const handleUpdate = (event) => {
        event.preventDefault();
        axios.post("/updateStudent/" + id, {
            name: student.name,
            student_group_id: student.student_group_id
        })
        .then(() => setSubmitted(true))
        .catch(e => console.log(e));
    };

    const handleDelete = () => {
        if(window.confirm("Удалить студента?")) {
            axios.post("/deleteStudent/" + id)
                .then(() => setSubmitted(true))
                .catch(e => console.log(e));
        }
    };

    if (submitted) return <Navigate to="/listStudents" />;

    return (
        <div className="edit-form">
            <h2>Редактирование студента</h2>
            <form onSubmit={handleUpdate}>
                <input 
                    type="text" 
                    value={student.name || ""} 
                    placeholder="ФИО"
                    onChange={(e) => setStudent({ ...student, name: e.target.value })}
                />
                
                <div style={{ margin: "10px 0" }}>
                    <label style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Группа:</label>
                    <select 
                        value={student.student_group_id || ""} 
                        onChange={(e) => setStudent({ ...student, student_group_id: e.target.value })}
                    >
                        <option value="">Без группы</option>
                        {groups.map(g => (
                            <option key={g.id} value={g.id}>{g.name}</option>
                        ))}
                    </select>
                </div>

                <div className="action-buttons">
                    <button type="button" onClick={handleDelete} style={{backgroundColor: '#8b2e2e'}}>Удалить</button>
                    <button type="submit">Сохранить</button>
                </div>
            </form>
            <div style={{marginTop: '20px'}}>
                 <Link to="/listStudents">← Назад к списку</Link>
            </div>
        </div>
    );
}

export default StudentData;