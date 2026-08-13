import { mailboxGrantsNeeded } from "@crm/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthHeading, AuthShell } from "@/components/auth-shell";
import { requireSession, signInAccounts } from "@/lib/session";
import { GrantAccess } from "./grant-access";

export const metadata: Metadata = {
	title: "Conceder acesso",
};

export const instant = false;

const DESCRIPTION: Record<string, string> = {
	google:
		"Este CRM lê seu Gmail e Calendar para que reuniões e threads de e-mail apareçam na empresa certa. É somente leitura — nada é enviado em seu nome.",
	microsoft:
		"Este CRM lê seu e-mail do Outlook para que threads de e-mail apareçam na empresa certa. É somente leitura — nada é enviado em seu nome.",
};

const BOTH =
	"Este CRM lê seu e-mail e calendário para que reuniões e threads de e-mail apareçam na empresa certa. É somente leitura — nada é enviado em seu nome.";

export default async function GrantAccessPage() {
	const { user } = await requireSession();

	const providers = mailboxGrantsNeeded(await signInAccounts(user.id));

	if (providers.length === 0) {
		redirect("/");
	}

	const only = providers.length === 1 ? providers[0] : undefined;

	return (
		<AuthShell>
			<AuthHeading
				title="Mais um passo"
				description={(only ? DESCRIPTION[only] : undefined) ?? BOTH}
			/>

			<GrantAccess providers={providers} />

			<p className="text-center text-muted-foreground text-sm/5">
				Somente conversas com empresas no CRM são armazenadas. E-mails pessoais
				são descartados sem serem salvos.
			</p>
		</AuthShell>
	);
}
