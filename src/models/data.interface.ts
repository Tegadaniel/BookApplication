export interface IPost {
    publisher: string;
    name : string;
    isbn: string;
    author: string[];
    date: Date;
 }

 export const defaultPosts: IPost[] = [];
