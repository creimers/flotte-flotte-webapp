export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="text-blue-500 -mb-px">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="fill-current"
        >
          <path d="M0,160L60,181.3C120,203,240,245,360,240C480,235,600,181,720,165.3C840,149,960,171,1080,181.3C1200,192,1320,192,1380,192L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
      </div>
      <div className="p-4 text-white text-xs bg-blue-500">
        <p>
          Impressum: Die Brückenbäckerei e.V., Estebrügger Str. 113, 21635 Jork
        </p>
      </div>
      <div></div>
    </footer>
  );
}
