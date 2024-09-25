import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import MainCharactersComponent, {
	ICharacters,
} from "./MainCharactersComponent";
import MainDescriptionComponent from "./MainDescriptionComponent";
import CharacterDetails from "./CharacterDetailsComponent";
import axios from "axios";
import MainSwitchComponent from "./MainSwitchComponent";

const MainComponent = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [characters, setCharacters] = useState<ICharacters[]>([]);
	const [filteredCharacters, setFilteredCharacters] = useState<
		ICharacters[] | null
	>(null);
	const [selectedCharacter, setSelectedCharacter] =
		useState<ICharacters | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [numPage, setNumPage] = useState<number>(1);
	const [searchCharacter, setSearchCharacter] = useState<string>("");

	const baseUrl: string = "https://rickandmortyapi.com/api/character/";

	useEffect(() => {
		navigate("/"); // при перезагрузке роутинг обнуляется

		const fetchCharacters = async () => {
			try {
				// вытаскиваем данные с помощью axios
				const response = await axios.get<{ results: ICharacters[] }>(
					baseUrl + `?page=${numPage}`
				);
				setCharacters(response.data.results);
			} catch (error) {
				console.error("Error fetching characters: ", error);
				setError("Error fetching characters");
			}
		};
		fetchCharacters();
	}, [numPage]);

	if (error) {
		console.log("Error fetching characters: ", error);
	}

	const handleClick = (item: ICharacters) => {
		setSelectedCharacter(item);
	};

	// при переключении страницы
	const handleSwitch = async (count: number) => {
		setFilteredCharacters(null);
		if (numPage > 1 && numPage < 42) {
			setNumPage(numPage + count);
		} else if (numPage === 1 && count === 1) {
			setNumPage(numPage + count);
		} else if (numPage === 42 && count === -1) {
			setNumPage(numPage + count);
		}
		// handleSearch(searchCharacter);
	};

	// При вводе в инпут
	const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		let value = event.target.value;
		setSearchCharacter(value);
		// handleSearch(value);
		let filteredCharacters = characters.filter((character: ICharacters) =>
			character.name.toLowerCase().includes(value.toLowerCase())
		);
		setFilteredCharacters(filteredCharacters);
	};

	// const handleSearch = (value: string) => {
	// 	let filteredCharacters = characters.filter((character: ICharacters) =>
	// 		character.name.toLowerCase().includes(value.toLowerCase())
	// 	);
	// 	setFilteredCharacters(filteredCharacters);
	// };

	return (
		<main>
			<MainSwitchComponent
				handleSwitch={handleSwitch}
				numPage={numPage}
				searchCharacter={searchCharacter}
				handleValue={handleValue}
			/>
			<TransitionGroup className="main">
				<CSSTransition key={location.key} classNames="fade" timeout={300}>
					<Routes location={location}>
						<Route
							path="/home"
							element={
								<MainCharactersComponent
									characters={
										filteredCharacters ? filteredCharacters : characters
									}
									selectedCharacter={selectedCharacter}
									handleClick={handleClick}
								/>
							}
						/>
						<Route
							path="/"
							element={
								<MainCharactersComponent
									characters={
										filteredCharacters ? filteredCharacters : characters
									}
									selectedCharacter={selectedCharacter}
									handleClick={handleClick}
								/>
							}
						/>
						<Route path="/description" element={<MainDescriptionComponent />} />

						{/* Переход к конкретному персонажу с подробной инфой о нем */}
						<Route
							path={`/character/${selectedCharacter?.id}`}
							element={
								selectedCharacter && (
									<CharacterDetails character={selectedCharacter} />
								)
							}
						/>
					</Routes>
				</CSSTransition>
			</TransitionGroup>
		</main>
	);
};

export default MainComponent;
