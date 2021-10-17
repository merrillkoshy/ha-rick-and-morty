import Image from "next/image";
import React, { useState } from "react";
import { Card, OverlayTrigger, Pagination, Popover } from "react-bootstrap";
import { Info } from "../lib/dataTypes";

const PaginationComponent = ({
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
	let totalItems = [];
	for (let number = 1; number <= pages; number++) {
		totalItems.push(
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
	const initalBlock = pages / 7;
	const finalBlock = Math.round(pages / 1.05);
	items.push(
		<>
			<Pagination.First
				onClick={(e) => {
					e.preventDefault();
					setActive(1);
					setPageNumber(1);
					get();
				}}
			/>
			<Pagination.Prev
				onClick={(e) => {
					e.preventDefault();
					setActive((prev: number) => {
						if (prev - 1 !== 1) return prev - 1;
						return 1;
					});
					setPageNumber((prev: number) => {
						if (prev - 1 !== 1) return prev - 1;
						return 1;
					});
					get();
				}}
			/>
		</>
	);
	for (let number = 1; number <= initalBlock; number++) {
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
	items.push(
		<OverlayTrigger
			trigger="click"
			key={"top"}
			placement={"top"}
			rootClose={true}
			rootCloseEvent="click"
			overlay={
				<Popover id={"pagination-all-elements"}>
					<Card>
						<Card.Header>Choose Page</Card.Header>
						<Card.Body>
							<Pagination
								size="sm"
								className="flex-wrap pagination pagination-sm py-3 m-0"
							>
								{totalItems}
							</Pagination>
						</Card.Body>
					</Card>
				</Popover>
			}
		>
			<Pagination.Ellipsis activeLabel="" />
		</OverlayTrigger>
	);
	for (let number = finalBlock; number <= pages; number++) {
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
	items.push(
		<>
			<Pagination.Next
				onClick={(e) => {
					e.preventDefault();
					setActive((prev: number) => {
						if (prev + 1 !== pages) return prev + 1;
						return pages;
					});
					setPageNumber((prev: number) => {
						if (prev + 1 !== pages) return prev + 1;
						return pages;
					});
					get();
				}}
			/>
			<Pagination.Last
				onClick={(e) => {
					e.preventDefault();
					setActive(pages);
					setPageNumber(pages);
					get();
				}}
			/>
		</>
	);
	return (
		<Pagination size="sm" className="flex-wrap py-3 m-0">
			{items}
		</Pagination>
	);
};
export default PaginationComponent;
