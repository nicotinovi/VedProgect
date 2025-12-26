import React, { useState } from 'react';
import http from "../../../http-common";
import { Navigate } from 'react-router-dom';

function AddDiscipline() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: name
    };
    http
      .post("/addDiscipline", data)
      .then(() => {
        setSubmitted(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    !submitted ? (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Наименование дисциплины"
          onChange={handleChange}
        />
        <input type="submit" value="Добавить" />
      </form>
    ) : (
      <Navigate to="/listDisciplines" />
    )
  );
}

export default AddDiscipline;