import { create } from 'zustand';

interface IPost {
  id: string;
  title: string;
}

export interface IPostsStore {
  posts: IPost[];
  addPost: (post: IPost) => void;
  deletePost: (post: IPost) => void;
}

const myPosts = [
  { id: '1', title: 'Post 1' },
  { id: '2', title: 'Post 2' },
  { id: '3', title: 'Post 3' },
  { id: '4', title: 'Post 4' },
  { id: '5', title: 'Post 5' },
  { id: '6', title: 'Post 6' },
  { id: '7', title: 'Post 7' },
  { id: '8', title: 'Post 8' },
];

export const usePostsStore = create<IPostsStore>((set) => ({
  posts: myPosts,
  addPost: (post: IPost) =>
    set((state) => ({
      posts: [...state.posts, post],
    })),
  deletePost: (post: IPost) =>
    set((state) => ({
      posts: state.posts.filter((p) => p.id !== post.id),
    })),
}));
