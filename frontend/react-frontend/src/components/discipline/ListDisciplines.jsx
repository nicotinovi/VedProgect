import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Discipline from './Discipline';
import http from "../../../http-common";

function ListDisciplines() {
    const [disciplines, setDisciplines] = useState([]);

    useEffect(() => {
        http
            .get("/listDisciplines")
            .then(response => {
                setDisciplines(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    return (
        <div>
            <Link to="/addDiscipline">Добавить дисциплину</Link>
            {disciplines.length ? (
                disciplines.map((discipline) => (
                    <Link to={`/discipline/${discipline.id}`} key={discipline.id}>
                        <Discipline id={discipline.id} content={discipline.name} />
                    </Link>
                ))
            ) : (
                "Подождите, идёт загрузка данных"
            )}
        </div>
    );
}

export default ListDisciplines;