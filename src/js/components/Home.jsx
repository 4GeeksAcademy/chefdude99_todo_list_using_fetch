import React, { useState } from "react";

const Home = () => {
	const [Tareas, setTareas] = useState([]);
	const [NuevasTareas, setNuevasTareas] = useState("")
	function handleKeyPress(event) {
		if (event.key === "Enter" && NuevasTareas.trim()) {
			setTareas([...Tareas, NuevasTareas]);
			setNuevasTareas("");
		}
	}
	return (
		<div className="Principal">
			<h1>Todo's</h1>
			<div className="input-group mb-3">
				<input type="text" className="form-control" placeholder="Tareas por hacer" aria-label="Username" aria-describedby="basic-addon1" />
			</div>
		</div>
	);
};

export default Home;