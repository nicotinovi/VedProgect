import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "../../../config/axios"; // ВАЖНО: используем настроенный axios

function ListDisciplines() {
    const [disciplines, setDisciplines] = useState([]);

    useEffect(() => {
        axios.get("/listDisciplines")
            .then(response => {
                setDisciplines(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    return (
        <div>
            <h2>Учебные дисциплины</h2>
            <Link to="/addDiscipline">
                <button>+ Добавить дисциплину</button>
            </Link>
            
            <div className="list-grid">
                {disciplines.length > 0 ? (
                    disciplines.map((discipline) => (
                        <Link to={`/discipline/${discipline.id}`} key={discipline.id} className="card-item">
                            <div>
                                <h3>{discipline.name}</h3>
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

export default ListDisciplines;