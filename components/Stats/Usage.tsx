import Link from "next/link";

type Props = {
  loading: boolean;
  bikes?: number;
  users?: number;
  bookings?: number;
  kilometers?: number;
};
export default function Usage({ users, bookings, kilometers, bikes }: Props) {
  return (
    <div className="flex flex-col lg:flex-row justify-around items-center space-y-4 lg:space-y-0 text-teal-500 text-3xl py-4">
      <div>
        <Link href="/bikes">
          <a className="underline hover:text-teal-600">
            Lastenräder: {bikes || "-"}
          </a>
        </Link>
      </div>
      <div>Nutzer:innen: {users || "-"}</div>
      <div>Buchungen: {bookings || "-"}</div>
      <div>gefahrene Kilometer: {kilometers || "-"}</div>
    </div>
  );
}
