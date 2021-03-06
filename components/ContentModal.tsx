import { Button, Modal, Spinner } from "react-bootstrap"
import { Characters, Episode, Location } from "../lib/dataTypes"
import Image from "next/image"
import moment from "moment"
import Link from "next/link"
import { useEffect, useState } from "react"
import EpisodeModal from "./EpisodeModal"
import getters from "../lib/getData"
import { episode_skeleton, location_skeleton } from "../lib/data-skeleton"
import LocationModal from "./LocationModal"
import { toast } from "react-toastify"
interface Props {
	visible: boolean
	modalContent: Characters
	handleClose: () => void
}
const ContentModal = (props: Props) => {
	const { visible, modalContent, handleClose } = props
	const [show, setShow] = useState(false)
	const [showLocationModal, setShowLocationModal] = useState(false)
	const [episode, setEpisode] = useState<Episode>(episode_skeleton)
	const [location, setLocation] = useState<Location>(location_skeleton)
	const [episodeNumber, setEpisodeNumber] = useState<number>(0)

	const handleOpen_episode_modal = () => {
		setShow(true)
	}
	const handleClose_episode_modal = () => {
		setShow(false)
	}
	const handleOpen_location_modal = () => {
		setShowLocationModal(true)
	}
	const handleClose_location_modal = () => {
		setShowLocationModal(false)
	}
	const getLocationDetails = (location: string) => {
		getters
			.getLocation(location)
			.then((response) => {
				setLocation(response)
				handleOpen_location_modal()
			})
			.catch((e) => {
				toast(`Error: ${e.message}`, {
					position: "bottom-center",
					type: "error",
				})
			})
	}

	const fetchEpisode = (number: number) => {
		getters
			.getEpisode(number)
			.then((response) => {
				setEpisode(response)
				handleOpen_episode_modal()
			})
			.catch((e) => {
				toast(`Error: ${e.message}`, {
					position: "bottom-center",
					type: "error",
				})
			})
	}
	const episode_number_filtered_from_text = (text: string) => {
		return Number(text.split("https://rickandmortyapi.com/api/episode/")[1])
	}
	useEffect(() => {
		return () => {
			setEpisode(episode_skeleton)
			setLocation(location_skeleton)
			setEpisodeNumber(0)
			handleClose_episode_modal()
		}
	}, [episodeNumber])

	return (
		<Modal show={visible} size="lg" onHide={handleClose}>
			{modalContent.name ? (
				<>
					<Modal.Header closeButton>
						<Modal.Title>
							<h1>
								#{modalContent?.id}: {modalContent?.name}
							</h1>
							<span className="float-right episode-created-at">
								Created on {moment(modalContent.created).format("lll")}{" "}
							</span>
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="d-flex container flex-column">
							<div className="d-flex justify-content-center align-items-center flex-lg-row flex-xl-row flex-xxl-row flex-column">
								<div className="container col">
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
								<div className="d-flex flex-column px-5 col">
									<div className="d-flex align-items-baseline">
										<h4>
											<strong>Origin</strong>
										</h4>
										{":"}
										<h5>&nbsp;&nbsp;{modalContent.origin?.name}</h5>
									</div>
									<div className="d-flex align-items-baseline">
										<Button
											onClick={() => {
												getLocationDetails(modalContent.location?.name)
											}}
											variant="secondary"
										>
											Location Details
										</Button>
									</div>
									<div className="d-flex align-items-baseline">
										<h4>
											<strong>Type</strong>
										</h4>
										{":"}
										<h5>
											&nbsp;&nbsp;
											{modalContent.type ? modalContent.type : "unknown"}
										</h5>
									</div>
									<div className="d-flex align-items-baseline">
										<h4>
											<strong>Gender</strong>
										</h4>
										{":"}
										<h5>
											&nbsp;&nbsp;
											{modalContent.gender ? modalContent.gender : "unknown"}
										</h5>
									</div>
									<h4>
										<strong>Episodes</strong>
									</h4>
									<div className="episode-list d-flex flex-wrap">
										{modalContent.episode &&
											modalContent.episode.map((ep) => {
												return (
													<Button
														key={ep}
														variant="outline-primary"
														className="m-2"
														onClick={(e) => {
															e.preventDefault()

															const number = episode_number_filtered_from_text(
																ep
															)
															fetchEpisode(number)
														}}
													>
														{ep.replace(
															"https://rickandmortyapi.com/api/episode/",
															"Ep ID #"
														)}
													</Button>
												)
											})}
									</div>
								</div>
							</div>
						</div>
					</Modal.Body>
					<Modal.Footer>
						{/* <Link href={modalContent.url}>
							<a>API Response</a>
						</Link> */}
						<Button
							variant="danger"
							onClick={(e) => {
								e.preventDefault()
								handleClose()
							}}
						>
							Close
						</Button>
					</Modal.Footer>

					<EpisodeModal
						show={show}
						episodeContent={episode}
						handleClose={handleClose_episode_modal}
					/>
					<LocationModal
						show={showLocationModal}
						locationContent={location}
						handleClose={handleClose_location_modal}
					/>
				</>
			) : (
				<Spinner animation="border" variant="primary" />
			)}
		</Modal>
	)
}
export default ContentModal
