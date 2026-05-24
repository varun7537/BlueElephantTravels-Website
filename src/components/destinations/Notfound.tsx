import Link from "next/link";
import { Compass } from "lucide-react";

export default function DestinationNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-5 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-accent/10">
        <Compass size={32} className="text-accent" />
      </div>
      <h1 className="mt-6 font-heading text-3xl font-bold text-text-primary sm:text-4xl">
        Destination Not Found
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-text-secondary">
        We couldn&apos;t find this destination. It may have moved or the link
        might be incorrect.
      </p>
      <Link
        href="/destinations"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-white transition hover:opacity-90"
      >
        Browse All Destinations
      </Link>
    </main>
  );
}