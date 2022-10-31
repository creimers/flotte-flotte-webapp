import FAQItem from "./FAQItem";

export default function FAQ() {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold my-2 text-gray-700 text-center mb-8">
        Häufige Fragen &amp; Antworten
      </h2>
      <FAQItem question="Wie funktioniert das Ausleihen?">
        <p>
          Das Ausleihen vom Este-Esel ist ganz einfach. Hier auf der Webseite
          registrieren, das Wunsch-Datum auswählen und eine Abhol-Zeit angeben.
          Die Buchung wird dann von uns bestätigt, und du erhälst einen
          Buchungs-Code. Mit diesem (und einem gültigen Ausweis) kannst du dann
          am vereinbarten Datum den Este-Esel bei der Leih-Station abholen.
        </p>
      </FAQItem>

      <FAQItem question="Für wie lange kann ich den Este-Esel ausleihen?">
        <p>
          Du leihst den Este-Esel immer ab Abhol-Zeitpunkt für den Rest des
          Tages aus.
        </p>
      </FAQItem>
      <FAQItem question="Ist der Este-Esel wirklich umsonst?">
        <p>Ja, du kannst den Este-Esel wirklich komplett umsonst ausleihen.</p>
        <p>
          Trotzdem verursacht der Betrieb des Rads natürlich Kosten
          (Versicherung, Wartung, etc.). Diese finanzieren wir durch Spenden.
          Wenn du ein paar Groschen übrig hast, freuen wir uns, die Kosten auf
          viele Schultern zu verteilen.
        </p>
      </FAQItem>
      <FAQItem question="Ist es schwer, mit einem Lastenrad zu fahren?">
        <p>
          Nein, ein Lastenrad fährt sich im Prinzip wie jedes andere Fahrrad. Es
          ist nur ein bisschen länger. Daran hast du dich aber in kürzester Zeit
          gewöhnt.
        </p>
      </FAQItem>

      <FAQItem question="Was kann ich alles transportieren?">
        <p>
          Der Este-Esel ist ein{" "}
          <a href="https://urbanarrow.com/de/family-fahrrader/family/">
            Urban-Arrow Family
          </a>
          , dessen maximales Gesamtgewicht 250kg beträgt, wobei das Rad 50kg
          schwer ist. Je nach deinem eigenen Gewicht kannst du also ordentlich
          was reinpacken, in der Regel weit über 100kg.
        </p>
        <p>
          Der Este-Esel hat außerdem eine Sitzbank, auf der zwei Kinder
          angeschnallt sitzen können.
        </p>
        <p>Wir raten davon ab, Erwachsene im Este-Esel zu transportieren.</p>
      </FAQItem>
    </div>
  );
}
