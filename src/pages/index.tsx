import fs from 'fs';
import matter from 'gray-matter';
import type { NextPage } from "next";
import Head from "next/head";
import Link from 'next/link';
import path from 'path';
import React from "react";
import Hero from "../components/Hero";
import { Post } from '../types';
import { postFilePaths, POSTS_PATH } from '../utils/mdxUtils';



const PostSummary: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="mx-6 my-0 py-5 px-0 flex flex-wrap justify-center basis-full relative sm:py-8 sm:px-0 sm:justify-start">
      <Link
        as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
        href={`/posts/[slug]`}
      >
        <h1 className="grow w-full m-0 text-4xl tracking-wider font-bold hover:underline hover:cursor-pointer focus:underline focus:cursor-pointer">{post.data.title}</h1>
      </Link>
      <span className="grow w-full text-xs sm:text-base">{post.data.category} / {post.data.createdAt} </span>
      <img className="post-summary-img" loading="lazy" src="https://dummyimage.com/640x360/fff/aaa" />
      <div className="flex grow flex-wrap my-4 sm:max-w-[60%] ">
        <p className="text-gray-300 grow w-full sm:text-base xl:text-xl xl:leading-7 sm:min-h-[10vh]">
          {post.data.description}
        </p>
      </div>
    </div >
  );
}

const Home: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>קוגניטיבי</title>
      </Head>
      <Hero />
      {posts?.length !== 0 ?
        <section className="bg-gray-600 rounded-3xl xl:absolute xl:w-[70%] xl:left-[20%] xl:max-w-7xl">
          {posts?.map(post => <PostSummary key={post.data.title} post={post} />)}
        </section>
        : <div className="flex justify-center items-center">
          <h1 className="text-4xl">טרם פורסם פוסט ☹</h1>
        </div>}

    </>

  );
};


export function getStaticProps() {
  const posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath))
    const { content, data } = matter(source)

    return {
      content,
      data,
      filePath,
    }
  })

  return { props: { posts } }
}


export default Home;
