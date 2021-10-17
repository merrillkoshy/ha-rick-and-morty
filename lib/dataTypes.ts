export type Routes = {
	characters: string;
	locations: string;
	episodes: string;
};
export type Characters = {
	id: number;
	name: string;
	status: string;
	species: string;
	type: string;
	gender: string;
	origin: {
		name: string;
		url: string;
	};
	location: {
		name: string;
		url: string;
	};
	image: string;
	episode: Array<string>;
	url: string;
	created: string;
};
export type Info = {
	count: number;
	pages: number;
	next: string;
	prev: string;
};
export type CharEndpoint = {
	info: Info;
	results: Array<Characters>;
};

export type Episode = {
	id: number;
	name: string;
	air_date: string;
	episode: string;
	characters: Array<string>;
	url: string;
	created: string;
};
