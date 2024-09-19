import "./App.css";
import HeaderComponent from "./components/HeaderComponents/HeaderComponent";
import MainComponent from "./components/MainComponents/MainComponent";
import FooterComponent from "./components/FooterComponents/FooterComponent";

function App() {
	return (
		<>
			<div className="app">
				<HeaderComponent />
				<MainComponent />
				<FooterComponent />
			</div>
			;
		</>
	);
}

export default App;
