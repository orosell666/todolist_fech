import React, { useState, useEffect } from "react";

const ToDoList = () => {
	const [inputValue, setInputValue] = useState("");
	const [listValue, setListValue] = useState([]);
	

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/oriol")
			.then((resp) => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then((data) => {
			
				setListValue(data);
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch((error) => {
				//error handling
				console.log(error);
			});
	}, []);

	const addToDo = (text) => {
		//if (!inputValue.map((x) => x.label).includes(text) && text.trim() != "") {
		//	setListValue([...listValue, { label: text, done: false }]);
			//  Retorna la API con las tareas almacenadas  despues de actualizar la pagina
			fetch("https://assets.breatheco.de/apis/fake/todos/user/oriol", {
				method: "PUT",
				body: JSON.stringify([...listValue, { label: text, done: false }]),
				headers: {
					"Content-Type": "application/json",
				},
			});
			setListValue([...listValue, { label: text, done: false }]);
		
	};

	const HandleKey = (event) => {
		if (event.key === "Enter" && inputValue !== " " && inputValue !== "") {
			addToDo(inputValue);
			
			setInputValue("");
		}
	};

	const DeleteItems = (indexItem) => {
		setListValue((prevState) =>
			prevState.filter((text, index) => index !== indexItem)
		);
		fetch("https://assets.breatheco.de/apis/fake/todos/user/oriol", {
				method: "PUT",
				body: JSON.stringify(listValue.filter((text, index) => index !== indexItem)),
				headers: {
					"Content-Type": "application/json",
				},
			});
		
	};

    const DeleteAllItems = (indexItem) => {
        setListValue((prevState) =>
            prevState
        )
    }

	return (
		<div>
			<div className="input-group mb-3">
				<div className="input-group-prepend"></div>
				<input
					type="text"
					className="form-control"
					placeholder="Add a task"
					aria-label="Username"
					aria-describedby="basic-addon1"
					onChange={(event) => setInputValue(event.target.value)}
					onKeyPress={(event) => HandleKey(event)}
					value={inputValue}
				/>
			</div>
			<ul>
				{listValue.map((text, index) => (
					<li key={index} className="list-group-item index">
						{text.label}
						<button
							className="btn justify-text-end "
							onClick={() => DeleteItems(index)}>
							<i className="fas fa-times float-end" />
						</button>
					</li>
				))}
				<li className="list-group-item float-start border-0">
					{"" +
					
							 listValue.length + " still to do..."}
                            
				</li>
			</ul>
		</div>
	);
                        };

export default ToDoList;
