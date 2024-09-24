import React, { FC } from "react";
import { ICharacters } from "./MainHomeComponent";

interface CharacterDetailsProps {
	character: ICharacters;
}

const CharacterDetails: FC<CharacterDetailsProps> = ({ character }) => {
	return (
		<div className="details__wrapper">
			<img src={character.image} alt="img-character" />
			{character.name}
		</div>
	);
};

export default CharacterDetails;
