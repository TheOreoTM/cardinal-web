import { signIn, signOut } from "next-auth/react";
import { Icons } from "../Icons";
import { Button } from "./Button";

export const LoginButton = () => {
	return (
		<Button
			variant="outline"
			className="flex gap-2 px-4 hover:bg-white hover:text-background"
			onClick={() =>
				signIn("discord", {
					callbackUrl: `${location.origin}/dashboard`,
				})
			}>
			<Icons.login className="h-[1.2rem] w-[1.2rem]" />
			<p className="whitespace-nowrap">Sign in</p>
		</Button>
	);
};

export const LogoutButton = () => {
	return <Button onClick={() => signOut()}>Sign Out</Button>;
};
