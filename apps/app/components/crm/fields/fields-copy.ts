import type { RecordKind } from "@/components/crm/record-sheet/record-stack";
import type { FieldEntity } from "./fields-entity";

export const SHEET_TITLE = "Campos";

const SUBTITLE: Record<RecordKind, string> = {
	company: "Isso molda todas as empresas do seu CRM.",
	contact: "Isso molda todos os contatos do seu CRM.",
	deal: "Isso molda todos os negócios do seu CRM.",
};

export function subtitleFor(kind: RecordKind): string {
	return SUBTITLE[kind];
}

export const STANDARD_ROW = "Campos padrão";
export const STANDARD_NOTE = "somente reordenar e ocultar";
export const CUSTOM_GROUP = "Campos personalizados";
export const DRAG_NOTE = "Arraste para ordenar";
export const ARCHIVED_ROW = "Arquivado";
export const ARCHIVED_NOTE = "valores mantidos, ocultos em todo lugar";
export const NEW_FIELD = "Novo campo";
export const ORDER_NOTE = "A ordem aqui é a ordem na ficha";
export const MANUAL_ONLY = "Somente manual";
export const TABLE_NOTE = "também é uma coluna na tabela";

export const EMPTY_TITLE = "Ainda não há campos personalizados";
export const EMPTY_BODY =
	"Crie campos dinâmicos que seus agentes possam pesquisar e preencher previamente.";

export const ERROR_TITLE = "Não foi possível carregar seus campos";
export const ERROR_BODY =
	"Seus campos ainda estão lá. Tente novamente em instantes, antes de criar algo novo.";
export const RETRY = "Tentar novamente";

export const LABEL_LABEL = "Rótulo";
export const KEY_LABEL = "Chave";
export const KEY_HELP =
	"Como a API e seus agentes chamam este campo. Definida a partir do rótulo, fixada após salvar — renomear o rótulo depois nunca quebra quem o utiliza.";
export const AGENT_LABEL = "Permitir que seus agentes preencham este campo";
export const AGENT_HELP =
	"Eles propõem um valor com uma fonte, e nunca sobrescrevem o seu.";
export const BRIEF_LABEL = "O que conta como resposta";
export const BRIEF_HELP =
	"Deixe em branco e seus agentes vão se basear apenas no rótulo e no tipo.";
export const TYPE_LABEL = "Tipo";
export const OPTIONS_LABEL = "Opções";
export const ADD_OPTION = "Adicionar opção";
export const ALL_FILLED = "Nada mais para preencher";

export function optionLabel(index: number): string {
	return `Opção ${index + 1}`;
}
export const ADD_FIELD = "Criar campo";
export const CANCEL = "Cancelar";
export const SAVE = "Salvar alterações";
export const ARCHIVE = "Arquivar";
export const FILL_REST = "Preencher o restante";

const SHEET_PLACEMENT: Record<FieldEntity, string> = {
	COMPANY: "Mostrar na ficha da empresa",
	CONTACT: "Mostrar na ficha do contato",
	DEAL: "Mostrar na ficha do negócio",
};

const TABLE_PLACEMENT: Record<FieldEntity, string> = {
	COMPANY: "Oferecer como coluna na tabela de Empresas",
	CONTACT: "Oferecer como coluna na tabela de Contatos",
	DEAL: "Oferecer como coluna na tabela de Negócios",
};

export function sheetPlacement(entity: FieldEntity): string {
	return SHEET_PLACEMENT[entity];
}

export function tablePlacement(entity: FieldEntity): string {
	return TABLE_PLACEMENT[entity];
}

export const ENTITY_TABS = [
	{ kind: "company", label: "Empresas" },
	{ kind: "contact", label: "Contatos" },
	{ kind: "deal", label: "Negócios" },
] as const satisfies readonly { kind: RecordKind; label: string }[];
