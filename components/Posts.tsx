import Link from 'next/link';
import React from 'react';
import { Post } from '../typings';
import { urlFor } from '../sanity';

interface PostsProps {
  posts: Post[];
}

const Posts = ({ posts }: PostsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
      {posts.map(({ _id, slug, mainImage, author, description, title }) => (
        <Link key={_id} href={`/post/${slug.current}`}>
          <div className="group border rounded-lg cursor-pointer overflow-hidden">
            <img
              className="w-full h-60 object-contain group-hover:scale-105 transition-transform duration-200 ease-out"
              src={urlFor(mainImage).url()}
              alt="post iamge"
            />
            <div className="flex justify-between p-5 bg-white">
              <div>
                <p className="text-lg font-bold">{title}</p>
                <p className="text-xs">{`${description} by ${author.name}`}</p>
              </div>
              <img
                className="h-12 w-12 rounded-full object-contain"
                src={urlFor(author.image).url()}
                alt="autor image"
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Posts;
