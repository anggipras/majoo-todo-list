import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { 
    Form,
    FormControl,
    Button
   } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

function AddToDo() {
    const dispatch = useDispatch()
    const MainRedu = useSelector(state => state.MainRedu)
    const [ todoInput, setTodoInput] = useState('')

    const getInput = (e) => {
        if (e.target.value !== "") {
            setTodoInput(e.target.value)
        }
    }

    const addNewTodo = () => {
        let reduxData = []
        reduxData = MainRedu.toDoList
        reduxData.push({
            id : reduxData[reduxData.length-1].id + 1,
            title : todoInput,
            description : "lorem ipsum",
            status : 0,
            createdAt : moment(Date.now()).format("YYYY-MM-DD HH:mm")
        })
        dispatch({ type: 'TODOLIST', payload: reduxData })
        setTodoInput("")
    }
    
    return (
        <Form className="d-flex mb-2">
          <FormControl
            type="search"
            placeholder="Add Todo List"
            className="me-2"
            aria-label="Add Todo List"
            onChange={(e) => getInput(e)}
            value={todoInput}
          />
          <Button variant="outline-success" onClick={() => addNewTodo()}>Add</Button>
        </Form>
    )
}

export default AddToDo;