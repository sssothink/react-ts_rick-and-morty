import React, { useEffect, useState } from "react";
import axios from "axios";

interface IEpisode {
	id: number;
	name: string;
	air_date: string;
	episode: string;
	characters: string[];
	url: string;
	created: string;
}

const MainEpisodeComponent: React.FC = () => {
	const [episodes, setEpisodes] = useState<IEpisode[]>([]);
	const [loanding, setLoanding] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const baseUrl = "https://rickandmortyapi.com/api/episode";

	useEffect(() => {
		const fetchEpisodes = async () => {
			try {
				const response = await axios.get<{ results: IEpisode[] }>(baseUrl);
				setEpisodes(response.data.results);
			} catch (error) {
				console.error("Error fetching episodes: ", error);
				setError("Error fetching episodes");
			} finally {
				setLoanding(false);
			}
		};

		fetchEpisodes();
	}, []);

	if (loanding) {
		return <h1>Loanding...</h1>;
	}
	if (error) {
		return <h1>{error}</h1>;
	}

	return (
		<main className="main">
			<h1 className="main__title">EPISODES</h1>
			<ul className="episode__wrap">
				{episodes.map((episode) => (
					<li key={episode.id}>
						<h3>{episode.name}</h3>
					</li>
				))}
			</ul>
		</main>
	);
};

export default MainEpisodeComponent;
