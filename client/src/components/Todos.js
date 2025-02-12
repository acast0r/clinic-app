import React, {useState, useEffect, useContext} from 'react';
import TodoItem from './TodoItem';
import TodoService from '../Services/TodoService';
import {AuthContext} from '../Context/AuthContext';
import Message from './Message';


const Todos = props => {
    const {user} = useContext(AuthContext);
    const [todo, setTodo] = useState({name: ""});
    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        TodoService.getTodos().then(data => {
            setTodos(data.todos)
        })
    }, [])

    const onSubmit = e => {
        e.preventDefault();
        TodoService.createTodo(todo).then(data => {
            const {message} = data;
            resetForm();
            if(!message.msgError){
                TodoService.getTodos().then(data => {
                    setTodos(data.todos);
                    setMessage(message);
                })
            }else if(message.msgBody === "Unauthorized"){
                setMessage(message);
                authContext.setUser({username: "", role: ""});
                authContext.setIsAuthenticated(false)
            }else{
                setMessage(message);
            }
        })
    }

    const onChange = e => {
        setTodo({name: e.target.value});
    }

    const resetForm = () => {
        setTodo({name: ""});
    }

    return (
        <div>
            <ul className="list-group">
                {
                    todos.map(todo => {
                        return <TodoItem key={todo._id} todo={todo}/>
                    })
                }
            </ul>
            <br/>
             <form onSubmit={onSubmit}>
                <label htmlFor="todo">Enter Todo</label>
                <input type="text" 
                       name="todo" 
                       value={todo.name} 
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Please Enter Todo"/>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
             </form>
             {message ? <Message message={message}/> : null}
        </div>
    )
}

export default Todos;
