"use client";

import { useQueryState } from "nuqs";
import { PageShellDescription, PageShellTitle } from "@/components/page-shell";
import { overviewParsers } from "./overview-search-params";

export function OverviewGreetingFallback() {
	return (
		<>
			<PageShellTitle>Bem-vindo de volta</PageShellTitle>
			<PageShellDescription>
				O que você fechou, o que ainda está em andamento e o que precisa da sua atenção hoje.
			</PageShellDescription>
		</>
	);
}

export function OverviewGreeting() {
	const [scope] = useQueryState("scope", overviewParsers.scope);

	return (
		<>
			<PageShellTitle>Bem-vindo de volta</PageShellTitle>
			<PageShellDescription>
				{scope === "me"
					? "O que você fechou, o que ainda está em andamento e o que precisa da sua atenção hoje."
					: "O que a equipe fechou, o que ainda está em andamento e o que precisa de atenção hoje."}
			</PageShellDescription>
		</>
	);
}
