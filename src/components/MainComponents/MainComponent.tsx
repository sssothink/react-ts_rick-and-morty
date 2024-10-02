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
	let value: string = "";
	const navigate = useNavigate();
	const [characters, setCharacters] = useState<ICharacters[]>([]);
	const [filteredCharacters, setFilteredCharacters] = useState<ICharacters[]>(
		[]
	);
	const [selectedCharacter, setSelectedCharacter] =
		useState<ICharacters | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [numPage, setNumPage] = useState<number>(1);
	const [searchCharacter, setSearchCharacter] = useState<string>("");
	const [baseUrl, setBaseUrl] = useState(
		"https://rickandmortyapi.com/api/character/"
	);

	useEffect(() => {
		navigate("/"); // On reboot, the rating is reset to zero

		const fetchCharacters = async () => {
			try {
				// Pulling out the data using axios
				const response = await axios.get<{ results: ICharacters[] }>(baseUrl);
				const fetchedCharacters = response.data.results;
				setCharacters(fetchedCharacters);
			} catch (error) {
				console.error("Error fetching characters: ", error);
				setError("Error fetching characters");
			}
		};
		fetchCharacters();
	}, [baseUrl]);

	if (error) {
		console.log("Error fetching characters: ", error);
	}

	const handleClick = (item: ICharacters) => {
		setSelectedCharacter(item);
	};

	const switchPage = (numPage: number, count: number) => {
		if (numPage !== numPage + count) {
			setNumPage(numPage + count);
			setBaseUrl(
				"https://rickandmortyapi.com/api/character/" +
					`?page=${numPage + count}`
			);
		}
	};

	useEffect(() => {
		setFilteredCharacters([]);
		if (searchCharacter.trim() !== "") {
			console.log(numPage);
			filterValue(searchCharacter);
		}
	}, [characters]);

	// When switching pages
	const handleSwitch = (count: number) => {
		if (numPage > 1 && numPage < 42) {
			switchPage(numPage, count);
		} else if (numPage === 1 && count === 1) {
			switchPage(numPage, count);
		} else if (numPage === 42 && count === -1) {
			switchPage(numPage, count);
		}
	};

	// When entering the input:
	const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		value = event.target.value;
		setSearchCharacter(value);
		filterValue(value);
	};

	const filterValue = (value: string) => {
		let filtered = characters.filter((character: ICharacters) =>
			character.name.toLowerCase().includes(value.trim().toLowerCase())
		);
		setFilteredCharacters(filtered);
	};

	const displayCharacters = filteredCharacters
		? filteredCharacters
		: characters;

	return (
		<main>
			<MainSwitchComponent
				numPage={numPage}
				searchCharacter={searchCharacter}
				handleSwitch={handleSwitch}
				handleValue={handleValue}
			/>
			<TransitionGroup className="main">
				<CSSTransition key={location.key} classNames="fade" timeout={300}>
					<Routes location={location}>
						<Route
							path="/"
							element={
								<MainCharactersComponent
									characters={displayCharacters}
									selectedCharacter={selectedCharacter}
									handleClick={handleClick}
								/>
							}
						/>
						<Route path="/description" element={<MainDescriptionComponent />} />

						{/* Go to a specific character with detailed information about him */}
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
