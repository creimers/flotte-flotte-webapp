type Props = {
  loading: boolean;
  users?: number;
  bookings?: number;
  kilometers?: number;
};
export default function Usage({ users, bookings, kilometers, loading }: Props) {
  return (
    <div className="flex flex-col lg:flex-row justify-around items-center space-y-4 lg:space-y-0 text-blue-500 text-3xl py-4">
      <div>Nutzer:innen: {users || "-"}</div>
      <div>Buchungen: {bookings || "-"}</div>
      <div>gefahrene Kilometer: {kilometers || "-"}</div>
    </div>
  );
}
