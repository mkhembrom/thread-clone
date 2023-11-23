export interface IAccount {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string | null;
  access_token?: string | null;
  expires_at?: number | null;
  token_type?: string | null;
  scope?: string | null;
  id_token?: string | null;
  session_state?: string | null;
  user: IUser;
}

export interface ISession {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  user: IUser;
}

export interface IUser {
  id: string;
  name?: string;
  username: string;
  bio?: string | null;
  email?: string | null;
  emailVerified?: Date | null;
  image?: string | null;
  coverImage?: string | null;
  profileImage?: string | null;
  hashPassword?: string | null;
  createdAt: Date;
  updatedAt: Date;
  followingIds: string[];
  hasNotification?: boolean | null;
  posts: IPost[];
  comments: IComment[];
  notification: Notification[];
  accounts: IAccount[];
  sessions: ISession[];
  likes: ILike[];
  usernameslug?: string;
  followedByIDs: string[];
}

export interface IPost {
  post: IPost;
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  likedIds: string[];
  comments: IComment[];
  user: IUser;
  image: IImage[];
  likes: ILike[];
  reposts: IRepost[];
}

export interface IRepost {
  id: string;
  userId: string;
  postId: string;
}

export interface ILike {
  id: string;
  userId: string;
  postId: string;
  comment: IComment[];
  post: IPost;
  user: IUser;
}

export interface IImage extends Blob {
  id: string;
  imageName: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  postId: string;
  commentId?: string | null;
  comment?: IComment | null;
  post: IPost;
}

export interface IComment {
  id: string;
  reply: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  postId: string;
  user: IUser;
  post: IPost;
  images: IImage[];
  likes: ILike[];
  replies: IComment[];
}

export interface INotification {
  id: string;
  body: string;
  createdAt: Date;
  userId: string;
  user: IUser;
  postId: string;
  post: IPost;
  commnetId: string;
  comment: IComment;
  repostId: string;
  repost: IRepost;
}

export interface ICloudinary {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: [];
  bytes: number;
  type: string;
  etag: string;
  placeholder: false;
  url: string;
  secure_url: string;
  folder: string;
  access_mode: string;
  original_filename: string;
  api_key: string;
}
