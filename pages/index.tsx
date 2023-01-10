import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import DefaultLayout from "components/layout/DefaultLayout";
import Waves from "components/Waves";
import Stats from "components/Stats";
import FAQ from "components/FAQ";
import EsteEselModal from "components/EsteEselModal";

const Home: NextPage = () => {
  return (
    <DefaultLayout fullWidth={true}>
      <EsteEselModal />
      <main>
        <div className="max-w-5xl mx-auto mb-8 sm:mb-12 mt-8 px-3">
          <h1 className="text-3xl sm:text-4xl md:text-7xl text-center font-semibold text-gray-900">
            Flotte Flotte -
            <span className="text-teal-500">freie Lastenräder</span> für Jork
            und Buxtehude.
          </h1>
        </div>
        <div className="flex md:space-x-12 flex-col md:flex-row mb-12">
          <div className="h-80 sm:h-96 md:h-auto md:flex-1 relative pb-8 sm:pb-0 overflow-hidden">
            <Waves />

            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-1/2">
                <div className="aspect-w-4 aspect-h-4 bg-pink-600 relative">
                  <div className="absolute inset-0 transform -translate-y-3 translate-x-3">
                    <Image
                      className="relative z-10 block"
                      src="/img/esel-estebruegge.JPG"
                      alt="Este-Esel in Estebrügge"
                      layout="fill"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 prose-lg px-2 w-full">
            <div className="max-w-xs sm:max-w-md mx-auto md:mx-0">
              <p>
                Die <span className="text-teal-500">Flotte Flotte</span> ist ein
                Zusammenschluss von{" "}
                <a
                  href="https://dein-lastenrad.de/wiki/Willkommen_beim_Forum_Freie_Lastenr%C3%A4der/de"
                  className="text-blue-500 underline hover:text-blue-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  freien Lastenrädern
                </a>{" "}
                in Jork und Buxtehude.
              </p>
              <p>Lastenräder eigenen sich hervorragend...</p>
              <ul className="list-disc">
                <li>zum Einkaufen...</li>
                <li>zum Rumdüsen...</li>
                <li>für Ausflüge...</li>
              </ul>
              <div className="flex justify-center">
                <Link href="/bookings/new/">
                  <a className="px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                    Jetzt ausleihen
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="max-w-4xl mx-auto">
          <FAQ />
        </div> */}
        <Stats />
        <div className="px-8 mt-12">
          <p className="text-center mb-6">
            Die <span className="text-teal-500">Flotte Flotte</span> ist eine
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
        <div className="flex flex-col md:flex-row items-center mx-auto space-y-8 md:space-y-0 justify-around max-w-4xl">
          <div className="h-16">
            <img
              src="/img/brueckenbaeckerei-logo.jpg"
              className="max-w-full max-h-full"
            />
          </div>
          <div className="h-16">
            <img src="/img/reew-logo.JPG" className="max-w-full max-h-full" />
          </div>
          <div className="h-16">
            <img src="/img/dpl-logo.png" className="max-w-full max-h-full" />
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
};

export default Home;
