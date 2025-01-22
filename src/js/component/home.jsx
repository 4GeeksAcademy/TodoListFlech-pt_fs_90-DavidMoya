import React, { useState, useEffect } from "react";

const Home = () => {

	const [tasks, setTasks] = useState([]);
	const [input, setInput] = useState("");

	const [isFocused,setIsFocused] =useState(false);
	

	useEffect(() => {
		getTasks()
	}, [])

	const createUser = async () => {
		const response = await fetch("https://playground.4geeks.com/todo/users/DavidMoya",
			{ method: "POST" })
		console.log(response);
		const data = await response.json();
		console.log(data);
		getTasks()

	};
	const getTasks = async () => {
		const response = await fetch("https://playground.4geeks.com/todo/users/DavidMoya")
		if (!response.ok) {
			await createUser();
		}
		const data = await response.json();
		console.log(data);
		console.log(data.todos);

		setTasks(data.todos);
	};

	const postTareas = async () => {
		const newTask = { label: input, is_done: false };
		const response = await fetch("https://playground.4geeks.com/todo/todos/DavidMoya",
			{
				method: "POST",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify(newTask),
			});
		console.log(response);
		const data = await response.json();
		console.log(data);
		setTasks([...tasks, data]);
		setInput("");
	};
	const deleteTask = async (id) => {
		const response = await fetch(
			`https://playground.4geeks.com/todo/todos/${id}`,
			{
				method: "DELETE",
			}
		);

		if (response.ok) {
			setTasks(tasks.filter((task) => task.id !== id));
		}
	};
	const deleteAllTask = async () => {
		const response = await fetch("https://playground.4geeks.com/todo/users/DavidMoya",
			{
				method: "DELETE",
			}
		);
		if (response.ok) {
			createUser()
			setInput("")
		}

	};
	function primeraMayuscula(palabra) {
		return palabra.charAt(0).toUpperCase() + palabra.slice(1)
	};

	return (
		<div className="principal container-fluid">
			<h1>LISTAS DE TAREAS</h1>
			<div clasName="text-center">
				<input className=""
					type="text"
					value={input}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					onChange={(e) => {
						const texto = e.target.value;
						const textoConMayuscula = primeraMayuscula(texto);
						setInput(textoConMayuscula);
					}}
					onKeyUp={(e) => {
						if (e.key === "Enter" && input.trim() != "") {
							postTareas();
						}
					}}

				/>
				<label className={`placeholder ${isFocused || input ? 'focused': ''}`}>Añadir tarea</label>
				<button className="" onClick={deleteAllTask}>Borrar todo</button>
			</div>

			<ul>
				{tasks.map((task, index) => {
					return (
						<li key={index}>
							{task.label}
							<span onClick={() => { deleteTask(task.id) }}>
								X
							</span>
						</li>

					)
				})}
			</ul>
		</div>
	);
};

export default Home;
