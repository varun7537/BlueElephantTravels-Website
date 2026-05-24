export type ContactChannel = {
  icon: React.ElementType;
  label: string;
  value: string;
  subValue?: string;
  href: string;
  iconBg: string;
  iconColor: string;
  badge?: string;
};

export type OfficeLocation = {
  city: string;
  address: string;
  phone: string;
  hours: string;
  mapQuery: string;
  isPrimary?: boolean;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type TripType =
  | ""
  | "International"
  | "Domestic"
  | "Honeymoon"
  | "Corporate MICE"
  | "Destination Wedding"
  | "Group / Family"
  | "Other";

export type FormState = {
  name: string;
  email: string;
  phone: string;
  tripType: TripType;
  destination: string;
  message: string;
};