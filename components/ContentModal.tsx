import { Button, Modal } from "react-bootstrap";
import { Characters, Episode } from "../lib/dataTypes";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import EpisodeModal from "./EpisodeModal";
import getters from "../lib/getData";
import { episode_skeleton } from "../lib/data-skeleton";
interface Props {
	visible: boolean;
	modalContent: Characters;
	handleClose: () => void;
}
const ContentModal = (props: Props) => {
	const { visible, modalContent, handleClose } = props;
	const [show, setShow] = useState(false);
	const [episode, setEpisode] = useState<Episode>(episode_skeleton);

	const handleOpen_episode_modal = () => {
		setShow(true);
	};
	const handleClose_episode_modal = () => {
		setShow(false);
	};

	const fetchEpisode = (number: number) => {
		getters.getEpisode(number).then((response) => {
			setEpisode(response);
		});
	};
	return (
		<Modal show={visible} size="lg" onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>
					<h1>{modalContent?.name}</h1>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="d-flex container flex-column">
					<div className="d-flex justify-content-center align-items-center flex-lg-row flex-xl-row flex-xxl-row">
						<div className="container">
							<Image
								src={modalContent?.image}
								height={742}
								width={742}
								alt={`${modalContent?.name} image for HA`}
							/>
							<div className="d-flex justify-content-center align-items-center">
								<span
									className={`status status-${modalContent?.status?.toLowerCase()}`}
								></span>
								<h2 className="text-center">{`${modalContent?.species} - ${modalContent?.status}`}</h2>
							</div>
						</div>
						<div className="px-5">
							<h3>Origin</h3>
							<p>{modalContent.origin?.name}</p>
							<h3>Location</h3>
							<p>{modalContent.location?.name}</p>
							<h3>Type</h3>
							<p>{modalContent.type}</p>
							<h3>Gender</h3>
							<p>{modalContent.gender}</p>
							<div className="episode-list d-flex flex-wrap">
								{modalContent.episode &&
									modalContent.episode.map((ep) => {
										return (
											<Button
												className="primary-outline m-2"
												onClick={(e) => {
													e.preventDefault();
													setShow(true);
													fetchEpisode(
														Number(
															ep.split(
																"https://rickandmortyapi.com/api/episode/"
															)[1]
														)
													);
												}}
											>
												{ep.replace(
													"https://rickandmortyapi.com/api/episode/",
													"Episode "
												)}
											</Button>
										);
									})}
							</div>
						</div>
						<span>Created at {moment(modalContent.created).format("L")} </span>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Link href={modalContent.url}>
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
			{episode.id === 0 && (
				<EpisodeModal
					show={show}
					episodeContent={episode}
					handleClose={handleClose_episode_modal}
				/>
			)}
		</Modal>
	);
};
export default ContentModal;
