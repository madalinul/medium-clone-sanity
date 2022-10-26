export interface Post {
  _id: string;
  _createdAt: string;
  title: string;
  description: string;
  mainImage: {
    asset: {
      url: string;
    };
  };
  slug: {
    current: string;
  };
  body: TypedObject[];
  author: {
    name: string;
    image: string;
  };
  comments: Comment[];
}

export interface Comment {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  comment: string;
  email: string;
  name: string;
  post: {
    _ref: string;
    _type: string;
  };
}

export interface TypedObject extends object {
  _type: string;
}
