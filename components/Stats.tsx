import { useStatsQueryQuery } from "generated/graphql";

export default function Stats() {
  const [{ data }] = useStatsQueryQuery();
  return (
    <div className="">
      <div className="flex flex-col lg:flex-row justify-around items-center space-y-4 lg:space-y-0 text-blue-500 text-3xl py-4">
        <div>Nutzer:innen: {data?.stats?.users || "-"}</div>
        <div>Buchungen: {data?.stats?.bookings || "-"}</div>
        <div>gefahrene Kilometer: {data?.stats?.kilometers || "-"}</div>
      </div>
    </div>
  );
}
