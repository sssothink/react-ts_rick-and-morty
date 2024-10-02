import { FC } from "react";
import CharactersItem from "../../models/CharactersItemComponent";

export interface ICharacters {
	id: number;
	name: string;
	status: string;
	species: string;
	type: string;
	gender: string;
	origin: {
		name: string;
		url: string;
	};
	location: {
		name: string;
		url: string;
	};
	image: string;
	episode: string[];
	url: string;
	created: string;
}

interface MainHomeComponentProps {
	characters: ICharacters[];
	selectedCharacter: ICharacters | null;
	handleClick: (item: ICharacters) => void;
	checkFound: boolean;
}

const MainCharactersComponent: FC<MainHomeComponentProps> = ({
	characters,
	handleClick,
	checkFound,
}) => {
	return (
		<div className="characters__wrapper">
			{!checkFound ? (
				characters.map((character) => {
					return (
						<CharactersItem
							linkUrl={`/character/${character.id}`}
							key={character.id}
							character={character}
							onClick={handleClick}
						/>
					);
				})
			) : (
				<div className="characters__not-fount">Not found...</div>
			)}
		</div>
	);
};

export default MainCharactersComponent;
