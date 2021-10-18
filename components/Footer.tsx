import Image from "next/image";
import React from "react";

const Footer = () => {
	return (
		<footer
			className={
				"footer d-flex justify-content-center align-items-center flex-column mt-2"
			}
		>
			<a
				href="https://merrillkoshy.github.io/"
				target="_blank"
				rel="noopener noreferrer"
			>
				Authored by Merrill Koshy Thomas with{" "}
				<span className={"logo"}>
					<Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
				</span>
			</a>
		</footer>
	);
};
export default Footer;
