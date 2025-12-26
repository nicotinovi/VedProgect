import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "../../../config/axios";

function ListTeachers() {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        axios.get("/listTeachers")
            .then(res => setTeachers(res.data))
            .catch(e => console.log(e));
    }, []);

    return (
        <div>
            <h2>Преподаватели</h2>
            <Link to="/addTeacher">
                <button>+ Добавить преподавателя</button>
            </Link>
            
            <div className="list-grid">
                {teachers.length > 0 ? (
                    teachers.map((teacher) => (
                        <Link to={`/teacher/${teacher.id}`} key={teacher.id} className="card-item">
                            <div>
                                <h3>{teacher.name}</h3>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p style={{gridColumn: "1 / -1"}}>Список пуст...</p>
                )}
            </div>
        </div>
    );
}

export default ListTeachers;