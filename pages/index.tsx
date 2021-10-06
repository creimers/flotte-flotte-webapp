import type { NextPage } from "next";
import Image from "next/image";

import DefaultLayout from "@components/layout/DefaultLayout";

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <main>
        <div className="max-w-2xl mx-auto mb-8 sm:mb-12 mt-8">
          <h1 className="text-3xl sm:text-4xl md:text-7xl text-center font-semibold text-gray-900">
            Das <span className="text-blue-500">freie Lastenrad</span> an der
            Este.
          </h1>
        </div>
        <div className="flex space-x-12 flex-col sm:flex-row mb-8">
          <div className="flex-1 overflow-hidden relative pb-8 sm:pb-0">
            <img src="/img/waves.svg" className="h-full md:h-96 object-cover" />
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="h-32 md:h-64 relative">
                <img
                  src="/img/esel-hamburg.jpg"
                  className="min-h-full h-full relative z-10"
                />
                <div className="absolute top-0 left-0 h-full w-full bg-pink-600 transform -translate-x-3 translate-y-3 md:-translate-x-5 md:translate-y-5"></div>
              </div>
            </div>
          </div>
          <div className="flex-1 prose-lg max-w-xs px-2 sm:max-w-none">
            <div className="max-w-md md:max-w-lg">
              <p>
                Der <span className="text-blue-500">Este-Esel</span> ist ein
                Lastenrad zur freien Nutzung für die Este-Gemeinden und Jork.
              </p>
              <p>
                <li>Zum Einkaufen...</li>
                <li>Zum Rumdüsen...</li>
                <li>Für Ausflüge...</li>
              </p>
              <p>Frei und für alle!</p>
            </div>
            <div className="flex justify-center md:block">
              <a
                href="/ausleihen/neu/"
                className="px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Jetzt buchen
              </a>
            </div>
          </div>
        </div>
        <div className="px-8">
          <p className="text-center mb-6">
            Der <span className="text-blue-500">Este-Esel</span> ist eine
            Initiative der{" "}
            <a
              className="text-blue-500 underline hover:text-blue-700"
              href="https://diebrueckenbaeckerei.de/"
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
          <div className="flex flex-col md:flex-row items-center max-w-2xl w-full mx-auto md:space-x-4 space-y-8 md:space-y-0">
            <div className="flex-1">
              <img
                src="/img/brueckenbaeckerei-logo.jpg"
                className="max-w-full"
              />
            </div>
            <div className="flex-1">
              <img src="/img/reew-logo.JPG" className="max-w-full" />
            </div>
            <div className="flex-1">
              <img src="/img/dpl-logo.png" className="max-w-full" />
            </div>
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
};

export default Home;
