import React, { FC } from "react";
import { Link } from "react-router-dom";

interface LiHeaderComponentProps {
	text: string;
	linkUrl: string;
}

const LiHeaderComponent: FC<LiHeaderComponentProps> = ({ text, linkUrl }) => {
	return (
		<>
			<Link className="header__link" to={linkUrl}>
				{text}
			</Link>
		</>
	);
};

export default LiHeaderComponent;
