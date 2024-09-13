import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <>
      <h1>Todos</h1>

<input placeholder="name" value={name} onChange={(e)=> setName(e.target.value)} />
<input placeholder="age" value={age} onChange={(e)=> setAge(e.target.value)} />
      <button
        onClick={() => {
          fetch("http://localhost:3000/todos", {
            method: "POST",
            body: JSON.stringify({ name, age }),
            headers: { "Content-Type": "application/json" }
          })
            .then((res) => res.json())
            .then((data) => {
              setData(data);
              setName("");
              setAge("");
            });
        }}
      >
        Add
      </button>
      <div>{data.length === 0 && "No Data"}</div>
      <div>
        {data.map((item: any) => (
          <div key={item.id}>
            {item.name} - {item.age}
            <button onClick={() => {
          fetch(`http://localhost:3000/todos/${item.id}`, {
            method: "PUT",
            body: JSON.stringify({ name, age }),
            headers: { "Content-Type": "application/json" }
          })
            .then((res) => res.json())
            .then((data) => {
              setData(data);
              setName("");
              setAge("");
            });
        }}>Edit</button>
            <button onClick={() => {
          fetch(`http://localhost:3000/todos/${item.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
          })
            .then((res) => res.json())
            .then((data) => {
              setData(data);
              setName("");
              setAge("");
            });
        }}>delete</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
