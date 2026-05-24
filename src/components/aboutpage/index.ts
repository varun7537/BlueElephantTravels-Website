// Shared
export { default as Divider } from "./Divider";

// Sections
export { default as AboutHero } from "./Abouthero";
export { default as MeetFounder } from "./Meetfounder";
export { default as WhyChooseUs } from "./Whychooseus";
export { default as WhatWeOffer } from "./Whatweoffer";
export { default as OurValues } from "./Ourvalues";
export { default as FAQ } from "./Faq";

// Sub-components (export in case they need to be used independently)
export { default as OfferingCard } from "./Offeringcard";
export { default as ValueCard } from "./Valuecard";
export { default as FAQAccordionItem } from "./Faqaccordionitem";

// Data / types
export { OFFERINGS } from "../../app/about/data/Offerings.data";
export type { Offering } from "../../app/about/data/Offerings.data";

export { VALUES } from "../../app/about/data/Values.data";
export type { Value } from "../../app/about/data/Values.data";

export { FAQS } from "../../app/about/data/Faqs.data";
export type { FAQItem } from "../../app/about/data/Faqs.data";