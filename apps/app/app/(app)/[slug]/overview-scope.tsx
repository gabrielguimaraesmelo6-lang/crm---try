"use client";

import { ToggleGroup, ToggleGroupItem } from "@crm/ui/components/toggle-group";
import { useQueryState } from "nuqs";
import {
	OVERVIEW_SCOPES,
	type OverviewScope,
	overviewParsers,
} from "./overview-search-params";

const LABELS: Record<OverviewScope, string> = {
	me: "Eu",
	everyone: "Todos",
};

function isScope(value: string): value is OverviewScope {
	return (OVERVIEW_SCOPES as readonly string[]).includes(value);
}

export function OverviewScopeToggleFallback() {
	return (
		<ToggleGroup
			type="single"
			variant="outline"
			size="sm"
			spacing={0}
			disabled
			aria-label="Números de quem exibir"
		>
			{OVERVIEW_SCOPES.map((value) => (
				<ToggleGroupItem key={value} value={value}>
					{LABELS[value]}
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	);
}

export function OverviewScopeToggle() {
	const [scope, setScope] = useQueryState("scope", overviewParsers.scope);

	return (
		<ToggleGroup
			type="single"
			variant="outline"
			size="sm"
			spacing={0}
			value={scope}
			onValueChange={(next) => {
				if (isScope(next)) void setScope(next);
			}}
			aria-label="Números de quem exibir"
		>
			{OVERVIEW_SCOPES.map((value) => (
				<ToggleGroupItem key={value} value={value}>
					{LABELS[value]}
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	);
}
