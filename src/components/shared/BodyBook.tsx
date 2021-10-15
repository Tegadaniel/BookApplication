import React, { useState, useEffect, } from 'react';
import axios from 'axios';
import styles from './body.module.scss';
import { IPost, defaultPosts } from '../../models/data.interface';
import "bootswatch/dist/lux/bootstrap.css";
import Loader from 'react-loader-spinner';

const BodyBook = () => {
    const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] = useState(defaultPosts);
    const [character, setCharacter]: [IPost[], (character: IPost[]) => void] = useState(defaultPosts);
    const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
    const [error, setError]: [string, (error: string) => void] = React.useState("");

    const fetchData = () => {
        const bookAPI = 'https://www.anapioficeandfire.com/api/books';
        const characterAPI = 'https://www.anapioficeandfire.com/api/characters';

        const getCharacter = axios.get<IPost[]>(characterAPI)
        const getBooks = axios.get<IPost[]>(bookAPI)


        axios.all([getBooks, getCharacter]).then(
            axios.spread((...allData) => {
                const allBookData = allData[0]
                const allCharacterData = allData[1]

                setPosts(allBookData.data);
                setCharacter(allCharacterData.data)
                setLoading(false);
            })
        )
            .catch((ex) => {
                let error = axios.isCancel(ex)
                    ? 'Request Cancelled'
                    : ex.code === 'ECONNABORTED'
                        ? 'A timeout has occurred'
                        : ex.response.status === 404
                            ? 'Resource Not Found'
                            : 'An unexpected error has occurred';

                setError(error);
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            {loading ? <Loader type="ThreeDots" color="gray" height="100" width="100" /> :
                <div className={styles.p__container} >
                    <div className="row">
                        <div className="col-sm-4 pb-5">
                            <select
                                className="form-select"
                                id="exampleSelect1"
                                name="name"
                            >
                                <option value="">Choose a Category</option>
                                <option value="menclothing">Men's Clothing</option>
                                <option value="jewelery">Jewelery</option>
                                <option value="electronics">Electronics</option>
                                <option value="womenclothing">Women's Clothing</option>
                            </select>
                        </div>
                        <div className="col-sm-4"></div>
                        <div className="col-sm-4  pb-5">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="search"
                                    placeholder="Search product"
                                    className="form-control"
                                    id="search"
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.p__grid}>
                        {posts.map((post) => (
                            <div key={post.name} className="card card-body">
                                <p>Publisher: {post.publisher}</p>
                                <h5 className="text-left">Name: {post.name}</h5>
                                <h5 className="text-left">Author: {post.authors}</h5>
                                <h5 className="text-right">ISBN: {post.isbn}</h5>
                                <h5 className="text-right">Date: {new Date(post.released).toDateString()}</h5>
                            </div>
                        ))}
                    </div>
                    {error && <p className="error">{error}</p>}
                    <div className={styles.p__footer}></div>
                </div>
            }
        </>
    )
}

export default BodyBook;