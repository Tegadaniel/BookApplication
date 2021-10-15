import React, { useState, useEffect, } from 'react';
import axios from 'axios';
import styles from './body.module.scss';
import { IPost, defaultPosts } from '../../models/data.interface';
import "bootswatch/dist/lux/bootstrap.css";
import Loader from 'react-loader-spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import EndMsg from './EndMessage';

const BodyBook = () => {
    const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] = useState(defaultPosts);
    const [character, setCharacter]: [IPost[], (character: IPost[]) => void] = useState(defaultPosts);
    const [loading, setLoading]: [boolean, (loading: boolean) => void] = useState<boolean>(true);
    const [hasMore, setHasMore]: [boolean, (hasMore: boolean) => void] = useState<boolean>(true);
    const [error, setError]: [string, (error: string) => void] = useState("");
    const [page, setPage]: [number, (page: number) => void] = useState<number>(2);

    const fetchData = () => {
        const bookAPI = 'https://www.anapioficeandfire.com/api/books?page=1&pageSize=10';
        const characterAPI = 'https://www.anapioficeandfire.com/api/characters?page=1&pageSize=10';

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
        ).catch((ex) => {
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


    const fetchMore = async () => {
        const urls = [
            `https://www.anapioficeandfire.com/api/books?page=${page}&pageSize=10`,
            `https://www.anapioficeandfire.com/api/characters?page=${page}&pageSize=10`
        ]
        try {
            let res = await Promise.all(urls.map(e => fetch(e)))
            let resJson = await Promise.all(res.map(e => e.json()))
            return resJson;
        } catch (err) {
            console.log(err);
        }
    }

    const fetchMorePost = async () => {
        const postData: any = await fetchMore();
        setPosts([...posts, ...postData[0]]);
        setCharacter([...character, ...postData[1]]);

        if (postData.length === 0) {
            setHasMore(false);
        }
        setPage(page + 1);
    }

    return (
        <>
            {loading ? <Loader type="ThreeDots" color="gray" height="100" width="100" /> :
                <InfiniteScroll
                    dataLength={character.length}
                    next={fetchMorePost}
                    hasMore={hasMore}
                    loader={<Loader type="ThreeDots" color="gray" height="100" width="100" />}
                    endMessage={<EndMsg />}
                >
                    <div className={styles.p__container} >
                        <div className="row">
                            <div className="col-sm-4 pb-5">
                                <select
                                    className="form-select"
                                    id="exampleSelect1"
                                    name="name">
                                    <option value="">Choose a Category</option>
                                    <option value="publisher">Publisher</option>
                                    <option value="name">Name</option>
                                    <option value="authors">Author</option>
                                    <option value="released">Date</option>
                                    <option value="culture">Culture</option>
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
                            {posts.length > 0 ? posts.map((post, i) => (
                                <div key={i * 2} className="card card-body">
                                    <p>Publisher: {post.publisher}</p>
                                    <h5 className="text-left">Name: {post.name}</h5>
                                    <h5 className="text-left">Author: {post.authors}</h5>
                                    <h5 className="text-right">ISBN: {post.isbn}</h5>
                                    <h5 className="text-right">Date: {new Date(post.released).toDateString()}</h5>
                                </div>
                            )) : " "}
                            {character.length > 0 && character.map((character, i) => (
                                <div key={i * 3} className="card card-body">
                                    <p>Character Name: {character.name ? character.name : "Name not present"}</p>
                                    <h5 className="text-left">Gender: {character.gender}</h5>
                                    <h5 className="text-right">Culture: {character.culture}</h5>
                                    <h5 className="text-right">Aliases: {character.aliases}</h5>
                                    <h5 className="text-right">Books: {character.books.length ? character.books.length : " No books present"}</h5>
                                </div>))}
                        </div>
                        {error && <p className="error">{error}</p>}
                        <div className={styles.p__footer}></div>
                    </div>
                </InfiniteScroll>
            }
        </>
    )
}

export default BodyBook;