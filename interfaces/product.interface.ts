export interface ProductCharactersitic {
	value: string;
	name: string;
}

export interface ReviewModel {
	_id: string;
	name: string;
	title: string;
	description: string;
	rating: number;
	createdAt: Date;

}

export interface ProductModel {
	_id: string;
	categories: string[];
	tags: string[];
	title: string;
	link: string;
	price: number;
	credit: number;
	oldPrice: number;
	description: string;
	characteristics: ProductCharactersitic[];
	createdAt: Date;
	updated: Date;
	__v: number;
	image: string;
	initialRating: number;
	reviews: ReviewModel[];
	reviewAvg?: number;
	reviewCount: number;
	advantages?: string;
	disadvantages?: string;
}