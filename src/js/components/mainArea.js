import React from 'react';
import Header from './header';
import Footer from './footer';
import ListItem from './listItem';

export default class MainArea extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: [
                {
                    id: "1",
                    label: "Todo1",
                    completed: false
                },
                {
                    id: "2",
                    label: "Todo2",
                    completed: false
                },
            ],
            todoInputValue: ""
        }
    }

    onChangeTodoInput(event) {//inputのvalueをstateのtodoInputValueに値を変化させるイベントメソッド
        //console.log('onChangeTodoInput', event.target.value);
        this.setState({ todoInputValue: event.target.value })
    }

    onClickAddButton(event) {//登録ボタンが押された時に動くイベントメソッド
        //登録が押されたらstateのtodoInputValueを呼び出し、stateの配列todosに代入する
        //console.log('onClickAddButton');

        let addItem = { label: this.state.todoInputValue };
        let todos = this.state.todos.slice();//コピー
        todos.push(addItem);//配列に代入


        this.setState({
            todos: todos,
            todoInputValue: ""
        });//setStateで保存
    }

    onCompleteTodo(id) {
        console.log('onCompleteTodo', id);
        let _state = Object.assign({}, this.state);//stateのコピー
        for (var i = 0; i < _state.todos.length; i++) {
            if (_state.todos[i].id === id) {
                _state.todos[i].completed = true;
                break;
            }
        }
        this.setState(_state);//stateの値を更新
    }

    onDeleteTodo(id) {
        let _state = Object.assign({}, this.state);//stateのコピー
        for (var i = 0; i < _state.todos.length; i++) {
            if (_state.todos[i].id === id) {
                _state.todos.splice(i, 1);
                break;
            }
        }
        this.setState(_state);//stateの値を更新
    }

    renderTodoItems() {//結果の出力
        let todoItemDom = [];
        for (var i = 0; i < this.state.todos.length; i++) {
            if (!this.state.todos[i].completed) {
                //親コンポーネントから子コンポーネントに値を渡す時,
                //componentのプロパティとして値を渡す
                //今回はdataという名前のプロパティを作っている
                let todoItem = <ListItem key={"item-" + i}
                    data={this.state.todos[i]}//プロパティ作成
                    completeTodo={this.onCompleteTodo.bind(this)}
                    deleteTodo={this.onDeleteTodo.bind(this)}
                />
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
                            value={this.state.todoInputValue} onChange={this.onChangeTodoInput.bind(this)}
                        />
                        <button className="add-button"
                            onClick={this.onClickAddButton.bind(this)}
                        >登録</button>
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