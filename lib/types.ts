export interface PanchangData {
  tithi: string;
  nakshatra: string;
  paksha: string;
}

export interface PanchangInternal {
  tithiIndex: number;
  sunRasi: number;
  moonLong: number;
  sunLong: number;
}

export interface EphemerisData {
  moonLong: number;
  sunLong: number;
  sunRasi: number;
  tithiIndex: number;
}

export interface Festival {
  name: string;
  description: string;
  month: string;
  tithi: number;
  sunRasi: number;
  date?: string;
}

export interface CalendarDay {
  day: number;
  dob: string;
  dayOfWeek: string;
  tithi: string;
  paksha: string;
  nakshatra: string;
  festival?: {
    name: string;
    description: string;
  };
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  dob: string;
  tob: string;
  panchang: PanchangData;
}

export interface Ancestor {
  id: string;
  name: string;
  deathDate: Date | undefined;
}

export interface UserProfile {
  name: string;
  dob: string;
  tob: string;
  panchang?: PanchangData;
}
