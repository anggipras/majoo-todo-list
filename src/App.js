import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  Navbar,
  Container,
  Tabs,
  Tab,
 } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddToDo from './Components/AddTodo'
import ToDoList from './Components/TodoList';

function App() {
  const dispatch = useDispatch()
  const MainRedu = useSelector(state => state.MainRedu)
  const [tabKey, setTabKey] = useState('progress');

  useEffect(() => {
    axios.get(`https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list`)
    .then((res) => {
      dispatch({ type: 'TODOLIST', payload: res.data })
    }).catch(err => console.log(err))
  }, [])

  return (
    <>
      <Navbar sticky='top' bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand>Majoo Todo List</Navbar.Brand>
          <Navbar.Toggle />
        </Container>
      </Navbar>

      <div style={{ margin: '30px' }}>
        <Tabs
          id="controlled-tab-example"
          activeKey={tabKey}
          onSelect={(k) => setTabKey(k)}
          className="mb-3"
        >
          <Tab eventKey="progress" title="Progress">
            <AddToDo />
            <ToDoList status={0} />
          </Tab>
          <Tab eventKey="done" title="Done">
            <ToDoList status={1} />
          </Tab>
        </Tabs>
      </div>
    </>
  );
}

export default App;
