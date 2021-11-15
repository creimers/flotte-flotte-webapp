import { useStatsQueryQuery } from "generated/graphql";

export default function Stats() {
  const { data, loading } = useStatsQueryQuery();
  return (
    <div className="h-20">
      {!loading && data && (
        <div className="flex flex-col md:flex-row justify-around items-center space-y-2 md:space-y-0 text-blue-500 text-3xl py-4">
          <div>Nutzer:innen: {data?.stats?.users}</div>
          <div>Buchungen: {data?.stats?.bookings}</div>
          <div>gefahrene Kilometer: {data?.stats?.kilometers}</div>
        </div>
      )}
    </div>
  );
}
