import React from 'react'
import BodyBook from './shared/BodyBook'
import BookFooter from './shared/BookFooter'
import { Helmet } from 'react-helmet-async';
import BookHeader from './shared/BookHeader'


export default function BookHome() {
    return (
        <div className="container">
            <Helmet>
                <title>{"React Bookstore"}</title>
                <meta name="description" content={ "React X Typescript Bookstore"} />
            </Helmet>
            <BookHeader />
            <BodyBook />
            <BookFooter />
        </div>
    )
}
