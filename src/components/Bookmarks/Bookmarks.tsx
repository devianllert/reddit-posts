import React, { useState, ReactElement, ChangeEvent } from 'react';
import { Box, Paper } from '@material-ui/core';
import { useQuery } from 'react-query';
import { useDebouncedCallback, useLocalStorage } from 'react-essential-tools';

import { BookmarkedPost } from './types';

import { fetchPosts } from '../../services/posts.service';

import BookmarksSearch from './BookmarksSearch';
import BookmarksList from './BookmarksList';

const CACHE_TIME = 120 * 1000; // 2 minutes

const Bookmarks = (): ReactElement => {
  const [bookmarkedPosts, setBookmarkedPosts] = useLocalStorage<BookmarkedPost[]>('posts', []);

  const [searchSubreddit, setSearchSubreddit] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const [debouncedSetState] = useDebouncedCallback(setDebouncedValue, 200);

  const { status, data } = useQuery(debouncedValue, fetchPosts, {
    staleTime: CACHE_TIME,
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

  const [debouncedChangeBookmarkNote] = useDebouncedCallback((id: string, note: string): void => {
    setBookmarkedPosts((prevBookmarkedPosts) => prevBookmarkedPosts.map((post) => {
      if (post.id === id) {
        return {
          ...post,
          note,
        };
      }

      return post;
    }));
  }, 300);

  const handleLikeBookmark = (id: string): void => {
    setBookmarkedPosts((prevBookmarkedPosts) => prevBookmarkedPosts.map((post) => {
      if (post.id === id) {
        return {
          ...post,
          liked: !post.liked,
        };
      }

      return post;
    }));
  };

  const handleDeleteBookmark = (id: string): void => {
    setBookmarkedPosts((prevBookmarkedPosts) => prevBookmarkedPosts.filter((post) => post.id !== id));
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      maxWidth={640}
    >
      <Box mb={2}>
        <BookmarksSearch
          status={status}
          value={searchSubreddit}
          onChange={handleChange}
          onItemClick={handleItemClick}
          options={data}
        />
      </Box>

      <Box
        component={Paper}
        width="100%"
        maxHeight={640}
        overflow="auto"
      >
        <BookmarksList
          bookmarks={bookmarkedPosts}
          onItemLike={handleLikeBookmark}
          onItemDelete={handleDeleteBookmark}
          onItemChangeNote={debouncedChangeBookmarkNote}
        />
      </Box>
    </Box>
  );
};

export default Bookmarks;
