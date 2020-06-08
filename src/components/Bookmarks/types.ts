import { Post } from '../../services/posts.service';

export interface BookmarkedPost extends Post {
  liked?: boolean;
  note?: string;
}
