import "./App.css";
// import MainComponent from "./components/MainComponents/MainCharactersComponent";
import FooterComponent from "./components/FooterComponents/FooterComponent";
import LiHeaderComponent from "./models/LiHeaderComponent";
import {
	Route,
	BrowserRouter as Router,
	Routes,
	useLocation,
	useNavigate,
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import MainHomeComponent, {
	ICharacters,
} from "./components/MainComponents/MainHomeComponent";
import MainDescriptionComponent from "./components/MainComponents/MainDescriptionComponent";
import CharacterDetails from "./components/MainComponents/CharacterDetailsComponent";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
	const location = useLocation();
	const navigate = useNavigate();
	const [characters, setCharacters] = useState<ICharacters[]>([]);
	const [selectedCharacter, setSelectedCharacter] =
		useState<ICharacters | null>(null);
	const [error, setError] = useState<string | null>(null);

	const baseUrl: string = "https://rickandmortyapi.com/api/character";

	useEffect(() => {
		navigate("/"); // при перезагрузке роутинг обнуляется

		const fetchCharacters = async () => {
			try {
				// вытаскиваем данные с помощью axios
				const response = await axios.get<{ results: ICharacters[] }>(baseUrl);
				setCharacters(response.data.results);
			} catch (error) {
				console.error("Error fetching characters: ", error);
				setError("Error fetching characters");
			}
		};
		fetchCharacters();
	}, []);

	if (error) {
		console.log("Error fetching characters: ", error);
	}

	const handleClick = (item: ICharacters) => {
		setSelectedCharacter(item);
	};

	return (
		<div>
			<header>
				<nav className="header__nav">
					<div className="header__icone">ICON</div>
					<ul className="header__list">
						<LiHeaderComponent text="Home" linkUrl="/home" />
						<LiHeaderComponent text="Description" linkUrl="/description" />
					</ul>
				</nav>
			</header>

			<TransitionGroup className="main">
				<CSSTransition key={location.key} classNames="fade" timeout={300}>
					<Routes location={location}>
						<Route
							path="/"
							element={
								<MainHomeComponent
									characters={characters}
									selectedCharacter={selectedCharacter}
									handleClick={handleClick}
								/>
							}
						/>
						<Route
							path="/home"
							element={
								<MainHomeComponent
									characters={characters}
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
			<FooterComponent />
		</div>
	);
}

const AppWrapper: React.FC = () => {
	return (
		<div className="app">
			<Router basename="/">
				<App />
			</Router>
		</div>
	);
};

export default AppWrapper;
