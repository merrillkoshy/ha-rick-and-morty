import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { Episode } from "../lib/dataTypes";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import Link from "next/link";
import moment from "moment";

interface Props {
	show: boolean;
	episodeContent: Episode;
	handleClose: () => void;
}
const EpisodeModal = (props: Props) => {
	const { show, episodeContent, handleClose } = props;

	const character_id_filtered_from_text = (text: string) => {
		return text.replace(
			"https://rickandmortyapi.com/api/character/",
			"Character "
		);
	};
	return (
		<Modal show={show} size="lg" className="episode-modal" onHide={handleClose}>
			{episodeContent.name ? (
				<>
					<Modal.Header closeButton>
						<Modal.Title>
							<>
								{episodeContent.episode} : {episodeContent.name}
								<br></br>
								<span className="episode-created-at">
									Created on {moment(episodeContent.created).format("lll")}
								</span>
							</>
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Table>
							<Thead>
								<Tr>
									<Th className="text-center">Name</Th>
									<Th className="text-center">Air Date</Th>
									<Th className="text-center">Episode</Th>
									<Th className="text-center">Characters</Th>
								</Tr>
							</Thead>
							<Tbody>
								<Tr>
									<Td>{episodeContent.name}</Td>
									<Td>{episodeContent.air_date}</Td>
									<Td>{episodeContent.episode}</Td>
									<Td>
										<div className="episode-list d-flex flex-wrap align-items-center justify-content-center">
											{episodeContent.characters &&
												episodeContent.characters.map((character: string) => {
													return (
														<Button
															key={episodeContent.id + character}
															variant="outline-primary"
															className="m-2"
														>
															{character_id_filtered_from_text(character)}
														</Button>
													);
												})}
										</div>
									</Td>
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
				</>
			) : (
				<Spinner animation="border" variant="primary" />
			)}
		</Modal>
	);
};
export default EpisodeModal;
