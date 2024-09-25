import "./App.css";
import FooterComponent from "./components/FooterComponents/FooterComponent";
import LiHeaderComponent from "./models/LiHeaderComponent";
import { BrowserRouter as Router } from "react-router-dom";
import MainComponent from "./components/MainComponents/MainComponent";

function App() {
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
			<MainComponent />
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
