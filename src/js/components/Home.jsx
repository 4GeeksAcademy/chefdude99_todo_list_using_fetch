import React, { useEffect, useState } from "react";

const Home = () => {
	const apiUrl = "https://playground.4geeks.com/todo";
	const userName = "chefdude99";
	const [tareas, setTareas] = useState([]);
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		console.log("Hello")
		fetch(`${apiUrl}/users/${userName}`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data) 
				setTareas(data.todos)})
			.catch((error) => console.log(error))
	}, [])
	return (
		<div className="Principal container">
			<h1>Todo's</h1>
			<input type="text" className="form-control" placeholder="tareas por hacer" value={inputValue}
				onChange={(event) => setInputValue(event.target.value)}
				onKeyDown={(event) => {
					if (event.key === 'Enter' && inputValue.trim() !== '') {
						setTareas([...tareas, inputValue]);
						setInputValue('');
					}
				}}
			/>
			<ul className="list-group">
				{tareas.map((tarea, index) =>
					<li className="tarea-item list-group-item" key={index}>
						<span className="texto ">{tarea.label}</span>
						<button type="button" className="eliminar btn" onClick={() => {
							let newTareas = [...tareas];
							newTareas.splice(index, 1);
							setTareas(newTareas)
						}}>X</button>
					</li>
				)}
			</ul>
			<div className="tareas-pendi">
				<p>quedan estas tareas:  </p>
				{tareas.length}
			</div>
		</div>
	);
}
export default Home;