import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

type Props = {
  href: string;
};
export default function BackLink({ href }: Props) {
  return (
    <div>
      <Link href={href}>
        <a className="inline-flex items-center hover:underline space-x-3">
          <ArrowLeftIcon className="w-4" />
          <span>zurück</span>
        </a>
      </Link>
    </div>
  );
}
