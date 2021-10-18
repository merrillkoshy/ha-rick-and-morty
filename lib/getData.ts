import axios, { AxiosResponse } from "axios";
import { Routes, Characters, EndPoint, Episode, Location } from "./dataTypes";

const getRoutes = async (): Promise<Routes> => {
	let routes: Routes;
	routes = await axios
		.get("/api/get")
		.then((res: AxiosResponse<Routes>) => {
			const response = res.data;
			return response;
		})
		.catch((e) => {
			return e;
		});
	return await routes;
};

const getCharacters = async (): Promise<Characters> => {
	let characters: Characters;
	const headers = {
		"Access-Control-Allow-Origin": "*",
		"Content-Type": "application/json",
	};
	characters = await axios
		.get("/api/get-characters", { headers: headers })
		.then((res: AxiosResponse<Characters>) => {
			const response = res.data;
			return response;
		})
		.catch((e) => {
			return e;
		});
	return await characters;
};

const getCharacterEndpoint = async (page: number): Promise<EndPoint> => {
	let characters: EndPoint;
	const headers = {
		"Access-Control-Allow-Origin": "*",
		"Content-Type": "application/json",
	};
	characters = await axios
		.get(`/api/get-characters/${page}`, { headers: headers })
		.then((res: AxiosResponse<EndPoint>) => {
			const response = res.data;
			return response;
		})
		.catch((e) => {
			return e;
		});
	return await characters;
};

const getEpisode = async (epno: number): Promise<Episode> => {
	let episode: Episode;
	const headers = {
		"Access-Control-Allow-Origin": "*",
		"Content-Type": "application/json",
	};
	episode = await axios
		.get(`/api/get-episodes/${epno}`, { headers: headers })
		.then((res: AxiosResponse<Episode>) => {
			const response = res.data;
			return response;
		})
		.catch((e) => {
			return e;
		});
	return await episode;
};
const getLocation = async (locname: string): Promise<Location> => {
	let location: Location;
	const headers = {
		"Access-Control-Allow-Origin": "*",
		"Content-Type": "application/json",
	};
	location = await axios
		.get(`/api/get-locations/${locname}`, { headers: headers })
		.then((res: AxiosResponse<EndPoint>) => {
			const response = res.data;
			return response.results[0] as Location;
		})
		.catch((e) => {
			return e;
		});
	return await location;
};

export default {
	getRoutes,
	getCharacters,
	getCharacterEndpoint,
	getEpisode,
	getLocation,
};
