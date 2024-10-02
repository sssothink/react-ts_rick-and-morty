import React from "react";

const MainDescriptionComponent: React.FC = () => {
	return (
		<div className="description">
			<h1 className="description__title">DESCRIPTION</h1>;
			<div className="description__text">
				The application allows you to get acquainted with the characters from
				the universe of the animated series "Rick and Morty".
			</div>
			<div className="description__text">
				There are 42 pages with characters in total, you can find a certain
				character by searching by name. Also go to a specific character and
				explore additional information about him.
			</div>
		</div>
	);
};

export default MainDescriptionComponent;
