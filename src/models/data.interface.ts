export interface IPost {
    publisher: string;
    name : string;
    isbn: string;
    authors: string[];
    released: string;
 }

 export const defaultPosts: IPost[] = [];
