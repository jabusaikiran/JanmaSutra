import { utc_to_jd, calc, set_sid_mode, constants } from "sweph";
import { TITHI_NAMES, NAKSHATRA_NAMES } from "./astro-shared";

/** Helper to calculate Julian Day from local time details */
export function getJulianDay(year: number, month: number, day: number, hour: number, min: number, offsetMinutes: number) {
  // Use Date.UTC directly to prevent server local time from skewing results before timezone offset is applied.
  const utcMs = Date.UTC(year, month - 1, day, hour, min, 0) + (offsetMinutes * 60000);
  const utcDate = new Date(utcMs);

  const dateRes = utc_to_jd(
    utcDate.getUTCFullYear(),
    utcDate.getUTCMonth() + 1,
    utcDate.getUTCDate(),
    utcDate.getUTCHours(),
    utcDate.getUTCMinutes(),
    utcDate.getUTCSeconds(),
    constants.SE_GREG_CAL
  );
  return dateRes.data[0];
}

/** Computes planetary positions returning Sun Rasi, Moong Longitude, and Tithi Index */
export function getEphemerisData(jd_et: number) {
  set_sid_mode(constants.SE_SIDM_LAHIRI, 0, 0);
  const flags = constants.SEFLG_MOSEPH | constants.SEFLG_SPEED | constants.SEFLG_SIDEREAL;
  
  const moonRes = calc(jd_et, constants.SE_MOON, flags);
  const sunRes = calc(jd_et, constants.SE_SUN, flags);
  
  const moonLong = moonRes.data[0];
  const sunLong = sunRes.data[0];

  let diff = moonLong - sunLong;
  if (diff < 0) diff += 360;

  return {
    moonLong,
    sunLong,
    sunRasi: Math.floor(sunLong / 30),
    tithiIndex: Math.floor(diff / 12),
  };
}

export function calculatePanchang(dob: string, tob: string, tzOffsetMins: string) {
  const [year, month, day] = dob.split("-").map(Number);
  
  let localHour = 12;
  let localMin = 0;
  if (tob) {
    const timeParts = tob.split(":");
    localHour = parseInt(timeParts[0], 10);
    localMin = parseInt(timeParts[1], 10);
  }

  const offset = parseInt(tzOffsetMins || "-330", 10);
  const jd_et = getJulianDay(year, month, day, localHour, localMin, offset);
  
  const { moonLong, sunRasi, tithiIndex } = getEphemerisData(jd_et);

  const paksha = tithiIndex < 15 ? "Shukla Paksha" : "Krishna Paksha";
  const tithiName = TITHI_NAMES[tithiIndex];

  const nakshatraIndex = Math.floor(moonLong / (360 / 27));
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

export function findNextBirthday(birthSunRasi: number, birthTithiIndex: number, targetYear: number, tzOffsetMins: string) {
  const offset = parseInt(tzOffsetMins || "-330", 10);
  
  for (let d = 1; d <= 366; d++) {
    const jd_et = getJulianDay(targetYear, 1, d, 12, 0, offset);
    const { sunRasi, tithiIndex } = getEphemerisData(jd_et);

    if (sunRasi === birthSunRasi && tithiIndex === birthTithiIndex) {
      const matchMs = Date.UTC(targetYear, 0, d, 12, 0, 0);
      return new Date(matchMs).toISOString().split('T')[0];
    }
    
    // Stop early if checking a non-leap year's 366th day falls into the next year.
    if (d === 366) {
      const ms = Date.UTC(targetYear, 0, d, 12, 0, 0);
      if (new Date(ms).getUTCFullYear() > targetYear) break;
    }
  }

  return null;
}
