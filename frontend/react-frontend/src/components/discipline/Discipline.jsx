import React from 'react';

class Discipline extends React.Component {
    render() {
        return (
                <div id={this.props.id} style={this.props.style ? this.props.style : { color: "blue" }}>
                    <div>{this.props.content}</div>
                    <div>{this.props.children}</div>
                </div>
        )
    }
}

export default Discipline;