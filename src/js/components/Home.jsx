import React, { useEffect, useState } from "react";

const Home = () => {
	const apiUrl = "https://playground.4geeks.com/todo";
	const userName = "chefdude99";
	const [tareas, setTareas] = useState([]);
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		fetch(`${apiUrl}/users/${userName}`)
			.then((response) => response.json())
			.then((data) => setTareas(data.todos))
			.catch((error) => console.log(error))
	}, [])

	const addTodo = async (event) => {
		if (event.key === 'Enter' && inputValue.trim() !== '') {
			setInputValue('');
			const respuesta = await fetch(`${apiUrl}/todos/${userName}`, {
				method: "POST",
				body: JSON.stringify({
					"label": inputValue,
					"is_done": false,
				}),
				headers: {
					"Content-Type": "application/json"
				}

			})
			const nuevaTodo = await respuesta.json()
			console.log(nuevaTodo)
			setTareas(oldTareas=>[...oldTareas,nuevaTodo])
		}
	}

	const borrarUna = async (index, id) => {
		let newTareas = [...tareas];
		newTareas.splice(index, 1);
		setTareas(newTareas)
		await fetch(`${apiUrl}/todos/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		}
		)


	}

	const borrarTodos = () => {
		tareas.map((tarea) => {
			fetch(`${apiUrl}/todos/${tarea.id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				}
			}
			)
		})
		setTareas([])
	}

	return (
		<div className="Principal container">
			<h1>Todo's</h1>
			<input type="text" className="form-control" placeholder="tareas por hacer" value={inputValue}
				onChange={(event) => setInputValue(event.target.value)}
				onKeyDown={(event) => {
					addTodo(event)
				}}
			/>
			<ul className="list-group">
				{tareas.map((tarea, index) =>
					<li className="tarea-item list-group-item" key={index}>
						<span className="texto ">{tarea.label}</span>
						<button type="button" className="eliminar btn" onClick={() => {
							borrarUna(index, tarea.id);
						}}>X</button>
					</li>
				)}
			</ul>
			<div className="tareas-pendi">
				<p>quedan estas tareas:  </p>
				{tareas.length}
			</div>
			<button className="btn btn-danger"
				onClick={() => {
					borrarTodos()
				}}>ELIMINAR TODO</button>
		</div>
	);
}
export default Home;