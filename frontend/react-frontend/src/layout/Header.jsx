import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    render() {
        return (
            <nav>
                <Link to={`/listDisciplines`}>Список дисциплин</Link>
            </nav>
        );
    }
}
export default Header;