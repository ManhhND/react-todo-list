import { BrowserRouter } from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import TaskList from "./components/TaskList";

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Header />
        <TaskList />
      </BrowserRouter>
    </>
  )
}

export default App
