import { useEffect, useState } from "react";
import apiRequest from "./apiRequest";

function App() {
  const API_URL = "http://localhost:5000/api/todo";

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoadin] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editTodo, setEditTodo] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_URL}/todos`);
        if (!response.ok) throw Error("Did not recieve expected data");
        const listTodo = await response.json();
        console.log(listTodo.todos);
        setTodos(listTodo.todos);
        setFetchError(null);
      } catch (err) {
        console.log(err);
        setFetchError(err);
      } finally {
        setIsLoadin(false);
      }
    };
    setTimeout(() => {
      (async () => await fetchItems())();
    }, 1000);
  }, []);

  const handleChange = async (id, status) => {
    const updateObject = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: !status }),
    };

    const result = await apiRequest(`${API_URL}/${id}`, updateObject);

    if (result.ok) {
      const listTodo = todos.map((todo) => {
        if (todo._id === id) {
          return { ...todo, status: !todo.status };
        } else {
          return todo;
        }
      });
      setTodos(listTodo);
    }
  };

  const handleTextbox = (event) => {
    setNewTodo(event.target.value);
  };
  const handleEditTextbox = (event) => {
    setEditTodo(event.target.value);
  };

  const addNewTodo = async (todo) => {
    const todoBody = {
      todo: todo,
    };

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoBody),
    };

    const result = await apiRequest(
      "http://localhost:5000/api/todo",
      postOptions
    );
    const newTodo = await result.json();
    console.log(newTodo);
    setTodos((todos) => [...todos, newTodo]);
    console.log(todos);
    if (result) setFetchError();
  };

  const handleDelete = async (todoId) => {
    const result = await apiRequest(`${API_URL}/${todoId}`, {
      method: "DELETE",
    });

    if (result.ok) {
      setTodos(todos.filter((todo) => todo._id != todoId));
    }
  };

  const handleEdit = async (id, edit) => {
    const editedTodo = { todo: edit };
    const updateObject = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedTodo),
    };
    const result = await apiRequest(`${API_URL}/${id}`, updateObject);
  };
  return (
    <>
      <body className="bg-gray-900 w-screen h-screen flex items-center justify-center">
        <div className="bg-neutral-50 w-80 min-h-72 p-8 rounded-md">
          <div className="grid grid-cols-6 gap-5">
            <input
              type="text"
              onChange={(e) => handleTextbox(e)}
              className="block p-1.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 col-start-1 col-end-6"
            />
            <button onClick={() => addNewTodo(newTodo)}>Add</button>
          </div>
          <main>
            {isLoading && <p>Loading Items...</p>}
            {fetchError && <p>{`Error: ${fetchError}`}</p>}
            {!fetchError && !isLoading && (
              <ul>
                {todos.map((todo) => (
                  <li key={todo._id} className="flex flex-row">
                    <input
                      type="checkbox"
                      className=""
                      checked={todo.status}
                      onChange={() => handleChange(todo._id, todo.status)}
                    />
                    <label
                      htmlFor=""
                      onDoubleClick={() => handleChange(todo._id)}
                    >
                      {todo.todo}
                    </label>
                    {/* {
                  !isEditing && <button onClick={setIsEditing(true)}>Edit</button>
                }{
                  isEditing && <><input type="text" onChange={(e) =>{handleEditTextbox}} ></input> <button onClick={()=> handleEdit(todo.id, newEdit)}>Submit</button></>
                } */}

                    <button onClick={() => handleDelete(todo._id)}>
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </main>
        </div>
      </body>
    </>
  );
}

export default App;
