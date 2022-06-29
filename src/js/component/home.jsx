import React from "react";

//include images into your bundle
import ToDoList from "./todolist.jsx";

//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<div>
				<h1>To Do List</h1>
			</div>

			<div className="container">
				<ToDoList />
			</div>
		</div>
	);
};

export default Home;
