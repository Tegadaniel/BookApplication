import React, { FC, useState, useEffect, } from 'react';
import axios, { CancelTokenSource } from 'axios';
import { IPost, defaultPosts } from '../models/data.interface';

const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] = React.useState(defaultPosts);
const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
const [error, setError]: [string, (error: string) => void] = React.useState("");

React.useEffect(() => {
    axios
        .get<IPost[]>('https://www.anapioficeandfire.com/api/books', {

            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 10000,
        })
        .then((response) => {
            setPosts(response.data);
            setLoading(false);
        })
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
}, []);