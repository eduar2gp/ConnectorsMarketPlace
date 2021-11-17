import { IBenefit } from "./benefit";
import { IFeature } from "./feature";

export interface IProduct {
    productId: string;
    productName: string;
    productDescription: string;
    overview: string;
    stars: number;
    logoUrl: string;
    benefits: IBenefit [];
    features: IFeature [];
}