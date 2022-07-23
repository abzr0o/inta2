export interface src {
  id: number;
  imgurl: string;
  type: string;
}
export interface _count {
  comments: number;
  likes: number;
  Activity: number;
}
export interface like {
  id: number;
  profileid: number;
  postid: number;
  datepost: Date;
  profile: profile;
}
export interface profile {
  id: number;
  userid: number;
  bio: string;
  username: string;
  imgurl: string;
}
export interface comment {
  id: number;
  msg: string;
  postid: number;
  profileid: number;
  profile: profile;
  datepost: Date;
}
export interface post {
  createdAt: Date;
  datepost: Date;
  body: string;
  src: src;
  trendeingScore: number;
  _count: _count;
  profileid: number;
  likes: Array<like>;
  profile: profile;
  imgid: number;
  id: number;
  comments: Array<comment>;
}

export interface commentsQuery {
  comments: Array<comment>;
  pageinfo: { LastCursor: any; hasnextPage: boolean };
}
