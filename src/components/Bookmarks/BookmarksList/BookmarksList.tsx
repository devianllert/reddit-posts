import React, { ReactElement } from 'react';
import {
  List,
  ListItem,
  Typography,
  ListItemText,
} from '@material-ui/core';

import BookmarksItem from '../BookmarksItem';

import { BookmarkedPost } from '../types';

interface Props {
  /**
   * An array of bookmarked posts
   */
  bookmarks: BookmarkedPost[];
  /**
   * Callback fired once the item has been liked.
   */
  onItemLike: (postId: string) => void;
  /**
   * Callback fired once the item has been deleted.
   */
  onItemDelete: (postId: string) => void;
  /**
   * Callback fired once the item's note has been changed.
   */
  onItemChangeNote: (postId: string, note: string) => void;
}

const BookmarksList = (props: Props): ReactElement => {
  const {
    bookmarks,
    onItemLike,
    onItemDelete,
    onItemChangeNote,
  } = props;

  const hasBookmarks = bookmarks.length > 0;

  return (
    <List>
      {!hasBookmarks && (
        <ListItem>
          <ListItemText>
            <Typography align="center">No bookmarks</Typography>
          </ListItemText>
        </ListItem>
      )}

      {hasBookmarks && bookmarks.map((bookmarkedPost) => (
        <BookmarksItem
          key={bookmarkedPost.id}
          bookmarkedPost={bookmarkedPost}
          onLike={onItemLike}
          onDelete={onItemDelete}
          onChangeNote={onItemChangeNote}
        />
      ))}
    </List>
  );
};

export default BookmarksList;
