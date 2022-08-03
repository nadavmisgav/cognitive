import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>קוגניטיבי</title>
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <div className="pt-6 text-2xl text-blue-500 flex justify-center items-center w-full">
          <p>היי, מה נשמע?</p>
        </div>
      </main>
    </>
  );
};



export default Home;
