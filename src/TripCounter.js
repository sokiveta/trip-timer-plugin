// component that takes in a trip name and time and creates a countdown timer
import { useState, useEffect } from "react";

export default function TripCounter({ tripName, tripTime }) {
	const [newTaskText, setNewTaskText] = useState("");
	const [tasks, setTasks] = useState([]);
	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(tripTime));
	const [secondsLeft, setSecondsLeft] = useState(
		calculateSecondsLeft(tripTime),
	);

	useEffect(() => {
		const interval = setInterval(() => {
			setTimeLeft(calculateTimeLeft(tripTime));
			setSecondsLeft(calculateSecondsLeft(tripTime));
		}, 500);
		return () => {
			clearInterval(interval);
		};
	}, [tripTime]);

	function getEncouragementText(secondsLeft) {
		if (secondsLeft <= 0) {
			return "Now you're late!";
		} else if (secondsLeft < 300) {
			// less than 5 minutes
			return "Time to go!";
		} else if (secondsLeft < 600) {
			// between 5 and 10 minutes
			return "Almost time to leave!";
		} else {
			return "Let's go!";
		}
	}

	function encouragementAreaClasses() {
		const classes = ["encouragementArea"];
		if (secondsLeft < 60) {
			classes.push("encouragementAreaRed");
		}
		if (secondsLeft < 300) {
			classes.push("encouragementAreaYellow");
		}
		if (secondsLeft >= 300) {
			classes.push("encouragementAreaGreen");
		}

		return classes.join(" ");
	}

	function checkEnterKey(event) {
		if (event.key && event.key === "Enter") {
			addNewTask();
		}
	}

	function addNewTask() {
		setTasks([...tasks, { text: newTaskText, done: false }]);
		setNewTaskText("");
	}

	function changeCheckbox(event) {
		const updatedTasks = Array.from(tasks);
		const index = event.target.id.match(/\d/)[0];

		updatedTasks[index].done = event.target.checked;
		setTasks(updatedTasks);
	}

	const listItems = tasks.map((task, index) => {
		let itemClass = "taskItem";
		if (task?.done) {
			itemClass += " done";
		}

		const id = `taskCheckbox_${index}`;

		return (
			<li className={itemClass} key={index}>
				<input
					type="checkbox"
					id={id}
					onChange={changeCheckbox}
					checked={task.done}
				/>
				<label htmlFor={id}>{task.text}</label>
			</li>
		);
	});

	return (
		<div class="CountdownPage">
			<h2>{tripName}</h2>
			<div class={"timeInfo" + getTimeInfoColorClass(secondsLeft)}>
				<div>Out the door at {niceHumanTime(tripTime)}</div>
				<div>{timeLeft} LEFT!</div>
			</div>
			<div class="otherStuff">
				<div>
					<h2>Things Left To Do</h2>
				</div>
				<div>
					<ul>{listItems}</ul>
				</div>

				<div>
					<input
						class="newTask"
						placeholder="Add tasks here"
						value={newTaskText}
						onChange={(e) => setNewTaskText(e.target.value)}
						onKeyDown={checkEnterKey}
					/>
					<button onClick={addNewTask}>+</button>
				</div>
				<div className={encouragementAreaClasses()}>
					{getEncouragementText(secondsLeft)}
				</div>
			</div>
		</div>
	);
}

function calculateSecondsLeft(time) {
	const departureTime = new Date();
	const currentTime = new Date();

	const [hours, minutes] = time.split(":");

	departureTime.setHours(hours);
	departureTime.setMinutes(minutes);
	departureTime.setSeconds(0);

	const secondsLeft = Math.floor((departureTime - currentTime) / 1000); // millis to seconds

	return Math.max(0, secondsLeft); // Ensure it never goes negative
}

function getTimeInfoColorClass(secondsLeft) {
	if (secondsLeft < 60) {
		return " timeInfoRed";
	} else if (secondsLeft < 300) {
		return " timeInfoYellow";
	} else {
		return " timeInfoGreen";
	}
}

function niceHumanTime(time) {
	const now = new Date();

	const [hours, minutes] = time.split(":");

	now.setHours(hours);
	now.setMinutes(minutes);

	return now.toLocaleString("en-us", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	});
}

function calculateTimeLeft(time) {
	const now = new Date();
	const then = new Date();

	const [hours, minutes] = time.split(":");

	then.setHours(hours);
	then.setMinutes(minutes);
	then.setSeconds(0);

	let secondsLeft = (then - now) / 1000; // millis to seconds
	secondsLeft = Math.max(0, secondsLeft); // Ensure it never goes negative

	if (secondsLeft > 3600) {
		let hours = Math.floor(secondsLeft / 3600);
		let minutes = Math.floor((secondsLeft % 3600) / 60);

		return `${hours} Hours and ${minutes} minutes`;
	} else if (secondsLeft > 60) {
		let minutes = Math.floor(secondsLeft / 60);
		let seconds = Math.floor(secondsLeft % 60);

		return `${minutes}:${seconds.toString().padStart(2, "0")}`;
	}

	return `${secondsLeft} SECONDS`;
}
