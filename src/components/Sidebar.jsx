import React from "react";
import { Stack } from "@mui/material";

import { categories } from "../utils/constants";
import { useSearchParams } from "react-router-dom";


const Categories = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const selectedCategory = searchParams.get("q");

	return (
		<Stack
			direction="row"
			sx={{
				overflowY: "auto",
				height: { sx: "auto", md: "95%" },
				flexDirection: { md: "column" },
			}}
		>
			{categories.map((category) => (
				<button
					className="category-btn"
					onClick={() =>setSearchParams({ "q": category.categoryId,"category": category.name }) }
					style={{
						background: (category.name === selectedCategory || (!selectedCategory && category.name === "New")) && "#FC1503",
						color: "white",
					}}
					key={category.name}
				>
					<span style={{ color: (category.name === selectedCategory || (!selectedCategory && category.name === "New")) ? "white" : "red", marginRight: "15px" }}>
						{category.icon}
					</span>
					<span style={{ opacity: (category.name === selectedCategory || (!selectedCategory && category.name === "New")) ? "1" : "0.8" }}>
						{category.name}
					</span>
				</button>
			))}
		</Stack>
	)
};


export default Categories;





