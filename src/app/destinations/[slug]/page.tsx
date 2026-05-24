import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getDestinationBySlug,
  DESTINATIONS,
} from "../../destinations/seasonentry/destination.data";
import DestinationDetailClient from "../../../components/destinations/DestinationDetailClient";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return DESTINATIONS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const destination = getDestinationBySlug(params.slug);
  if (!destination) return { title: "Destination Not Found" };
  return {
    title: `${destination.name}, ${destination.country} — Blue Elephant Travels`,
    description: destination.description,
    openGraph: {
      images: [destination.heroImage ?? destination.image],
    },
  };
}

export default function DestinationPage({ params }: Props) {
  const destination = getDestinationBySlug(params.slug);
  if (!destination) notFound();
  return <DestinationDetailClient destination={destination} />;
}0