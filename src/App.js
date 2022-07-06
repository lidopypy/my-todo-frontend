import InputTodo from "./containers/inputTodo";
import ShowTodo from "./containers/showTodo";
import CountTodo from "./containers/countTodo";
import CountDoneTodo from "./containers/countDoneTodo";
import ShowDoneTodo from "./containers/showDoneTodo";
import "./App.css";

function App(props) {
  return (
    <div>
      <div className="toDoCheck">
        <InputTodo />
        <ShowTodo />
        <CountTodo />
      </div>
      <div className="doneToDoCheck">
        <ShowDoneTodo />
        <CountDoneTodo />
      </div>
    </div>
  );
}

export default App;
