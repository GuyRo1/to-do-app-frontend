import ToDoList from './components/ToDoList/ToDoList'
import ListContextProvider from './context/ListContext'

function App() {
  return (
    <ListContextProvider>
      <ToDoList />
    </ListContextProvider>
  );
}

export default App;
