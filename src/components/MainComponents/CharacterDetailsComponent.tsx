import React, { FC } from "react";
import { ICharacters } from "./MainCharactersComponent";

interface CharacterDetailsProps {
	character: ICharacters;
}

const CharacterDetails: FC<CharacterDetailsProps> = ({ character }) => {
	const detailsSensorGreen = "details__sensor_green";
	const detailsSensorRed = "details__sensor_red";
	const detailsSensorGray = "details__sensor_gray";
	return (
		<div className="details__wrapper">
			<img className="details__img" src={character.image} alt="img-character" />
			<div className="details__description">
				<div className="details__text details__title">
					{character.name}
					<div className="details__text-title">{character.species}</div>
				</div>
				<div className="details__text">
					<div className="details__text-item">
						<div
							className={`details__text-sensor ${
								character.status === "Alive"
									? detailsSensorGreen
									: character.status === "Dead"
									? detailsSensorRed
									: detailsSensorGray
							}`}
						></div>
						{character.status}
					</div>
				</div>

				<div className="details__text">
					<div className="details__text-title">Gender:</div>
					<div className="details__text-item">{character.gender}</div>
				</div>

				<div className="details__text">
					<div className="details__text-title">Last known location:</div>
					<div className="details__text-item">{character.location.name}</div>
				</div>
			</div>
		</div>
	);
};

export default CharacterDetails;
