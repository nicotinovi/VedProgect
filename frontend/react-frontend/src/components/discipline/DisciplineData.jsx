import React, { useState, useEffect }  from 'react';

import http from "../../../http-common";

import { Navigate, useParams } from 'react-router-dom';

function DisciplineData() {

    // useParams позволяет получить параметры из url
    const { id } = useParams();
    // Объявление состояния
    // discipline хранит состояние (имя задаётся разработчиком)
    // setDiscipline позволяет состояние изменять (имя задаётся разработчиком)
    const [discipline, setDiscipline] = useState({ // useState - стандартный метод для определения начального состояния
        id: id, // идентификатор из параметров
        name: "" // имя в начальном состоянии не заполняется
    });

    // Объявление состояния
    const [submitted, setSubmitted] = useState(false);

    // хук useEffect - аналог componentDidMount
    useEffect(() => {
        if (!id) {
            return;
        }

        function getDiscipline() {
            http.get("/discipline/" + id)
                .then(response => {
                    setDiscipline(prevDiscipline => ({
                        ...prevDiscipline,
                        name: response.data.name
                    }));
                })
                .catch(e => {
                    console.log(e);
                });
        }

        getDiscipline();
    }, [id]);


    function handleChange(event) {
        setDiscipline({
            ...discipline, // копируем все свойства объекта
            name: event.target.value // обновляем name
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        var data = {
            name: discipline.name
        };
        http
            .post("/updateDiscipline/" + discipline.id, data)
            .then(() => { // запрос выполнился успешно
                setSubmitted(true);
            })
            .catch(e => { // при выполнении запроса возникли ошибки
                console.log(e);
            });
    }

    function deleteDiscipline() {
        http
            .post("/deleteDiscipline/" + discipline.id)
            .then(() => { // запрос выполнился успешно
                setSubmitted(true);
            })
            .catch(e => { // при выполнении запроса возникли ошибки
                console.log(e);
            });
    }

    return (
        !submitted
            ?
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" value={discipline.name} placeholder="Наименование дисциплины" onChange={handleChange}/>
                    <input type="submit" value="Обновить" />
                </form>
                <button onClick={deleteDiscipline}>Удалить</button>
            </div>
            : <Navigate to="/listDisciplines" /> // автоматически переходим по ссылке
    )
}

export default DisciplineData;