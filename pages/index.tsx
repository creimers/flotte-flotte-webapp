import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import DefaultLayout from "@components/layout/DefaultLayout";
import Waves from "components/Waves";
import Stats from "components/Stats";
import FAQItem from "@components/FAQItem";

const Home: NextPage = () => {
  return (
    <DefaultLayout fullWidth={true}>
      <main>
        <div className="max-w-5xl mx-auto mb-8 sm:mb-12 mt-8 px-3">
          <h1 className="text-3xl sm:text-4xl md:text-7xl text-center font-semibold text-gray-900">
            Este-Esel: Das{" "}
            <span className="text-blue-500">freie Lastenrad</span> an der Este.
          </h1>
        </div>
        <div className="flex md:space-x-12 flex-col md:flex-row mb-12">
          <div className="h-80 sm:h-96 md:h-auto md:flex-1 relative pb-8 sm:pb-0 overflow-hidden">
            <Waves />

            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-2/3 sm:w-1/2">
                <div className="aspect-w-4 aspect-h-3 bg-pink-600 relative">
                  <div className="absolute inset-0 transform -translate-y-3 translate-x-3">
                    <Image
                      className="relative z-10 block"
                      src="/img/esel-hamburg.jpg"
                      alt="Este-Esel in Hamburg"
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
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold my-2 text-gray-700 text-center mb-8">
            Häufige Fragen &amp; Antworten
          </h2>
          <FAQItem question="Wie funktioniert das Ausleihen?">
            <p>
              Das Ausleihen vom Este-Esel ist ganz einfach. Hier auf der
              Webseite registrieren, das Wunsch-Datum auswählen und eine
              Abhol-Zeit angeben. Die Buchung wird dann von uns bestätigt, und
              du erhälst einen Buchungs-Code. Mit diesem (und einem Ausweis)
              kannst du dann am vereinbarten Datum den Este-Esel bei der
              Leih-Station abholen.
            </p>
          </FAQItem>

          <FAQItem question="Für wie lange kann ich den Este-Esel ausleihen?">
            <p>
              Du leihst den Este-Esel immer ab Abhol-Zeitpunkt für den Rest des
              Tages aus.
            </p>
          </FAQItem>
          <FAQItem question="Ist der Este-Esel wirklich umsonst?">
            <p>
              Ja, du kannst den Este-Esel wirklich komplett umsonst ausleihen.
            </p>
            <p>
              Trotzdem ist es natürlich so, dass der Betrieb des Rads Kosten
              verursacht (Versicherung, Wartung, etc.). Diese finanzieren wir
              durch Spenden. Wenn du ein paar Groschen übrig hast, freuen wir
              uns, die Kosten auf viele Schultern zu verteilen.
            </p>
          </FAQItem>
          <FAQItem question="Ist es schwer, mit einem Lastenrad zu fahren?">
            <p>
              Nein, ein Lastenrad fährt sich im Prinzip wie jedes andere
              Fahrrad. Es ist nur ein bisschen länger. Daran hast du dich aber
              in kürzester Zeit gewöhnt.
            </p>
          </FAQItem>

          <FAQItem question="Was kann ich alles transportieren?">
            <p>
              Der Este-Esel ist ein{" "}
              <a href="https://urbanarrow.com/de/family-fahrrader/family/">
                Urban-Arrow Family
              </a>
              , dessen maximales Gesamtgewicht 250kg beträgt, wobei das Rad 50kg
              schwer ist. Je nach deinem eigen Gewicht kannst du also ordentlich
              was reinpacken, in der Regel weit über 100kg.
            </p>
            <p>
              Der Este-Esel hat außerdem eine Sitzbank, auf der zwei Kinder
              angeschnallt sitzen können.
            </p>
          </FAQItem>
        </div>
        <Stats />
        <div className="px-8 mt-12">
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
