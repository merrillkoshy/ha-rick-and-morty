import Image from "next/image";
import React, { useRef, useState } from "react";
import {
	Button,
	Card,
	OverlayTrigger,
	Pagination,
	Popover,
	Spinner,
} from "react-bootstrap";
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
	get: (page: number) => void;
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
					get(number);
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
			<Pagination.Prev
				key={`prev-${active}`}
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
					if (active - 1 !== 1) return get(active - 1);
					return get(1);
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
					get(number);
				}}
				key={number}
				active={number === active}
			>
				{number}
			</Pagination.Item>
		);
	}
	const ref = useRef(null);
	items.push(
		<OverlayTrigger
			trigger="click"
			key={"top"}
			placement={"top"}
			overlay={
				<Popover id={"pagination-all-elements"}>
					<Card>
						<Card.Header>Choose Page</Card.Header>
						<Card.Body>
							<Pagination
								size="sm"
								className="flex-wrap pagination pagination-sm py-3 m-0"
							>
								{totalItems.length ? (
									totalItems
								) : (
									<Spinner animation="border" variant="primary" />
								)}
							</Pagination>
						</Card.Body>
					</Card>
				</Popover>
			}
		>
			<Pagination.Ellipsis key={`ellipsis-${active}`} activeLabel="" />
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
					get(number);
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
				key={`next-${active}`}
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
					if (active + 1 !== pages) return get(active + 1);
					return get(pages);
				}}
			/>
		</>
	);
	return (
		<Pagination size="sm" className="flex-wrap py-3 mb-5">
			{items.length ? items : <Spinner animation="border" variant="primary" />}
		</Pagination>
	);
};
export default PaginationComponent;
