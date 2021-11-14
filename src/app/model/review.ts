import { Time } from "@angular/common";
import { IUser } from "./user";

export interface IReview {
    authorId: number,
    stars: number,
    text: string,
    submitted: Date
}