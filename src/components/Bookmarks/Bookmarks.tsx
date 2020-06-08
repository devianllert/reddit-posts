import React, { useState, ReactElement, ChangeEvent } from 'react';
import { Box } from '@material-ui/core';
import { useQuery } from 'react-query';
import { useDebouncedCallback, useLocalStorage } from 'react-essential-tools';

import { BookmarkedPost } from './types';

import { fetchPosts } from '../../services/posts.service';

import BookmarksSearch from './BookmarksSearch';

const CACHE_TIME = 120 * 1000; // 2 minutes

const Bookmarks = (): ReactElement => {
  const [bookmarkedPosts, setBookmarkedPosts] = useLocalStorage<BookmarkedPost[]>('posts', []);

  const [searchSubreddit, setSearchSubreddit] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const [debouncedSetState] = useDebouncedCallback(setDebouncedValue, 200);

  const { status, data } = useQuery(debouncedValue, fetchPosts, {
    cacheTime: CACHE_TIME,
    retry: false,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setSearchSubreddit(event.target.value);
    debouncedSetState(event.target.value);
  };

  const handleItemClick = (post: BookmarkedPost): void => {
    setBookmarkedPosts((posts) => [...posts, post]);
    setSearchSubreddit('');
  };

  return (
    <Box>
      <Box mb={2}>
        <BookmarksSearch
          status={status}
          value={searchSubreddit}
          onChange={handleChange}
          onItemClick={handleItemClick}
          options={data}
        />
      </Box>
    </Box>
  );
};

export default Bookmarks;
