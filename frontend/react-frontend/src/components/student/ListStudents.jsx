import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "../../../config/axios";

function ListStudents() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get("/listStudents")
            .then(response => {
                setStudents(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    return (
        <div>
            <h2>Студенты</h2>
            <Link to="/addStudent">
                <button>+ Добавить студента</button>
            </Link>
            
            <div className="list-grid">
                {students.length > 0 ? (
                    students.map((student) => (
                        <Link to={`/student/${student.id}`} key={student.id} className="card-item">
                            <div>
                                <h3>{student.name}</h3>
                                {/* Выводим название группы, если оно есть */}
                                <p style={{ color: '#aaa' }}>
                                    Группа: {student.student_group ? student.student_group.name : "Нет группы"}
                                </p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p style={{gridColumn: "1 / -1"}}>Список студентов пуст...</p>
                )}
            </div>
        </div>
    );
}

export default ListStudents;