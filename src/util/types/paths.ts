import { type ReactElement } from 'react';

export type Path = {
	name: string;
	path: string;
	jsx?: JSX.Element;
	icon?: string | ReactElement;
	newTab?: boolean;
	label?: string;
};

export type FooterCategory = {
	title: string;
	paths: Path[];
};
