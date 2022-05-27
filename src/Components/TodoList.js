import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { 
    Card,
    Modal,
    Button,
    Form,
    FormControl,
   } from 'react-bootstrap';
import moment from 'moment';

let filteredToDo = [{
    id : 0,
    title : "",
    description : "",
    status : 0,
    createdAt : ""
}]

function ToDoList(props) {
    const dispatch = useDispatch()
    const MainRedu = useSelector(state => state.MainRedu)
    const [todoModalShow, setTodoModalShow] = useState(false);
    const [titleTodo, setTitleTodo] = useState("");
    const [descToDo, setDescToDo] = useState("");
    const [indexToDo, setindexToDo] = useState(0);
    const [indexToDoStatus, setindexToDoStatus] = useState(-1);
    const handleClose = () => setTodoModalShow(false);
    const handleShow = () => setTodoModalShow(true);

    const todoListData = () => {
        let filterToDo = MainRedu.toDoList.filter(val => props.status === 0 ? val.status === 0 : val.status === 1)
        filterToDo.sort((a, b) => {
            let keyA = new Date(a.createdAt)
            let keyB = new Date(b.createdAt)
            if (props.status === 0) {
                return keyA < keyB ? -1 : 1
            } else {
                return keyA > keyB ? -1 : 1
            }
        })
        filteredToDo = filterToDo
        return filterToDo.map((val, ind) => {
          return (
            <Card key={ind} className="mb-2" onClick={() => selectedTodoCard(ind)}>
              <Card.Body>
                <Card.Title>{val.title}</Card.Title>
                <Card.Text>{moment(val.createdAt).format("DD MMM YYYY, HH:mm")}</Card.Text>
              </Card.Body>
            </Card>
          )
        })
    }

    const selectedTodoCard = (ind) => {
        setindexToDo(ind)
        handleShow()
    }

    const saveChanges = () => {
        let changedData = [...filteredToDo]
        changedData[indexToDo].title = titleTodo !== "" ? titleTodo : changedData[indexToDo].title
        changedData[indexToDo].description = descToDo !== "" ? descToDo : changedData[indexToDo].description
        changedData[indexToDo].status = indexToDoStatus !== -1 ? indexToDoStatus : changedData[indexToDo].status

        let getRootData = [...MainRedu.toDoList]
        for (let index = 0; index < getRootData.length; index++) {
            if (getRootData[index].id === changedData[indexToDo].id) {
                getRootData[index] = changedData[indexToDo]
            }
        }

        dispatch({ type: 'TODOLIST', payload: getRootData })
        setTitleTodo("")
        setDescToDo("")
        setindexToDoStatus(-1)
        handleClose()
    }

    const deleteToDo = () => {
        let changedData = [...filteredToDo]
        let getRootData = [...MainRedu.toDoList]
        for (let index = 0; index < getRootData.length; index++) {
            if (getRootData[index].id === changedData[indexToDo].id) {
                getRootData.splice(index, 1)
            }
        }

        dispatch({ type: 'TODOLIST', payload: getRootData })
        handleClose()
    }

    const todoListModal = () => {
        if (todoModalShow) {
            return (
                <Modal show={todoModalShow} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>To Do</Modal.Title>
                    </Modal.Header>
    
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Title</Form.Label>
                            <FormControl
                                    type="search"
                                    placeholder="Title"
                                    className="me-2"
                                    aria-label="Title"
                                    onChange={(e) => setTitleTodo(e.target.value)}
                                    defaultValue={filteredToDo[indexToDo].title}
                                />
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Description</Form.Label>
                            <FormControl
                                type="search"
                                placeholder="Description"
                                className="me-2"
                                aria-label="Description"
                                onChange={(e) => setDescToDo(e.target.value)}
                                defaultValue={filteredToDo[indexToDo].description}
                            />
                        </Form.Group>
    
                        <Form>
                            {['radio'].map((type, ind) => (
                                <div key={ind} className="mb-3">
                                    <Form.Check 
                                        type={type}
                                        name="group1"
                                        id={`default-${type}`}
                                        label={`On Progress`}
                                        defaultChecked={filteredToDo[indexToDo].status === 0 ? true : false}
                                        onChange={() => setindexToDoStatus(0)}
                                    />
    
                                    <Form.Check 
                                        type={type}
                                        name="group1"
                                        id={`default-${type}`}
                                        label={`Done`}
                                        defaultChecked={filteredToDo[indexToDo].status === 1 ? true : false}
                                        onChange={() => setindexToDoStatus(1)}
                                    />
                                </div>
                            ))}
                        </Form>
                    </Modal.Body>
    
                    <Modal.Footer>
                        {
                            props.status === 0 ?
                            <Button variant="danger" onClick={() => deleteToDo()}>
                                Delete
                            </Button>
                            :null
                        }
                        <Button variant="primary" onClick={() => saveChanges()}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            )
        } else {
            return <></>
        }
    }

    return (
        <>
            {todoListData()}
            {todoListModal()}
        </>
    )
}

export default ToDoList;