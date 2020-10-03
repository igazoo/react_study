import React from 'react';


export default class ListItem extends React.Component {

    onChangeChackBox(event) {
        //console.log('onChangeChackBox');
        this.props.completeTodo(event.target.value);
    }

    onClickDeleteButton(event) {
        this.props.deleteTodo(this.props.data.id);
    }

    render() {
        return (
            //親コンポーネントから渡されたプロパティを使うには
            //propsというオブジェクトの中に親から渡されたプロパティの名前がキーとなり
            //このことで親からのデータを使うことができる
            <li className="todo-item">
                <input type="checkbox"
                    value={this.props.data.id}
                    onChange={this.onChangeChackBox.bind(this)}
                />
                {this.props.data.label}

                <button
                    className="delete-button"
                    onClick={this.onClickDeleteButton.bind(this)}
                >削除</button>
            </li>
        )
    }
}