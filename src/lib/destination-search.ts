import { DESTINATIONS } from "@/app/destinations/seasonentry/destination.data";
import type { Destination } from "@/app/destinations/components/types";

export type TripSearchParams = {
  from?: string;
  to?: string;
  start?: string;
  end?: string;
  q?: string;
};

const normalize = (value: string) => value.trim().toLowerCase();

export const LOCATION_SUGGESTIONS = [
  ...new Set([
    ...DESTINATIONS.map((d) => d.name),
    ...DESTINATIONS.map((d) => d.country),
    ...DESTINATIONS.map((d) => d.region),
  ]),
].sort((a, b) => a.localeCompare(b));

export function destinationMatches(dest: Destination, term: string): boolean {
  const query = normalize(term);
  if (!query) return true;

  const haystack = [
    dest.name,
    dest.country,
    dest.region,
    dest.description,
    dest.bestFor,
    dest.tag,
    ...dest.highlights,
  ]
    .join(" ")
    .toLowerCase();

  return (
    haystack.includes(query) ||
    dest.name.toLowerCase().startsWith(query) ||
    dest.country.toLowerCase().startsWith(query)
  );
}

export function filterDestinations(
  destinations: Destination[],
  params: TripSearchParams
): Destination[] {
  const destinationQuery = params.to || params.q || "";
  const originQuery = params.from || "";

  if (!destinationQuery.trim() && !originQuery.trim()) {
    return destinations;
  }

  return destinations.filter((dest) => {
    const matchesDestination =
      !destinationQuery.trim() || destinationMatches(dest, destinationQuery);
    const matchesOrigin =
      !originQuery.trim() || destinationMatches(dest, originQuery);

    if (destinationQuery.trim()) return matchesDestination;
    return matchesOrigin;
  });
}

export function getLocationSuggestions(query: string, limit = 6): string[] {
  const q = normalize(query);
  if (!q) return LOCATION_SUGGESTIONS.slice(0, limit);

  return LOCATION_SUGGESTIONS.filter((item) =>
    item.toLowerCase().includes(q)
  ).slice(0, limit);
}

export function buildDestinationsSearchUrl(params: TripSearchParams): string {
  const search = new URLSearchParams();

  if (params.from?.trim()) search.set("from", params.from.trim());
  if (params.to?.trim()) search.set("to", params.to.trim());
  if (params.start) search.set("start", params.start);
  if (params.end) search.set("end", params.end);
  if (params.q?.trim()) search.set("q", params.q.trim());

  const qs = search.toString();
  return qs ? `/destinations?${qs}#explore` : "/destinations#explore";
}

export function tripSearchFromUrl(
  searchParams: URLSearchParams
): TripSearchParams {
  return {
    from: searchParams.get("from") ?? undefined,
    to: searchParams.get("to") ?? undefined,
    start: searchParams.get("start") ?? undefined,
    end: searchParams.get("end") ?? undefined,
    q: searchParams.get("q") ?? undefined,
  };
}

export function hasActiveTripSearch(params: TripSearchParams): boolean {
  return Boolean(
    params.from?.trim() ||
      params.to?.trim() ||
      params.start ||
      params.end ||
      params.q?.trim()
  );
}

export function formatTripSearchSummary(params: TripSearchParams): string {
  const parts: string[] = [];

  if (params.from?.trim()) parts.push(`from ${params.from.trim()}`);
  if (params.to?.trim()) parts.push(`to ${params.to.trim()}`);
  else if (params.q?.trim()) parts.push(`"${params.q.trim()}"`);

  if (params.start && params.end) {
    parts.push(`${params.start} – ${params.end}`);
  } else if (params.start) {
    parts.push(`from ${params.start}`);
  } else if (params.end) {
    parts.push(`until ${params.end}`);
  }

  return parts.join(" · ");
}
