import { useState, useEffect } from "react";
import "./App.css";

/* ============================
    COMPONENT: TodoInput
   ============================ */
function TodoInput({ addTask, editTask, editingId, setEditingId, tasks }) {
  const [text, setText] = useState("");

  // Khi người dùng bấm "Sửa", tự động đưa text vào ô input
  useEffect(() => {
    if (editingId) {
      const task = tasks.find((t) => t.id === editingId);
      setText(task.text);
    }
  }, [editingId]);

  function handleSubmit() {
    if (text.trim() === "") return;

    if (editingId) {
      editTask(editingId, text);
      setEditingId(null);
    } else {
      addTask(text);
    }

    setText("");
  }

  return (
    <div className="input-area">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Nhập công việc..."
      />

      <button onClick={handleSubmit}>
        {editingId ? "Lưu" : "Thêm"}
      </button>

      {editingId && (
        <button onClick={() => setEditingId(null)}>Hủy</button>
      )}
    </div>
  );
}

/* ============================
    COMPONENT: TodoItem
   ============================ */
function TodoItem({ task, deleteTask, setEditingId }) {
  return (
    <li>
      <span>{task.text}</span>

      <div className="actions">
        <button onClick={() => setEditingId(task.id)}>Sửa</button>
        <button onClick={() => deleteTask(task.id)}>Xóa</button>
      </div>
    </li>
  );
}

/* ============================
    COMPONENT: TodoList
   ============================ */
function TodoList({ tasks, deleteTask, setEditingId }) {
  return (
    <ul className="list">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          setEditingId={setEditingId}
        />
      ))}
    </ul>
  );
}

/* ============================
    COMPONENT: App (cha)
   ============================ */
export default function App() {
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Thêm task
  function addTask(text) {
    const newTask = {
      id: Date.now(),
      text,
    };
    setTasks([...tasks, newTask]);
  }

  // Xóa task
  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  // Lưu task sau khi sửa
  function editTask(id, newText) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  }

  return (
    <div className="container">
      <h1>Todo List - CRUD</h1>

      <TodoInput
        addTask={addTask}
        editTask={editTask}
        editingId={editingId}
        setEditingId={setEditingId}
        tasks={tasks}
      />

      <TodoList
        tasks={tasks}
        deleteTask={deleteTask}
        setEditingId={setEditingId}
      />
    </div>
  );
}
