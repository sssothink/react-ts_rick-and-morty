import React, { FC } from "react";

interface MainSwitchComponentProps {
	handleSwitch: (count: number) => void;
	numPage: number;
	searchCharacter: string;
	handleValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MainSwitchComponent: FC<MainSwitchComponentProps> = ({
	handleSwitch,
	numPage,
	searchCharacter,
	handleValue,
}) => {
	return (
		<>
			<div className={location.pathname !== "/" ? "switch hidden" : "switch"}>
				<input
					type="text"
					value={searchCharacter}
					onChange={handleValue}
					placeholder="Search by name character"
					className="switch__search_input input"
				/>
				<div
					onClick={() => handleSwitch(-1)}
					className={numPage === 1 ? "switch__btn_disable" : "switch__btn"}
				>
					Prev page
				</div>
				<div className="switch__num">{numPage}</div>
				<div
					onClick={() => handleSwitch(1)}
					className={numPage === 42 ? "switch__btn_disable" : "switch__btn"}
				>
					Next page
				</div>
			</div>
		</>
	);
};

export default MainSwitchComponent;
