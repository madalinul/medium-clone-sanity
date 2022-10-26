import type { NextPage } from 'next';
import Head from 'next/head';
import Banner from '../components/Banner';
import Posts from '../components/Posts';
import { sanityClient } from '../sanity';
import { Post } from '../typings';

interface Props {
  posts: Post[];
}

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner />
      <Posts posts={posts} />
    </>
  );
};

export const getServerSideProps = async () => {
  const query = `*[_type=='post']{
    _id,
    title,
    slug,
    body,
    description,
    mainImage,
    author -> {
      name,
      image
    }
  }`;

  const posts = await sanityClient.fetch(query);
  return {
    props: {
      posts,
    },
  };
};

export default Home;
