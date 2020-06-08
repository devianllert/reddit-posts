import React, {
  useState,
  useRef,
  ReactElement,
  ChangeEventHandler,
} from 'react';
import {
  TextField,
  Popper,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
} from '@material-ui/core';
import { useClickAway } from 'react-essential-tools';

import { BookmarkedPost } from '../types';

interface Props {
  /**
   * Input value
   */
  value?: string;
  /**
   * Callback fired once the input has been changed.
   */
  onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  /**
   * Callback fired once the item has been clicked.
   */
  onItemClick: (post: BookmarkedPost) => void;
  /**
   * Dropdown options/items
   */
  options?: BookmarkedPost[];
  /**
   * Search status
   */
  status: string;
}

const BookmarksSearch = (props: Props): ReactElement => {
  const {
    value,
    onChange,
    onItemClick,
    options = [],
    status,
  } = props;

  const anchorRef = useRef<HTMLDivElement>(null);
  const popperRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);

  useClickAway(popperRef, () => setFocused(false));

  const isLoading = status === 'loading';
  const hasOptions = options.length > 0;

  return (
    <>
      <TextField
        label="Subreddit"
        variant="outlined"
        value={value}
        onChange={onChange}
        ref={anchorRef}
        onFocus={(): void => setFocused(true)}
      />

      <Popper
        open={focused && !!value}
        anchorEl={anchorRef.current}
        transition
        placement="bottom"
        ref={popperRef}
      >
        <Paper>
          <List
            style={{
              width: anchorRef.current?.clientWidth,
              maxHeight: 400,
              overflow: 'auto',
            }}
          >
            {isLoading && (
              <ListItem>
                <ListItemText>
                  <Typography>Loading...</Typography>
                </ListItemText>
              </ListItem>
            )}

            {(!isLoading && !hasOptions) && (
              <ListItem>
                <ListItemText>
                  <Typography>No options</Typography>
                </ListItemText>
              </ListItem>
            )}

            {(!isLoading && hasOptions) && options.map((post) => (
              <ListItem
                key={post.id}
                button
                onClick={(): void => onItemClick(post)}
              >
                <ListItemText>
                  <Typography noWrap>{post.title}</Typography>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Popper>
    </>
  );
};

export default BookmarksSearch;
