import type { AppType } from "next/dist/shared/lib/utils";
import { ParallaxProvider } from 'react-scroll-parallax';
import Navbar from "../components/Navbar";
import "../styles/globals.css";


const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div>
      <Navbar />
      <ParallaxProvider>

        <Component {...pageProps} />;
      </ParallaxProvider>
    </div>
  )
};

export default MyApp;
