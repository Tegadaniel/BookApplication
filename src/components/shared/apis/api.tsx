import React from 'react'
import axios from 'axios'
import { IBook } from '../../../models/data.interface';

const URI = 'https://www.anapioficeandfire.com/api/books/1'

export const singleBook = async () =>{
    const {data} = await axios.get<IBook[]>(URI)

    return data;
}