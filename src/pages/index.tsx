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

const PostSummary: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="mx-6 my-0 py-5 px-0 flex flex-wrap justify-center basis-full relative sm:py-8 sm:px-0 sm:content-end  xl:absolute xl:w-2/3 xl:left-10 xl:max-w-6xl">
      <h1 className="grow w-full m-0 text-4xl tracking-wider font-bold hover:underline hover:cursor-pointer focus:underline focus:cursor-pointer sm:text-5xl">{post.name}</h1>
      <span className="grow w-full text-xs sm:text-base">{post.category} / {post.date}</span>
      <img style={{ minWidth: "calc(100% + 2*1.5rem)" }} className="max-h-72 object-cover my-4 mx-0 sm:min-w-0 sm:absolute sm:w-2/5 sm:-left-6 sm:rounded-r-2xl sm:top-1/4 sm:max-w-md xl:-left-16" loading="lazy" src="https://dummyimage.com/640x360/fff/aaa" />
      <div className="flex grow flex-wrap sm:max-w-2xl">
        <p className="grow w-full sm:text-base xl:text-xl xl:tracking-wide">
          {post.description}
        </p>
        <span className="grow w-full text-left hover:underline hover:cursor-pointer text-xs">קרא עוד</span>
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
      <section className="bg-gray-600 rounded-3xl">
        {posts.map((post) => <PostSummary post={post} />)}
      </section>
    </>

  );
};



export default Home;
