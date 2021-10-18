import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { Episode, Location } from "../lib/dataTypes";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import Link from "next/link";
import moment from "moment";

interface Props {
	show: boolean;
	locationContent: Location;
	handleClose: () => void;
}
const LocationModal = (props: Props) => {
	const { show, locationContent, handleClose } = props;

	return (
		<Modal
			show={show}
			size="lg"
			className="location-modal"
			onHide={handleClose}
		>
			{locationContent.residents.length ? (
				<>
					<Modal.Header closeButton>
						<Modal.Title>
							<>
								{locationContent.name}
								<br></br>
								<span className="episode-created-at">
									Created on {moment(locationContent.created).format("lll")}
								</span>
							</>
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Table>
							<Thead>
								<Tr>
									<Th className="text-center">Name</Th>
									<Th className="text-center">Type</Th>
									<Th className="text-center">Dimension</Th>
									<Th className="text-center">Residents</Th>
								</Tr>
							</Thead>
							<Tbody>
								<Tr>
									<Td>{locationContent.name}</Td>
									<Td>{locationContent.type}</Td>
									<Td>{locationContent.dimension}</Td>
									<Td>{locationContent.residents.length}</Td>
								</Tr>
							</Tbody>
						</Table>
					</Modal.Body>
					<Modal.Footer>
						<Link href={locationContent.url}>
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
export default LocationModal;
