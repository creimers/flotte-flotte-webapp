import * as React from "react";
import Link from "next/link";

import DefaultLayout from "components/layout/DefaultLayout";
import { useBikesQuery } from "generated/graphql";

export default function BikePage() {
  const [{ data }] = useBikesQuery();
  return (
    <DefaultLayout>
      <div className="prose max-w-full">
        <h1>Flotte Flotte - unsere freien Lastenräder</h1>
        <ul>
          {data &&
            data.bikes &&
            data.bikes.edges.map((e, i) => (
              <li key={`bike-${i}`}>
                <Link href={`/bikes/${e?.node?.slug}`}>
                  <a>
                    {e?.node?.name} ({e?.node?.pickupStation?.locationCity})
                  </a>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </DefaultLayout>
  );
}
