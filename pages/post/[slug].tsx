import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { sanityClient, urlFor } from '../../sanity';
import { Post } from '../../typings';
import FormattedPortableText from '../../components/FormattedPortableText';
import CommentForm from '../../components/CommentForm';
import Comments from '../../components/Comments';

interface PostProps {
  post: Post;
}

const Post: NextPage<PostProps> = ({ post }) => {
  return (
    <>
      <Head>
        <title>
          {post.title} - {post.description}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <img
          className="w-full h-40 object-contain"
          src={urlFor(post.mainImage).url()}
          alt="post image"
        />
        <article className="max-w-3xl mx-auto">
          <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
          <h2 className="text-xl font-light text-gray-500 mb-2">
            {post.description}
          </h2>

          <div className="flex items-center space-x-2">
            <img
              className="w-10 h-10 rounded-full object-contain"
              src={urlFor(post.author.image).url()}
              alt="author image"
            />
            <p className="font-extralight text-sm">
              Blog post by{' '}
              <span className="text-green-600 font-semibold">
                {post.author.name}
              </span>{' '}
              - Published at {new Date(post._createdAt).toLocaleString()}
            </p>
          </div>
          <div className="mt-10">
            <FormattedPortableText value={post.body} />
          </div>
        </article>

        <hr className="max-w-lg my-5 mx-auto border border-yellow-500" />
        <Comments comments={post.comments} />
        <CommentForm post={post} />
      </main>
    </>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type=='post']{
        _id,
        slug {
            current
        }
      }`;

  const posts = await sanityClient.fetch(query);
  const paths = posts.map((post: Post) => ({
    params: { slug: post.slug.current },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type=='post' && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    slug,
    body,
    description,
    mainImage,
    author -> {
     name,
     image
    },
    'comments': *[_type == 'comment' && post._ref == ^._id]
  }`;
  const post = await sanityClient.fetch(query, { slug: params?.slug });

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};

export default Post;
