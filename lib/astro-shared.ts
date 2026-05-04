export const TITHI_NAMES = [
  "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
  "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami",
  "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima",
  "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
  "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami",
  "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Amavasya"
];

export const NAKSHATRA_NAMES = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashirsha",
  "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha",
  "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati",
  "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha",
  "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada",
  "Uttara Bhadrapada", "Revati"
];

export const ZODIAC_SIGNS = [
  { name: "Capricorn", icon: "♑", start: { m: 12, d: 22 }, end: { m: 1, d: 19 } },
  { name: "Aquarius", icon: "♒", start: { m: 1, d: 20 }, end: { m: 2, d: 18 } },
  { name: "Pisces", icon: "♓", start: { m: 2, d: 19 }, end: { m: 3, d: 20 } },
  { name: "Aries", icon: "♈", start: { m: 3, d: 21 }, end: { m: 4, d: 19 } },
  { name: "Taurus", icon: "♉", start: { m: 4, d: 20 }, end: { m: 5, d: 20 } },
  { name: "Gemini", icon: "♊", start: { m: 5, d: 21 }, end: { m: 6, d: 20 } },
  { name: "Cancer", icon: "♋", start: { m: 6, d: 21 }, end: { m: 7, d: 22 } },
  { name: "Leo", icon: "♌", start: { m: 7, d: 23 }, end: { m: 8, d: 22 } },
  { name: "Virgo", icon: "♍", start: { m: 8, d: 23 }, end: { m: 9, d: 22 } },
  { name: "Libra", icon: "♎", start: { m: 9, d: 23 }, end: { m: 10, d: 22 } },
  { name: "Scorpio", icon: "♏", start: { m: 10, d: 23 }, end: { m: 11, d: 21 } },
  { name: "Sagittarius", icon: "♐", start: { m: 11, d: 22 }, end: { m: 12, d: 21 } },
];

export function getZodiacSign(dob: string) {
  if (!dob) return null;
  const [year, month, day] = dob.split("-").map(Number);
  
  for (const sign of ZODIAC_SIGNS) {
    if (
      (month === sign.start.m && day >= sign.start.d) ||
      (month === sign.end.m && day <= sign.end.d)
    ) {
      return sign;
    }
  }
  return ZODIAC_SIGNS[0];
}
