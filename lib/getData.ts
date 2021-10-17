import axios, { AxiosResponse } from "axios";
import { Routes, Characters, CharEndpoint, Episode } from "./dataTypes";

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

const getCharacterEndpoint = async (page: number): Promise<CharEndpoint> => {
	let characters: CharEndpoint;
	const headers = {
		"Access-Control-Allow-Origin": "*",
		"Content-Type": "application/json",
	};
	characters = await axios
		.get(`/api/get-characters/${page}`, { headers: headers })
		.then((res: AxiosResponse<CharEndpoint>) => {
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

export default { getRoutes, getCharacters, getCharacterEndpoint, getEpisode };
