import { useStatsQueryQuery } from "generated/graphql";

import CarbonSavings from "./CarbonSavings";
import Usage from "./Usage";

export default function Stats() {
  const { data, loading } = useStatsQueryQuery();
  return (
    <div>
      <div className="mb-3">
        <Usage
          loading={loading}
          users={data?.stats?.users || undefined}
          bookings={data?.stats?.bookings || undefined}
          kilometers={data?.stats?.kilometers || undefined}
        />
      </div>
      <div>
        <CarbonSavings
          loading={loading}
          kilometers={data?.stats?.kilometers || undefined}
        />
      </div>
    </div>
  );
}
