import Image from "next/image";
import React, { useState } from "react";
import { Pagination } from "react-bootstrap";
import { Info } from "../lib/dataTypes";

const Footer = ({
	count,
	pages,
	next,
	prev,
	setPageNumber,
	get,
}: {
	count: Info["count"];
	pages: Info["pages"];
	next: Info["next"];
	prev: Info["prev"];
	setPageNumber: React.Dispatch<React.SetStateAction<number>>;
	get: () => void;
}) => {
	const [active, setActive] = useState(1);

	let items = [];
	for (let number = 1; number <= pages; number++) {
		items.push(
			<Pagination.Item
				activeLabel=""
				onClick={(e) => {
					e.preventDefault();
					setActive(number);
					setPageNumber(number);
					get();
				}}
				key={number}
				active={number === active}
			>
				{number}
			</Pagination.Item>
		);
	}

	return (
		<footer className={"footer flex-column mt-2"}>
			<Pagination size="sm">{items}</Pagination>
			<a
				href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
				target="_blank"
				rel="noopener noreferrer"
			>
				Powered by{" "}
				<span className={"logo"}>
					<Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
				</span>
			</a>
		</footer>
	);
};
export default Footer;
