import React from "react";

const CustomProgressBar = ({ value, label }) => {
	return (
		<div
			className="progressbar w-100"
			style={{
				backgroundColor: "#f2f2f2",
				border: "1px solid #08bd80",
				borderRadius: "20px",
				padding: "1px",
			}}
		>
			<div
				className="progress text-white d-flex justify-content-center"
				style={{
					backgroundColor: "#08bd80",
					height: label ? "auto" : "2ch",
					padding: "0 10px",
					fontSize: "x-small",
					fontWeight: "bolder",
					borderRadius: "20px",
					width: value + "%",
				}}
			>
				{label}
			</div>
		</div>
	);
};

export default CustomProgressBar;
