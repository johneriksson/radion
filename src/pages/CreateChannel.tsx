import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { useCreateChannelMutation } from "../generated/graphql";
import { useIsAuth } from "../hooks/useIsAuth";

export const CreateChannel: React.FC = () => {
	useIsAuth();

	const history = useHistory();
	const [title, setTitle] = React.useState("");
	const [streamURL, setStreamURL] = React.useState("");
	const [, createPost] = useCreateChannelMutation();

	const onSubmit: (event: React.FormEvent<HTMLFormElement>) => void = async (e) => {
		e.preventDefault();

		const { error } = await createPost({ input: { title, streamURL }});
		if (!error) {
			history.push("/");
		}
	};

	return (
		<div className="form-page">
			<h1>Create channel</h1>
			<form onSubmit={onSubmit}>
				<Input
					name="title"
					type="text"
					label="Title"
					value={title}
					onChange={e => setTitle(e.target.value)}
					required
				/>

				<Input
					name="streamURL"
					type="text"
					label="Stream URL"
					value={streamURL}
					onChange={e => setStreamURL(e.target.value)}
					required
				/>

				<Button
					type="submit"
					title="Submit"
				/>
			</form>
		</div>
	);
}
