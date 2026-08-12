"use client";

import Renew from "@carbon/icons-react/es/Renew";
import TrashCan from "@carbon/icons-react/es/TrashCan";
import {
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
} from "@crm/ui/components/dropdown-menu";
import { formatCount } from "@crm/ui/lib/format";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import {
	BulkActionsMenu,
	BulkDeleteDialog,
	BulkOwnerMenu,
	reportBulk,
} from "@/components/crm/bulk-actions";
import { useCrmCache } from "@/lib/trpc/cache";
import { useTRPC } from "@/lib/trpc/client";

function contacts(count: number): string {
	return formatCount(count, "contact");
}

export function ContactsBulkActions({
	ids,
	onDone,
}: {
	ids: string[];
	onDone: () => void;
}) {
	const trpc = useTRPC();
	const cache = useCrmCache();
	const users = useQuery(trpc.users.list.queryOptions());
	const companies = useQuery(trpc.companies.options.queryOptions({ q: "" }));
	const [confirming, setConfirming] = useState(false);

	const onError = (error: { message: string }) => toast.error(error.message);

	const assignOwner = useMutation(
		trpc.contacts.bulkAssignOwner.mutationOptions({
			onSuccess: async (result) => {
				await cache.contact();
				reportBulk(result, (count) => `${contacts(count)} reatribuído(s).`);
				onDone();
			},
			onError,
		}),
	);

	const setCompany = useMutation(
		trpc.contacts.bulkSetCompany.mutationOptions({
			onSuccess: async (result) => {
				await cache.contact();
				reportBulk(result, (count) => `${contacts(count)} movido(s).`);
				onDone();
			},
			onError,
		}),
	);

	const enrich = useMutation(
		trpc.contacts.bulkEnrich.mutationOptions({
			onSuccess: async (result) => {
				await cache.contact();
				reportBulk(
					result,
					(count) => `Consultando ${contacts(count)} — a tabela será atualizada.`,
				);
				onDone();
			},
			onError,
		}),
	);

	const remove = useMutation(
		trpc.contacts.bulkDelete.mutationOptions({
			onSuccess: async (result, variables) => {
				await cache.removedMany({ kind: "contact", ids: variables.ids });
				reportBulk(result, (count) => `${contacts(count)} excluído(s).`);
				setConfirming(false);
				onDone();
			},
			onError,
		}),
	);

	const pending =
		assignOwner.isPending ||
		setCompany.isPending ||
		enrich.isPending ||
		remove.isPending;

	return (
		<>
			<BulkActionsMenu pending={pending}>
				<BulkOwnerMenu
					users={users.data ?? []}
					unassignedLabel="Ninguém"
					onSelect={(ownerId) => assignOwner.mutate({ ids, ownerId })}
				/>
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>Mover para empresa</DropdownMenuSubTrigger>
					<DropdownMenuSubContent className="max-h-72 overflow-y-auto">
						<DropdownMenuGroup>
							<DropdownMenuItem
								onSelect={() => setCompany.mutate({ ids, companyId: null })}
							>
								Sem empresa
							</DropdownMenuItem>
							{companies.data?.length === 0 ? (
								<DropdownMenuLabel>Ainda não há empresas.</DropdownMenuLabel>
							) : (
								companies.data?.map((company) => (
									<DropdownMenuItem
										key={company.id}
										onSelect={() =>
											setCompany.mutate({ ids, companyId: company.id })
										}
									>
										{company.name}
									</DropdownMenuItem>
								))
							)}
						</DropdownMenuGroup>
					</DropdownMenuSubContent>
				</DropdownMenuSub>
				<DropdownMenuGroup>
					<DropdownMenuItem onSelect={() => enrich.mutate({ ids })}>
						<Renew />
						Reenriquecer
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem
						variant="destructive"
						onSelect={() => setConfirming(true)}
					>
						<TrashCan />
						Excluir
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</BulkActionsMenu>

			<BulkDeleteDialog
				open={confirming}
				onOpenChange={setConfirming}
				title={`Excluir ${contacts(ids.length)}?`}
				description="Os endereços de e-mail deles são suprimidos, então a sincronização da caixa de entrada não vai arquivá-los novamente. Isso não pode ser desfeito."
				onConfirm={() => remove.mutate({ ids })}
			/>
		</>
	);
}
