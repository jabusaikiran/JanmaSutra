import { Festival } from "./types";

export const FESTIVALS: Festival[] = [
  {
    name: "Diwali",
    month: "Kartik",
    sunRasi: 7, 
    tithi: 29, // Amavasya
    description: "The Festival of Lights. Celebrating the victory of light over darkness and the return of Lord Rama to Ayodhya."
  },
  {
    name: "Holi",
    month: "Phalguna",
    sunRasi: 11,
    tithi: 14, // Purnima
    description: "The Festival of Colors. Highlighting the arrival of spring and the triumph of good over evil."
  },
  {
    name: "Maha Shivaratri",
    month: "Phalguna",
    sunRasi: 10, // Late Magha or Early Phalguna
    tithi: 28, // Krishna Chaturdashi
    description: "The Great Night of Shiva. A night of devotion, fasting, and meditation."
  },
  {
    name: "Navratri (Sharada)",
    month: "Ashvin",
    sunRasi: 6,
    tithi: 0, // Shukla Pratipada
    description: "Nine nights dedicated to Shakti (the divine feminine). Culminates in Vijayadashami."
  },
  {
    name: "Ganesh Chaturthi",
    month: "Bhadrapada",
    sunRasi: 5,
    tithi: 3, // Shukla Chaturthi
    description: "Honoring the birth of Lord Ganesha, the remover of obstacles."
  },
  {
    name: "Janmashtami",
    month: "Bhadrapada",
    sunRasi: 5,
    tithi: 22, // Krishna Ashtami
    description: "Celebrating the divine birth of Lord Krishna."
  },
  {
    name: "Raksha Bandhan",
    month: "Shravana",
    sunRasi: 4,
    tithi: 14, // Purnima
    description: "Celebrating the sacred bond of protection between siblings."
  },
  {
    name: "Guru Purnima",
    month: "Ashadha",
    sunRasi: 3,
    tithi: 14, // Purnima
    description: "A day to honor spiritual and academic gurus."
  },
  {
    name: "Rama Navami",
    month: "Chaitra",
    sunRasi: 0,
    tithi: 8, // Shukla Navami
    description: "Celebrating the birth of Lord Rama, the seventh avatar of Vishnu."
  },
  {
    name: "Ugadi / Gudi Padwa",
    month: "Chaitra",
    sunRasi: 0,
    tithi: 0, // Shukla Pratipada
    description: "The Vedic New Year. A time for new beginnings and spiritual growth."
  }
];
