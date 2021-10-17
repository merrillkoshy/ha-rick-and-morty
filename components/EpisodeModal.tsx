import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Episode } from "../lib/dataTypes";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import Link from "next/link";

interface Props {
	show: boolean;
	episodeContent: Episode;
	handleClose: () => void;
}
const EpisodeModal = (props: Props) => {
	const { show, episodeContent, handleClose } = props;
	return (
		<Modal show={show}>
			<Modal.Header closeButton>
				<Modal.Title>
					{" "}
					Episode ID {episodeContent?.id}, {episodeContent.episode}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Table>
					<Thead>
						<Tr>
							<Th>Name</Th>
							<Th>Air Date</Th>
							<Th>Episode</Th>
							<Th>Characters</Th>
							<Th>Created</Th>
						</Tr>
					</Thead>
					<Tbody>
						<Tr>
							<Td>{episodeContent.name}</Td>
							<Td>{episodeContent.air_date}</Td>
							<Td>{episodeContent.episode}</Td>
							<Td>{episodeContent.characters}</Td>
							<Td>{episodeContent.created}</Td>
						</Tr>
					</Tbody>
				</Table>
			</Modal.Body>
			<Modal.Footer>
				<Link href={episodeContent.url}>
					<a>Go to link</a>
				</Link>
				<Button
					variant="danger"
					onClick={(e) => {
						e.preventDefault();
						handleClose();
					}}
				>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
export default EpisodeModal;
