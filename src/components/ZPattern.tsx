import Image, { ImageProps } from 'next/image';
import { ReactElement } from 'react';

export default function ZPattern({
	children,
	imageProps,
	className = '',
}: ZPatternProps) {
	return (
		<div
			className={`flex flex-col md:flex-row text-white text-center md:text-left mx-auto w-full items-center ${className}`}
		>
			{children}

			<Image {...imageProps} alt='' />
		</div>
	);
}

type ZPatternProps = {
	children: ReactElement;
	imageProps: ImageProps;
	className?: string;
};
