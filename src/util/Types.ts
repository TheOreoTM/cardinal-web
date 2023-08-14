export type Path = {
	name: string;
	path: string;
	jsx?: JSX.Element;
	icon?: string;
	newTab?: boolean;
};

export type FooterCategory = {
	title: string;
	paths: Path[];
};
