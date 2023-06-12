import { CloudIcon } from "@heroicons/react/24/solid";

import { CARBON_PER_KILOMETER } from "lib/constants";

type Props = {
  loading: boolean;
  kilometers?: number;
};

export default function CarbonSavings({ kilometers, loading }: Props) {
  const savingsInKg = (kilometers || 0) * CARBON_PER_KILOMETER;
  let savingsWithUnit = "-";
  if (savingsInKg > 1000) {
    savingsWithUnit = `${(savingsInKg / 1000).toFixed(1)} t`;
  } else if (savingsInKg > 0) {
    savingsWithUnit = `${savingsInKg.toFixed(0)} kg`;
  }

  return (
    <div className="py-8 lg:py-12 bg-teal-200 text-teal-600">
      <div className="flex flex-col lg:flex-row items-center text-5xl lg:text-6xl justify-center lg:space-x-4 mb-4">
        <span className="w-32 h-32 lg:w-20 lg:h-20">
          <CloudIcon />
        </span>
        <span className="text-center">
          ca. {savingsWithUnit} CO<sub>2</sub>&nbsp;eingespart!<sup>*</sup>
        </span>
      </div>
      <div className="text-xs text-center">
        * gegenüber gleicher Fahrleistung mit einem Verbrenner-Pkw.{" "}
        <a
          href="https://www.bosch-ebike.com/en/help-center/recycling-2/what-is-the-co2-footprint-of-an-ebike-187252"
          target="_blank"
          rel="noreferrer"
        >
          [Quelle]
        </a>
      </div>
    </div>
  );
}
