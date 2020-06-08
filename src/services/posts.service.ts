/* eslint-disable import/prefer-default-export */
import api from './api';

export interface Post {
  id: string;
  title: string;
  permalink: string;
}

interface Subreddit {
  data: {
    children: {
      data: Post;
    }[];
  };
}

export const fetchPosts = async (subreddit: string): Promise<Post[]> => {
  const { data } = await api.get<Subreddit>(`https://www.reddit.com/r/${subreddit}.json`);

  // transform subreddit information to an array of posts
  return data.data.children.map((post) => post.data);
};
