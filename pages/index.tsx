import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import DefaultLayout from "@components/layout/DefaultLayout";

const Home: NextPage = () => {
  return (
    <DefaultLayout fullWidth={true}>
      <main>
        <div className="max-w-2xl mx-auto mb-8 sm:mb-12 mt-8">
          <h1 className="text-3xl sm:text-4xl md:text-7xl text-center font-semibold text-gray-900">
            Das <span className="text-blue-500">freie Lastenrad</span> an der
            Este.
          </h1>
        </div>
        <div className="flex space-x-12 flex-col sm:flex-row mb-8">
          <div className="flex-1 relative pb-8 sm:pb-0">
            <img src="/img/waves.svg" className="h-full md:h-96 object-cover" />
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="h-48 md:h-64 relative">
                <img
                  src="/img/esel-hamburg.jpg"
                  className="min-h-full h-full relative z-10"
                  alt="Este-Esel in Hamburg"
                />
                <div className="absolute top-0 left-0 h-full w-full bg-pink-600 transform -translate-x-3 translate-y-3 md:-translate-x-5 md:translate-y-5"></div>
              </div>
            </div>
          </div>
          <div className="flex-1 prose-lg max-w-xs px-2 sm:max-w-none">
            <div className="max-w-md md:max-w-lg">
              <p>
                Der <span className="text-blue-500">Este-Esel</span> ist ein
                Lastenrad zur freien Nutzung für die Este-Gemeinden und Jork und
                eignet sich hervorragend...
              </p>
              <li>zum Einkaufen...</li>
              <li>zum Rumdüsen...</li>
              <li>für Ausflüge...</li>
              <p>
                Der <span className="text-blue-500">Este-Esel</span> ist dabei
                ein{" "}
                <a
                  href="https://dein-lastenrad.de/wiki/Willkommen_beim_Forum_Freie_Lastenr%C3%A4der/de"
                  className="text-blue-500 underline hover:text-blue-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  freies Lastenrad
                </a>
                , das heißt es kann kostenfrei von allen ausgeliehen werden.
              </p>
            </div>
            <div className="flex">
              <Link href="/bookings/new/">
                <a className="px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                  Jetzt ausleihen
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="px-8 mt-24">
          <p className="text-center mb-6">
            Der <span className="text-blue-500">Este-Esel</span> ist eine
            Initiative der{" "}
            <a
              href="https://diebrueckenbaeckerei.de/"
              className="text-blue-500 underline hover:text-blue-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              Brückenbäckerei e.V.
            </a>
            , gefördert durch die{" "}
            <a
              href="https://www.regionalenergie-elbe-weser.de/"
              className="text-blue-500 underline hover:text-blue-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              REEW
            </a>{" "}
            und die{" "}
            <a
              href="https://www.postcode-lotterie.de/"
              className="text-blue-500 underline hover:text-blue-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              Postcode-Lotterie.
            </a>
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-center w-full mx-auto lg:space-x-6 space-y-8 lg:space-y-0 lg:h-24 justify-center">
          <div className="h-full">
            <img
              src="/img/brueckenbaeckerei-logo.jpg"
              className="max-w-full w-full max-h-[6rem]"
            />
          </div>
          <div className="h-full">
            <img
              src="/img/reew-logo.JPG"
              className="max-w-full w-full max-h-[6rem]"
            />
          </div>
          <div className="h-full">
            <img
              src="/img/dpl-logo.png"
              className="max-w-full w-full max-h-[6rem]"
            />
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
};

export default Home;
