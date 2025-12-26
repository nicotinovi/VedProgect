import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ListDisciplines from './components/discipline/ListDisciplines';
import AddDiscipline from './components/discipline/AddDiscipline.jsx'
import Header from './layout/Header'
import DisciplineData from "./components/discipline/DisciplineData.jsx";
import Protected from "./components/auth/ProtectedRoute.jsx";
import Login from "./components/auth/Login.jsx";
import Register from "./components/auth/Register.jsx";

const App = () => {
    return <>
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path='/listDisciplines' element={<Protected><ListDisciplines/></Protected>}/>
                <Route path='/addDiscipline' element={<Protected><AddDiscipline/></Protected>}/>
                <Route path='/discipline/:id' element={<Protected><DisciplineData/></Protected>}/>
            </Routes>
        </BrowserRouter>
    </>
}

export default App