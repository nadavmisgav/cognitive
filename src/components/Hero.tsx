import React from "react";

const Hero: React.FC<{}> = () => {
    return (
        <section className="flex flex-col items-center mr-6 mb-24 xl:items-start xl:mb-48 xl:mr-5">
            <h1 className="text-7xl m-8 mb-4 font-bold tracking-widest sm:text-8xl xl:text-9xl xl:m-0 xl:tracking-wider ">קוגניטיבי</h1>
            <p className="text-gray-300 text-center max-w-lg m-0 sm:text-xl xl:text-right xl:text-2xl xl:max-w-3xl xl:leading-10">לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולורס מונפרד אדנדום ילקוף, מרגשי ומרגשח. עמחליף</p>
        </section>
    )
}

export default Hero;