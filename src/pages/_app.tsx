import type { AppType } from "next/dist/shared/lib/utils";
import Navbar from "../components/Navbar";
import "../styles/globals.css";


const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />;
    </div>
  )
};

export default MyApp;
