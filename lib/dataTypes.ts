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
export type EndPoint = {
	info: Info;
	results: Array<Characters> | Array<Location>;
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
export type Location = {
	id: number;
	name: string;
	type: string;
	dimension: string;
	residents: Array<string>;
	url: string;
	created: string;
};
