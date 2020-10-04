import React from 'react';
import Header from './header';
import Footer from './footer';
import ListItem from './listItem';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

export default class MainArea extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: [
                { id: "0", label: "todo1", completed: false },
                { id: "1", label: "todo2", completed: false },
                { id: "2", label: "todo3", completed: false }
            ],
            todoInputValue: ""
        }
    }

    onChangeInput(event) {
        this.setState({ todoInputValue: event.target.value });
    }

    onClickTodo(event) {
        let addItem = { label: this.state.todoInputValue };
        let todos = this.state.todos.slice();//配列のコピー

        todos.push(addItem);
        this.setState({
            todos: todos,
            todoInputValue: ""
        })

    }

    onCompleteTodo(id) {
        //console.log("onCompleteTodo", data);
        let _state = Object.assign({}, this.state);

        for (var i = 0; i < _state.todos.length; i++) {
            if (_state.todos[i].id === id) {
                _state.todos[i].completed = true;
                break;
            }
        }
        this.setState(_state);
    }

    onDeleteTodo(id) {
        let _state = Object.assign({}, this.state);//stateのコピー作成
        for (var i = 0; i < _state.todos.length; i++) {
            if (_state.todos[i].id === id) {
                _state.todos.splice(i, 1);//i番目の要素を1つ切り取る
                break;
            }
        }
        this.setState(_state);//新しいstateを本物のstateに保存
    }


    renderTodoItems() {
        let todoItemDom = [];

        for (var i = 0; i < this.state.todos.length; i++) {
            if (!this.state.todos[i].completed) {
                let todoItem = <ListItem
                    key={"item-" + i}
                    data={this.state.todos[i]}
                    completeTodo={this.onCompleteTodo.bind(this)}
                    deleteTodo={this.onDeleteTodo.bind(this)}
                />;
                todoItemDom.push(todoItem);
            }
        }
        return todoItemDom;
    }

    render() {
        return (
            <div className="main-area">
                <Header />
                <main className="list-area">
                    <div className="todo-input-area">
                        <input type="text" className="todo-input" placeholder="Todoを追加"
                            value={this.state.todoInputValue}
                            onChange={this.onChangeInput.bind(this)} />
                        <button className="add-button" onClick={this.onClickTodo.bind(this)} >登録</button>
                    </div>
                    <ul className="todo-list">
                        {this.renderTodoItems()}

                    </ul>
                </main>
                <Footer />
            </div>
        )
    }
}
