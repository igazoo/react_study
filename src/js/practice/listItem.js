import React from 'react';

export default class ListItem extends React.Component {

    onChageCheckBox(event) {
        this.props.completeTodo(event.target.value);
    }

    onClickDeleteButton(event) {
        this.props.deleteTodo(this.props.data.id);
    }

    render() {
        return (
            <li className="todo-item" >
                <input type="checkbox"
                    value={this.props.data.id}
                    onChange={this.onChageCheckBox.bind(this)}

                />
                {this.props.data.label}
                <button className="delete-button"
                    onClick={this.onClickDeleteButton.bind(this)}
                >削除</button>
            </li>

        )
    }
}