import React, { FC, useState, useEffect, } from 'react';
import { IPost, defaultPosts } from '../models/data.interface';

const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] = React.useState(defaultPosts);
const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true); 
const [error, setError]: [string, (error: string) => void] = React.useState("");
