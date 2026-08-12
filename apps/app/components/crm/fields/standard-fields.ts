import type { FieldEntity } from "./fields-entity";

export const STANDARD_FIELDS: Record<FieldEntity, readonly string[]> = {
	COMPANY: [
		"Nome",
		"Domínio",
		"Site",
		"Telefone",
		"E-mail",
		"Cidade",
		"País",
		"Proprietário",
	],
	CONTACT: [
		"Nome",
		"Sobrenome",
		"Cargo",
		"E-mail",
		"Telefone",
		"LinkedIn",
		"GitHub",
		"Empresa",
		"Proprietário",
	],
	DEAL: [
		"Nome",
		"Valor",
		"Moeda",
		"Data de fechamento",
		"Empresa",
		"Proprietário",
		"Etapa",
	],
};
