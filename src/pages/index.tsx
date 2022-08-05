import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Hero from "../components/Hero";


type Post = {
  name: string;
  date: string;
  category: string;
  image: string;
  description: string;
}

const PostSummary: React.FC<{ key: number, post: Post }> = ({ key, post }) => {
  return (
    <div key={key} className="mx-6 my-0 py-5 px-0 flex flex-wrap justify-center basis-full relative sm:py-8 sm:px-0 sm:justify-start">
      <h1 className="grow w-full m-0 text-4xl tracking-wider font-bold hover:underline hover:cursor-pointer focus:underline focus:cursor-pointer">{post.name}</h1>
      <span className="grow w-full text-xs sm:text-base">{post.category} / {post.date}</span>
      <img className="post-summary-img" loading="lazy" src="https://dummyimage.com/640x360/fff/aaa" />
      <div className="flex grow flex-wrap my-4 sm:max-w-[60%] ">
        <p className="text-gray-300 grow w-full sm:text-base xl:text-xl xl:leading-7">
          {post.description}
        </p>
        {/* <span className="text-gray-300 grow w-full text-left hover:underline hover:cursor-pointer text-xs">קרא עוד</span> */}
      </div>
    </div>
  );
}

const Home: NextPage = () => {

  const posts: Post[] = [
    {
      name: "עובר ושב",
      category: "קטגוריה",
      date: "23.10.2021",
      description: "לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולורס מונפרד אדנדום ילקוף, מרגשי ומרגשח. עמחליף נולום ארווס סאפיאן - פוסיליס קוויס, אקווזמן נולום ארווס סאפיאן - פוסיליס קוויס, אקווזמן קוואזי במר מודוף. אודיפו בלאסטיק מונופץ קליר, בנפת נפקט למסון בלרק - וענוף הועניב היושבב שערש שמחויט - שלושע ותלברו חשלו",
      image: "https://dummyimage.com/640x360/fff/aaa"
    },

    {
      name: "עובר ושב",
      category: "קטגוריה",
      date: "23.10.2021",
      description: "לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולורס מונפרד אדנדום ילקוף, מרגשי ומרגשח. עמחליף נולום ארווס סאפיאן - פוסיליס קוויס, אקווזמן נולום ארווס סאפיאן - פוסיליס קוויס, אקווזמן קוואזי במר מודוף. אודיפו בלאסטיק מונופץ קליר, בנפת נפקט למסון בלרק - וענוף הועניב היושבב שערש שמחויט - שלושע ותלברו חשלו",
      image: "https://dummyimage.com/640x360/fff/aaa"
    },

    {
      name: "עובר ושב",
      category: "קטגוריה",
      date: "23.10.2021",
      description: "לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולורס מונפרד אדנדום ילקוף, מרגשי ומרגשח. עמחליף נולום ארווס סאפיאן - פוסיליס קוויס, אקווזמן נולום ארווס סאפיאן - פוסיליס קוויס, אקווזמן קוואזי במר מודוף. אודיפו בלאסטיק מונופץ קליר, בנפת נפקט למסון בלרק - וענוף הועניב היושבב שערש שמחויט - שלושע ותלברו חשלו",
      image: "https://dummyimage.com/640x360/fff/aaa"
    }
  ]

  return (
    <>
      <Head>
        <title>קוגניטיבי</title>
      </Head>
      <Hero />
      {/* <section className="posts rellax" data-rellax-speed="10"> */}
      <section className="bg-gray-600 rounded-3xl xl:absolute xl:w-[70%] xl:left-[20%] xl:max-w-7xl">
        {posts.map((post, idx) => <PostSummary key={idx} post={post} />)}
      </section>
    </>

  );
};



export default Home;
