import React, { ReactElement, ChangeEvent } from 'react';
import {
  ListItem,
  IconButton,
  Typography,
  TextField,
  Link,
  Box,
} from '@material-ui/core';
import { MdClear, MdStar, MdStarBorder } from 'react-icons/md';

import { BookmarkedPost } from '../types';

interface Props {
  /**
   * Bookmarked post object
   */
  bookmarkedPost: BookmarkedPost;
  /**
   * Callback fired once the item has been liked.
   */
  onLike: (postId: string) => void;
  /**
   * Callback fired once the item has been deleted.
   */
  onDelete: (postId: string) => void;
  /**
   * Callback fired once the item's note has been changed.
   */
  onChangeNote: (postId: string, note: string) => void;
}

const BookmarksItem = (props: Props): ReactElement => {
  const {
    bookmarkedPost,
    onLike,
    onDelete,
    onChangeNote,
  } = props;

  const handleLike = (): void => onLike(bookmarkedPost.id);

  const handleDelete = (): void => onDelete(bookmarkedPost.id);

  const handleChangeNote = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => (
    onChangeNote(bookmarkedPost.id, event.target.value)
  );

  return (
    <ListItem divider>
      <Box display="flex" flexDirection="column" width="100%">
        <Box display="flex" alignItems="center" justifyContent="flex-start" mb={1}>
          <Typography variant="body1" noWrap>
            <Link href={`https://www.reddit.com${bookmarkedPost.permalink}`} target="_blank" rel="noreferrer noopener">
              {bookmarkedPost.title}
            </Link>
          </Typography>

          <Box display="flex" ml="auto">
            <IconButton onClick={handleLike} color="primary" aria-label="like bookmark" component="span">
              {bookmarkedPost.liked ? <MdStar /> : <MdStarBorder />}
            </IconButton>

            <IconButton
              onClick={handleDelete}
              color="default"
              aria-label="delete bookmark"
              component="span"
            >
              <MdClear />
            </IconButton>
          </Box>
        </Box>

        <TextField
          multiline
          placeholder="Enter note..."
          size="small"
          rows={1}
          rowsMax={4}
          variant="outlined"
          defaultValue={bookmarkedPost.note}
          onChange={handleChangeNote}
        />
      </Box>
    </ListItem>
  );
};

export default BookmarksItem;
