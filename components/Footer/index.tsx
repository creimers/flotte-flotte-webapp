import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="h-32"></div>
      <div className="p-4 text-white bg-blue-500 ">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8  flex space-x-4">
          <div className="bg-white h-32 w-32 p-1 inline-block">
            <img
              className="block h-full w-auto"
              src="/img/logo-menu.svg"
              alt="Este-Esel"
            />
          </div>
          <div className="flex flex-col ">
            <Link href="/terms">
              <a>Nutzungsbedingungen</a>
            </Link>
            <Link href="/privacy">
              <a>Datenschutz</a>
            </Link>
            <Link href="/imprint">
              <a>Impressum</a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
