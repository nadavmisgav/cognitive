import type { NextPage } from "next";
import Head from "next/head";
import Link from 'next/link';
import React from "react";
import Hero from "../components/Hero";
import { inferQueryOutput, trpc } from '../utils/trpc';

type Post = inferQueryOutput<'posts.posts'>[0]

const PostSummary: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div key={post.id} className="mx-6 my-0 py-5 px-0 flex flex-wrap justify-center basis-full relative sm:py-8 sm:px-0 sm:justify-start">
      <Link href={`/posts/${post.id}`}><h1 className="grow w-full m-0 text-4xl tracking-wider font-bold hover:underline hover:cursor-pointer focus:underline focus:cursor-pointer">{post.title}</h1></Link>
      <span className="grow w-full text-xs sm:text-base">{post.category} / {post.createdAt.toLocaleDateString("he")} </span>
      <img className="post-summary-img" loading="lazy" src="https://dummyimage.com/640x360/fff/aaa" />
      <div className="flex grow flex-wrap my-4 sm:max-w-[60%] ">
        <p className="text-gray-300 grow w-full sm:text-base xl:text-xl xl:leading-7">
          {post.description}
        </p>
      </div>
    </div >
  );
}

const Home: NextPage = () => {

  const { data, isLoading } = trpc.useQuery(['posts.posts'])

  console.log(data)

  return (
    <>
      <Head>
        <title>קוגניטיבי</title>
      </Head>
      <Hero />

      {isLoading ? <h3 className="text-center">טוען פרסומים...</h3> :
        <section className="bg-gray-600 rounded-3xl xl:absolute xl:w-[70%] xl:left-[20%] xl:max-w-7xl">
          {data?.map(post => <PostSummary post={post} />)}
        </section>
      }
    </>

  );
};



export default Home;
