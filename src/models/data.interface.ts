export interface IPost {
    publisher: string;
    name : string;
    isbn: string;
    authors: string[];
    released: string;
    culture: string;
    gender:string;
    aliases: string[];
    books: string[];
 }
 export interface IBook {
    publisher: string;
    name : string;
    isbn: string;
    authors: string[];
    released: string;
 }


 export const defaultPosts: IPost[] = [];