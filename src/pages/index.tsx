import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>קוגניטיבי</title>
      </Head>

      <header>
        <nav className="text-gray-300 m-6 xl:text-2xl ml-5 ">
          <ul className="p-0 flex list-none justify-end">
            <li className="m-3 hover:text-gray-100 underline cursor-pointer">אודות</li>
            <li className="m-3 hover:text-gray-100 underline cursor-pointer">רשימת פוסטים</li>
            <li className="m-3 hover:text-gray-100 underline cursor-pointer">קטגוריות</li>
          </ul>
        </nav>
      </header>

      <section className="flex flex-col items-center mr-6 mb-24 xl:items-start xl:mb-48 xl:mr-5">
        <h1 className="text-7xl m-8 mb-4 font-bold tracking-widest sm:text-8xl xl:text-9xl xl:m-0 xl:tracking-wider ">קוגניטיבי</h1>
        <p className="text-gray-300 text-center max-w-lg m-0 sm:text-xl xl:text-right xl:text-2xl xl:max-w-3xl xl:leading-10">לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולורס מונפרד אדנדום ילקוף, מרגשי ומרגשח. עמחליף</p>
      </section>

      {/* <section className="posts rellax" data-rellax-speed="10"> */}
      <section className="bg-gray-500 rounded-3xl">
        <div className="mx-6 my-0 py-5 px-0 flex flex-wrap justify-center basis-full relative sm:py-8 sm:px-0 sm:content-end  xl:absolute xl:w-2/3 xl:left-10 xl:max-w-6xl">
          <h1 className="grow w-full m-0 text-4xl tracking-widest hover:underline hover:cursor-pointer focus:underline focus:cursor-pointer sm:text-5xl">עובר ושב</h1>
          <span className="grow w-full text-xs sm:text-base">קטגוריה / 23.10.2021</span>
          <img className="max-h-72 object-cover my-4 mx-0 sm:min-w-0 sm:absolute sm:w-2/5 sm:-left-6 sm:rounded-r-2xl sm:top-1/4 sm:max-w-md xl:-left-16" loading="lazy" src="https://dummyimage.com/640x360/fff/aaa" />
          <div className="flex grow flex-wrap sm:max-w-2xl">
            <p className="grow w-full sm:text-base xl:text-xl xl:tracking-wide">לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולורס מונפרד אדנדום ילקוף, מרגשי ומרגשח. עמחליף
              נולום ארווס סאפיאן
              - פוסיליס קוויס, אקווזמן נולום ארווס סאפיאן - פוסיליס קוויס, אקווזמן קוואזי במר מודוף. אודיפו
              בלאסטיק מונופץ קליר, בנפת
              נפקט למסון בלרק - וענוף הועניב היושבב שערש שמחויט - שלושע ותלברו חשלו
            </p>
            <span className="grow w-full text-left hover:underline hover:cursor-pointer text-xs">קרא עוד</span>
          </div>
        </div>

      </section>
    </>

  );
};



export default Home;
