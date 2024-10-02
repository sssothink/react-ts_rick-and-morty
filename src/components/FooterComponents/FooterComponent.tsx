import ghIcone from "../../assets/imgs/icone-github.png";

const FooterComponent = () => {
	const focusHeader = () => {
		window.scroll({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	};

	return (
		<footer className="footer">
			<a
				className="footer__creator"
				target="_blank"
				href="https://github.com/sssothink"
			>
				Rebenkov Artem
				<img className="footer__img" src={ghIcone} />
			</a>
			<div onClick={() => focusHeader()} className="footer__up">
				Rise up
			</div>
			<div className="footer__year">2024</div>
		</footer>
	);
};

export default FooterComponent;
