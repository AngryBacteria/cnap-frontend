export interface ItemDTO {
	id: number;
	active: boolean;
	categories: string[];
	description: string;
	displayInItemSets: boolean;
	iconPath: string;
	inStore: boolean;
	isEnchantment: boolean;
	maxStacks: number;
	name: string;
	price: number;
	priceTotal: number;
	requiredAlly: string;
	requiredBuffCurrencyCost: number;
	requiredBuffCurrencyName: string;
	requiredChampion: string;
	specialRecipe: number;
	to: number[];
}
