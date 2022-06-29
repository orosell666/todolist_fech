import React, { useState, useEffect } from "react";

const ToDoList = () => {
	const [inputValue, setInputValue] = useState("");
	const [listValue, setListValue] = useState([]);
	const [counterValue, setCounterValue] = useState(0);

	useEffect(() => {
		fetch("https://gorest.co.in/public/v2/users/")
			.then((resp) => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then((data) => {
				temporalData = data;
				setInputValue(temporalData);
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
			fetch("https://gorest.co.in/public/v2/users/", {
				method: "PUT",
				body: JSON.stringify([...listValue, { label: text, done: false }]),
				headers: {
					"Content-Type": "application/json",
				},
			});
			setListValue("");
		
	};

	const HandleKey = (event) => {
		if (event.key === "Enter" && inputValue !== " " && inputValue !== "") {
			addToDo(inputValue);
			setCounterValue(counterValue + 1);
			setInputValue("");
		}
	};

	const DeleteItems = (indexItem) => {
		setListValue((prevState) =>
			prevState.filter((text, index) => index !== indexItem)
		);
		setCounterValue(counterValue - 1);
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
						{text}
						<button
							className="btn justify-text-end "
							onClick={() => DeleteItems(index)}>
							<i className="fas fa-times float-end" />
						</button>
					</li>
				))}
				<li className="list-group-item float-start border-0">
					{"" +
						(counterValue == 0
							? "Nothign to do, chill then!"
							: counterValue + " still to do...")}
                            <button
							className="btn justify-text-end "
							onClick={() => DeleteAllItems(index)}>
							<i className="fas fa-times float-end" />
						</button>
				</li>
			</ul>
		</div>
	);
                        };

export default ToDoList;
