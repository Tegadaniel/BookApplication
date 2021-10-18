import React, { useState, useEffect, } from 'react';
import axios from 'axios';
import styles from './body.module.scss';
import { IPost, defaultPosts } from '../../models/data.interface';
import "bootswatch/dist/lux/bootstrap.css";
import InfiniteScroll from 'react-infinite-scroll-component';
import EndMsg from './EndMessage';
import MiddleLoader from './MiddleLoader';

const BodyBook = () => {
    const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] = useState(defaultPosts);
    const [character, setCharacter]: [IPost[], (character: IPost[]) => void] = useState(defaultPosts);
    const [loading, setLoading]: [boolean, (loading: boolean) => void] = useState<boolean>(true);
    const [hasMore, setHasMore]: [boolean, (hasMore: boolean) => void] = useState<boolean>(true);
    const [error, setError]: [string, (error: string) => void] = useState("");
    const [search, setSearch] = useState("");
    const [page, setPage]: [number, (page: number) => void] = useState<number>(2);


    const fetchData = async () => {
        const bookAPI = 'https://www.anapioficeandfire.com/api/books?page=1&pageSize=10';
        const characterAPI = 'https://www.anapioficeandfire.com/api/characters?page=1&pageSize=10';

        const getCharacter = axios.get<IPost[]>(characterAPI)
        const getBooks = axios.get<IPost[]>(bookAPI)
        try {
            await axios.all([getBooks, getCharacter])
                .then(
                    axios.spread((...allData) => {
                        const allBookData = allData[0]
                        const allCharacterData = allData[1]
                        setPosts(allBookData.data);
                        setCharacter(allCharacterData.data)
                        setLoading(false);
                    })
                )
        }
        catch (ex: any) {
            if (ex.response.status === 404) {
                setError('The server could not find this page.')
                setLoading(false);
            } else {
                setError('The server did not respond the data we wanted. We apologize for the inconvenience.')
            }
        }
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

    const filteredPost = posts.filter((post) =>
        post.name.toLowerCase().includes(search.toLowerCase()) ||
        post.isbn.toLowerCase().includes(search.toLowerCase()) ||
        post.publisher.toLowerCase().includes(search.toLowerCase()) ||
        (new Date(post.released).toDateString()).toLowerCase().includes(search.toLowerCase()) ||
        post.authors.map(author => author.toLowerCase()).join(",").includes(search.toLowerCase())
    )

    const filteredCharacter = character.filter((character) => (
        character.culture.toLowerCase().includes(search.toLowerCase()) ||
        character.name.toLowerCase().includes(search.toLowerCase())
    ))

    return (
        <>
            {loading && search.length === 0 ? <MiddleLoader /> :
                <InfiniteScroll
                    style={{ overflow: "hidden" }}
                    dataLength={character.length}
                    next={fetchMorePost}
                    hasMore={hasMore}
                    loader={<MiddleLoader />}
                    endMessage={<EndMsg />}
                >
                    <div className={styles.p__container} >
                        <div className="row">
                            <div className="col-sm-4  pb-3 pt-3">
                                <div className="form-group">
                                    <input
                                        type="search"
                                        name="search"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search"
                                        className="form-control"
                                        id="search"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.p__grid}>
                            {posts.length > 0 && filteredPost.map((post, i) => (
                                <div key={i * 2} className="card card-body">
                                    <h5>Publisher: {post.publisher}</h5>
                                    <p className="text-left">Name: {post.name}</p>
                                    <p className="text-left">Author: {post.authors}</p>
                                    <p className="text-right">ISBN: {post.isbn}</p>
                                    <p className="text-right">Date: {new Date(post.released).toDateString()}</p>
                                </div>
                            ))}
                            {character.length > 0 && filteredCharacter.map((character, i) => (
                                <div key={i * 3} className="card card-body">
                                    <h5>Character Name: {character.name ? character.name : "Name not present"}</h5>
                                    <p className="text-left">Gender: {character.gender ? character.gender : "Gender not present"}</p>
                                    <p className="text-right">Aliases: {character.aliases.length ? character.aliases : "Aliases not present"}</p>
                                    <p className="text-right">Culture: {character.culture ? character.culture : "Culture not present"}</p>
                                    <p className="text-right">Books: {character.books.length ? character.books.length : " No books present"}</p>
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