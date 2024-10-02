import { FC } from "react";
import { ICharacters } from "../components/MainComponents/MainCharactersComponent";
import { Link } from "react-router-dom";

interface CharactersItemProps {
	onClick: (item: ICharacters) => void;
	character: ICharacters;
	linkUrl: string;
}

const CharactersItem: FC<CharactersItemProps> = ({
	onClick,
	character,
	linkUrl,
}) => {
	return (
		<Link
			to={linkUrl}
			onClick={() => onClick(character)}
			className="characters__item"
		>
			<img
				className="characters__item-img"
				src={character.image}
				alt="img-character"
			/>
			<div className="characters__item-name">{character.name}</div>
		</Link>
	);
};

export default CharactersItem;
