import "./App.css";
// import MainComponent from "./components/MainComponents/MainCharactersComponent";
import FooterComponent from "./components/FooterComponents/FooterComponent";
import LiHeaderComponent from "./components/LiHeaderComponent";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainCharactersComponent from "./components/MainComponents/MainCharactersComponent";
import MainLocationComponents from "./components/MainComponents/MainLocationComponent";
import MainEpisodeComponent from "./components/MainComponents/MainEpisodeComponent";
import MainLocationComponent from "./components/MainComponents/MainLocationComponent";

function App() {
	return (
		<div className="app">
			<Router>
				<header>
					<nav className="header__nav">
						<div className="header__icone">ICON</div>
						<ul className="header__list">
							<LiHeaderComponent text="Characters" linkUrl="/charactes" />
							<LiHeaderComponent text="Location" linkUrl="/location" />
							<LiHeaderComponent text="Episode" linkUrl="/episode" />
						</ul>
					</nav>
				</header>
				<Routes>
					<Route path="/" element={<MainCharactersComponent />} />
					<Route path="/charactes" element={<MainCharactersComponent />} />
					<Route path="/location" element={<MainLocationComponent />} />
					<Route path="/episode" element={<MainEpisodeComponent />} />
				</Routes>
			</Router>
			<FooterComponent />
		</div>
	);
}

export default App;
