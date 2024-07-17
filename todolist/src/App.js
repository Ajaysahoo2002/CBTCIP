import './App.css';
import { useEffect, useState } from "react"
function App() {
  const [input, setInput] = useState("")
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]); // new state for completed tasks


  useEffect(() => {
    displayAllLists();
  }, [])

  const displayAllLists = () => {
    const storedData = localStorage.getItem("todos");
    const getCompletedTaskLists = localStorage.getItem("completedTask");
    // console.log(JSON.parse(getCompletedTaskLists));
    if (storedData || getCompletedTaskLists) {
      setTasks(JSON.parse(storedData));
      setCompletedTasks(JSON.parse(getCompletedTaskLists));
    }
  }

  const addList = (e) => {
    e.preventDefault();
    const taskObj = {
      id: Date.now(),
      task: input,
      status: false,
      createdAt: new Date().toLocaleString()
    }
    setTasks([...tasks, taskObj]);
    localStorage.setItem("todos", JSON.stringify([...tasks, taskObj]));
    setInput('');
  }

  const taskCompleted = (id) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      task.status = true;
      task.createdAt = new Date().toLocaleString();
      setCompletedTasks([...completedTasks, task]);
      localStorage.setItem("completedTask", JSON.stringify([...completedTasks, task]));
      setTasks(tasks.filter((task) => task.id !== id));
      localStorage.setItem("todos", JSON.stringify(tasks.filter((task) => task.id !== id)));
    }
  }


  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => { return task.id !== id; });
    localStorage.setItem("todos", JSON.stringify(updatedTasks));
    alert("you successfully delete an item");
    displayAllLists();
  }
  const deleteCompletedtask = (id) => {
    const updatedTasksStatusData = completedTasks.filter((task) => { return task.id !== id; });
    localStorage.setItem("completedTask", JSON.stringify(updatedTasksStatusData));
    alert("you successfully delete an item");
    displayAllLists();
  }

  const clearAllData = () => {
    localStorage.clear();
    setTasks([]);
    setCompletedTasks([]);
    alert("All data cleared successfully");
    displayAllLists();
  }

  return (
    <div className="appContainer">
      <div className="top"></div>
      <div className="bottom"></div>
      <div className="mainContainer">
        <div className="topSection">
          <h1>TODO LIST</h1>
          <div className="inputField">
            <form>
              <input type="text" name="input" value={input} onChange={(e) => { setInput(e.target.value) }} id="input" placeholder="type your todo list here..." autoComplete='off' />
              <button type="button" onClick={addList} title='add item'>ADD</button>
            </form>
          </div>
        </div>
        <div className="bottomSection">
          <div className="lists">
            <div className="listHeader">
              <h1>LISTS OF THE WORKS TO-DO :</h1>
              <h6 style={{ textAlign: "center", textTransform: "capitalize" }}>click to mark task as completed</h6>
            </div>
            {
              tasks ? <>{
                tasks.map((elem, index) => {
                  return (
                    <div className="elementLists" key={index} onClick={() => { taskCompleted(elem.id) }} title='click to mark task as completed'>
                      <p style={{ textTransform: "capitalize" }}>{elem.task}</p>
                      <p>{elem.createdAt}</p>
                      <div className="actionIcons">
                        <button onClick={() => { deleteTask(elem.id) }} title='delete'>Delete</button>
                      </div>
                    </div>
                  )
                })
              }</> : <p>data not available</p>
            }
          </div>
          <div className="completedLists">
            <h1>COMPLETED TASKS :</h1>
            {
              completedTasks && <>{
                completedTasks.map((elem, index) => {
                  return (
                    <div className={elem.status ? "completetask " : "elementLists"} key={index}>
                      <p style={{ textTransform: "capitalize" }}>{elem.task} {elem.status ? <span style={{ color: "green", fontWeight: 'bolder' }}>Task Completed</span> : <span>Incompleted</span>}</p>
                      <p>{elem.createdAt}</p>
                      <div className="actionIcons">
                        <button onClick={() => { deleteCompletedtask(elem.id) }} title='delete' >Delete</button>
                      </div>
                    </div>
                  )
                })
              }</>
            }
          </div>
        </div>
        <div className="clearButton" style={{ marginTop: "2rem" }}>
          <button onClick={clearAllData} title='clear'>Clear</button>
        </div>
      </div>
    </div>
  );
}

export default App;
