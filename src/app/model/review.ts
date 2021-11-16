import { Time } from "@angular/common";
import { IUser } from "./user";

export interface IReview {
    id: number,
    authorId: number,
    stars: number,
    text: string,
    submitted: Date
}