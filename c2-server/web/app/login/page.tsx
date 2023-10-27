"use client"
import {Card, CardHeader, CardBody, CardFooter, Divider, Spacer} from "@nextui-org/react";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import {useState} from "react";
import { signIn } from "next-auth/react";
import {useSearchParams, useRouter} from "next/navigation";
export default function Login() {

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") || "/profile";
	const router = useRouter();

	async function login() {
		console.log("Logging in with username: " + username + " and password: " + password);
		setLoading(true);

		try {

			const res = await signIn("credentials", {
				redirect: false,
				email: username,
				password: password,
				callbackUrl,
			});

			console.log(res);
			if (!res?.error) {
				router.push(callbackUrl);
			} else {
				setError("invalid email or password");
			}

		} catch (error) {

			setLoading(false);
			setError(error as string);
		}

		setLoading(false)
	}

	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">

			<Card className={"w-[400px]"}>
				<CardHeader className="flex gap-3">
					<div className="flex flex-col">
						<p className="text-md">Login</p>
					</div>
				</CardHeader>
				<Divider/>
				<CardBody>
					<Input type="text" value={username} onChange={(event) => {
						setUsername(event.target.value);
					}} label="Username" placeholder="Enter your username" />
					<Spacer x={8} />
					<Input type="password" value={password} onChange={(event) => {
						setPassword(event.target.value);
					}} label="Password" />
				</CardBody>
				<Divider/>
				<CardFooter className={"justify-center"} >
					<Button color="primary" onClick={login} isLoading={loading}>
						Login
					</Button>
				</CardFooter>
			</Card>
		</section>
	);
}
