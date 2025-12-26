import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "../../../config/axios"; // Используем настроенный axios с токеном

function ListStudentGroups() {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        axios.get("/listStudentGroups")
            .then(response => {
                setGroups(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    return (
        <div>
            <h2>Группы студентов</h2>
            <Link to="/addStudentGroup">
                <button>+ Добавить группу</button>
            </Link>
            
            <div className="list-grid">
                {groups.length > 0 ? (
                    groups.map((group) => (
                        <Link to={`/studentGroup/${group.id}`} key={group.id} className="card-item">
                            <div>
                                <h3>{group.name}</h3>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p style={{gridColumn: "1 / -1"}}>Список групп пуст или загружается...</p>
                )}
            </div>
        </div>
    );
}

export default ListStudentGroups;