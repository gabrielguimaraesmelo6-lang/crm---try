"use client";

import { authClient } from "@crm/auth/client";
import { Button } from "@crm/ui/components/button";
import { useState } from "react";
import { toast } from "sonner";

const CONNECT_ERRORS: Record<string, string> = {
	access_denied: "A instalação do Slack foi cancelada antes que o acesso fosse concedido.",
	account_already_linked_to_different_user:
		"Esse instalador do Slack já está vinculado a outra conta do CRM.",
	"email_doesn't_match":
		"O e-mail do instalador do Slack precisa corresponder à conta do CRM com a qual você está conectado.",
	oauth_code_verification_failed:
		"O Slack rejeitou as credenciais do app ou a URL de redirecionamento. Verifique o ID do cliente, o segredo do cliente e a URL de redirecionamento OAuth, depois tente novamente.",
	user_info_is_missing:
		"O Slack não retornou o perfil do instalador. Confirme que o app tem users:read e users:read.email, reinstale-o e tente novamente.",
};

async function startSlackOAuth(slug: string) {
	try {
		const { error } = await authClient.oauth2.link({
			providerId: "slack",
			callbackURL: `${window.location.origin}/${slug}/settings/connections/slack/people`,
			errorCallbackURL: `${window.location.origin}/${slug}/settings/connections/slack?provider=slack`,
		});
		if (error) toast.error(error.message || "Não foi possível conectar o Slack.");
	} catch (error) {
		toast.error(
			error instanceof Error ? error.message : "Não foi possível conectar o Slack.",
		);
	}
}

export function SlackReconnectButton({ slug }: { slug: string }) {
	const [pending, setPending] = useState(false);

	return (
		<Button
			disabled={pending}
			onClick={async () => {
				setPending(true);
				await startSlackOAuth(slug);
				setPending(false);
			}}
			size="xs"
			variant="contrast"
		>
			{pending ? "Abrindo o Slack…" : "Reconectar"}
		</Button>
	);
}

export function SlackConnectButton({
	slug,
	configured,
	connectError,
}: {
	slug: string;
	configured: boolean;
	connectError?: string;
}) {
	const [pending, setPending] = useState(false);
	const connect = async () => {
		setPending(true);
		await startSlackOAuth(slug);
		setPending(false);
	};
	return (
		<div className="flex min-w-0 flex-col gap-2">
			<Button onClick={() => void connect()} disabled={!configured || pending}>
				{pending
					? "Abrindo o Slack…"
					: configured
						? "Conectar Slack"
						: "O Slack não está configurado"}
			</Button>
			{connectError ? (
				<p role="alert" className="max-w-sm text-destructive text-xs">
					{CONNECT_ERRORS[connectError] ??
						`Não foi possível conectar o Slack (${connectError.replaceAll("_", " ")}).`}
				</p>
			) : null}
		</div>
	);
}
