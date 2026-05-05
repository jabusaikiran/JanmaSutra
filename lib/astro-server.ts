import { utc_to_jd, calc, set_sid_mode, constants } from "sweph";
import { TITHI_NAMES, NAKSHATRA_NAMES } from "./astro-shared";
import { EphemerisData, PanchangData } from "./types";

/** Constants for Vedic Astrology */
const DEGREES_IN_CIRCLE = 360;
const DEGREES_PER_RASI = 30;
const TOTAL_NAKSHATRAS = 27;
const DEGREES_PER_NAKSHATRA = DEGREES_IN_CIRCLE / TOTAL_NAKSHATRAS; // 13.333...
const TITHI_DEGREES = 12;

const DEFAULT_OFFSET_MINS = -330; // IST (GMT+5:30)
const NOON_HOUR = 12;

/** 
 * Helper to calculate Julian Day from local time details.
 * Uses robust JS Date for month/day overflows.
 */
export function getJulianDay(
  year: number, 
  month: number, 
  day: number, 
  hour: number, 
  min: number, 
  offsetMinutes: number
): number {
  // Date.UTC returns timestamp in ms. We add back the offset to get the UTC equivalent.
  const timestampMs = Date.UTC(year, month - 1, day, hour, min, 0) + (offsetMinutes * 60000);
  const date = new Date(timestampMs);

  const res = utc_to_jd(
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
    constants.SE_GREG_CAL
  );
  
  return res.data[0];
}

/** 
 * Computes planetary positions returning Sun Rasi, Moon Longitude, and Tithi Index.
 * LAHIRI Ayanamsha is used as the standard for Vedic Calculations.
 */
export function getEphemerisData(jd_et: number): EphemerisData {
  set_sid_mode(constants.SE_SIDM_LAHIRI, 0, 0);
  const flags = constants.SEFLG_MOSEPH | constants.SEFLG_SPEED | constants.SEFLG_SIDEREAL;
  
  const moonRes = calc(jd_et, constants.SE_MOON, flags);
  const sunRes = calc(jd_et, constants.SE_SUN, flags);
  
  const moonLong = moonRes.data[0];
  const sunLong = sunRes.data[0];

  // Tithi calculation: (Moon Longitude - Sun Longitude) / 12 degrees
  let diff = moonLong - sunLong;
  if (diff < 0) diff += DEGREES_IN_CIRCLE;

  return {
    moonLong,
    sunLong,
    sunRasi: Math.floor(sunLong / DEGREES_PER_RASI),
    tithiIndex: Math.floor(diff / TITHI_DEGREES),
  };
}

/** 
 * Main entry point for birth panchang calculation.
 * Returns both display strings and internal indices for further processing.
 */
export function calculatePanchang(
  dob: string, 
  tob: string, 
  tzOffsetMins: string
): PanchangData & { _internal: { tithiIndex: number, sunRasi: number } } {
  const [year, month, day] = dob.split("-").map(Number);
  
  let localHour = NOON_HOUR;
  let localMin = 0;
  
  if (tob) {
    const [h, m] = tob.split(":").map(Number);
    if (!isNaN(h)) localHour = h;
    if (!isNaN(m)) localMin = m;
  }

  const offset = parseInt(tzOffsetMins || String(DEFAULT_OFFSET_MINS), 10);
  const jd_et = getJulianDay(year, month, day, localHour, localMin, offset);
  
  const { moonLong, sunRasi, tithiIndex } = getEphemerisData(jd_et);

  const isShuklaPaksha = tithiIndex < 15;
  const paksha = isShuklaPaksha ? "Shukla Paksha" : "Krishna Paksha";
  const tithiName = TITHI_NAMES[tithiIndex];

  const nakshatraIndex = Math.floor(moonLong / DEGREES_PER_NAKSHATRA);
  const nakshatraName = NAKSHATRA_NAMES[nakshatraIndex];

  return {
    tithi: `${paksha.split(' ')[0]} ${tithiName}`,
    nakshatra: nakshatraName,
    paksha: paksha,
    _internal: {
      tithiIndex: tithiIndex,
      sunRasi: sunRasi
    }
  };
}

/** 
 * Finds the Vedic Birthday for a given year.
 * Vedic tradition celebrates birthdays when the Sun is in the birth Rasi AND 
 * the Moon is in the birth Tithi.
 */
export function findNextBirthday(
  birthSunRasi: number, 
  birthTithiIndex: number, 
  targetYear: number, 
  tzOffsetMins: string
): string | null {
  const offset = parseInt(tzOffsetMins || String(DEFAULT_OFFSET_MINS), 10);
  
  /** 
   * Optimization: We only start checking from 15 days before the estimated Sun entrance into the Rasi.
   * Aries (0) starts around month 4. 
   * Estimation: Month starts at ((birthSunRasi + 3) % 12) + 1. 
   * We add a margin of safety.
   */
  for (let dayOfYear = 1; dayOfYear <= 366; dayOfYear++) {
    const jd_et = getJulianDay(targetYear, 1, dayOfYear, NOON_HOUR, 0, offset);
    const { sunRasi, tithiIndex } = getEphemerisData(jd_et);

    if (sunRasi === birthSunRasi && tithiIndex === birthTithiIndex) {
      const date = new Date(Date.UTC(targetYear, 0, dayOfYear));
      return date.toISOString().split('T')[0];
    }
    
    // Safety break for non-leap years
    if (dayOfYear === 365) {
      const isLeap = (targetYear % 4 === 0 && targetYear % 100 !== 0) || (targetYear % 400 === 0);
      if (!isLeap) break;
    }
  }

  return null;
}
