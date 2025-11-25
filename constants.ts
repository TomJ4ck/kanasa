import { GradeRow } from './types';

// Rates for Kanagawa 2025 (Employee Share)
// Health (Under 40): 9.92% / 2 = 4.96%
// Health + Care (40-64): 11.51% / 2 = 5.755%
// Welfare Pension: 18.300% / 2 = 9.15%

export const RATES = {
  HEALTH_RATE_UNDER_40: 0.0496,
  HEALTH_RATE_OVER_40: 0.05755,
  PENSION_RATE: 0.0915,
  // Employment Insurance Rate for Reiwa 7 (2025) - General Worker Burden
  // General: 5.5/1000 = 0.0055
  EMPLOYMENT_RATE: 0.0055
};

// Lookup table for Kanagawa 2025
// Based on "Standard Monthly Remuneration" (Hyojun Houshu Getsugaku)
export const REMUNERATION_TABLE: GradeRow[] = [
  { grade: 1, standard: 58000, min: 0, max: 63000 },
  { grade: 2, standard: 68000, min: 63000, max: 73000 },
  { grade: 3, standard: 78000, min: 73000, max: 83000 },
  { grade: 4, standard: 88000, min: 83000, max: 93000 },
  { grade: 5, standard: 98000, min: 93000, max: 101000 },
  { grade: 6, standard: 104000, min: 101000, max: 107000 },
  { grade: 7, standard: 110000, min: 107000, max: 114000 },
  { grade: 8, standard: 118000, min: 114000, max: 122000 },
  { grade: 9, standard: 126000, min: 122000, max: 130000 },
  { grade: 10, standard: 134000, min: 130000, max: 138000 },
  { grade: 11, standard: 142000, min: 138000, max: 146000 },
  { grade: 12, standard: 150000, min: 146000, max: 155000 },
  { grade: 13, standard: 160000, min: 155000, max: 165000 },
  { grade: 14, standard: 170000, min: 165000, max: 175000 },
  { grade: 15, standard: 180000, min: 175000, max: 185000 },
  { grade: 16, standard: 190000, min: 185000, max: 195000 },
  { grade: 17, standard: 200000, min: 195000, max: 210000 },
  { grade: 18, standard: 220000, min: 210000, max: 230000 },
  { grade: 19, standard: 240000, min: 230000, max: 250000 },
  { grade: 20, standard: 260000, min: 250000, max: 270000 },
  { grade: 21, standard: 280000, min: 270000, max: 290000 },
  { grade: 22, standard: 300000, min: 290000, max: 310000 },
  { grade: 23, standard: 320000, min: 310000, max: 330000 },
  { grade: 24, standard: 340000, min: 330000, max: 350000 },
  { grade: 25, standard: 360000, min: 350000, max: 370000 },
  { grade: 26, standard: 380000, min: 370000, max: 395000 },
  { grade: 27, standard: 410000, min: 395000, max: 425000 },
  { grade: 28, standard: 440000, min: 425000, max: 455000 },
  { grade: 29, standard: 470000, min: 455000, max: 485000 },
  { grade: 30, standard: 500000, min: 485000, max: 515000 },
  { grade: 31, standard: 530000, min: 515000, max: 545000 },
  { grade: 32, standard: 560000, min: 545000, max: 575000 },
  { grade: 33, standard: 590000, min: 575000, max: 605000 },
  { grade: 34, standard: 620000, min: 605000, max: 635000 },
  { grade: 35, standard: 650000, min: 635000, max: 665000 }, // PENSION MAX CAP (650k) typically aligns here
  { grade: 36, standard: 680000, min: 665000, max: 695000 },
  { grade: 37, standard: 710000, min: 695000, max: 730000 },
  { grade: 38, standard: 750000, min: 730000, max: 770000 },
  { grade: 39, standard: 790000, min: 770000, max: 810000 },
  { grade: 40, standard: 830000, min: 810000, max: 855000 },
  { grade: 41, standard: 880000, min: 855000, max: 905000 },
  { grade: 42, standard: 930000, min: 905000, max: 955000 },
  { grade: 43, standard: 980000, min: 955000, max: 1005000 },
  { grade: 44, standard: 1030000, min: 1005000, max: 1055000 },
  { grade: 45, standard: 1090000, min: 1055000, max: 1115000 },
  { grade: 46, standard: 1150000, min: 1115000, max: 1175000 },
  { grade: 47, standard: 1210000, min: 1175000, max: 1235000 },
  { grade: 48, standard: 1270000, min: 1235000, max: 1295000 },
  { grade: 49, standard: 1330000, min: 1295000, max: 1355000 },
  { grade: 50, standard: 1390000, min: 1355000, max: 99999999 }, // HEALTH MAX CAP
];

// Tax table derived from Withholding Tax Table for 2025 (Reiwa 7)
// Based on data from OCR pages 1-6
export const TAX_TABLE = {
  LOW_INCOME_ANCHORS: [
    { min: 88000, tax: [130, 0, 0, 0, 0, 0, 0, 0] },
    { min: 89000, tax: [180, 0, 0, 0, 0, 0, 0, 0] },
    { min: 90000, tax: [230, 0, 0, 0, 0, 0, 0, 0] },
    { min: 95000, tax: [490, 0, 0, 0, 0, 0, 0, 0] },
    { min: 100000, tax: [720, 0, 0, 0, 0, 0, 0, 0] }, // approx from table row 99k-101k
    { min: 110000, tax: [1240, 0, 0, 0, 0, 0, 0, 0] },
    { min: 120000, tax: [1750, 120, 0, 0, 0, 0, 0, 0] }, // approx
    { min: 150000, tax: [2980, 1360, 0, 0, 0, 0, 0, 0] }, // approx
    { min: 200000, tax: [4770, 3140, 1530, 0, 0, 0, 0, 0] }, // approx
    { min: 250000, tax: [6640, 5020, 3410, 1790, 170, 0, 0, 0] }, // approx
    { min: 300000, tax: [8670, 6860, 5250, 3630, 2010, 400, 0, 0] }, // approx
    { min: 350000, tax: [12590, 9350, 7210, 5600, 3970, 2360, 750, 0] }, // approx
    { min: 400000, tax: [16510, 13270, 10040, 7560, 5930, 4320, 2710, 1080] }, // approx
    { min: 500000, tax: [29890, 23430, 18370, 15140, 11900, 8670, 6870, 5250] }, // approx
    { min: 600000, tax: [47100, 40640, 34160, 27700, 21240, 17280, 14040, 10810] }, // approx from 599-602 row
    { min: 700000, tax: [65290, 58830, 52360, 45890, 39430, 32960, 26490, 20030] }, // approx
  ],
  HIGH_INCOME_RULES: [
    {
      threshold: 740000,
      baseTax: [73390, 66920, 60450, 53980, 47520, 41050, 34580, 28120],
      rate: 0.2042
    },
    {
      threshold: 780000,
      baseTax: [81560, 75090, 68620, 62150, 55690, 49220, 42750, 36290],
      rate: 0.23483
    },
    {
      threshold: 950000,
      baseTax: [121480, 115010, 108540, 102070, 95610, 89140, 82670, 76210],
      rate: 0.33693
    },
    {
      threshold: 1700000,
      baseTax: [374180, 367710, 361240, 354770, 348310, 341840, 335370, 328910],
      rate: 0.4084
    },
    {
      threshold: 3500000,
      baseTax: [1125620, 1119150, 1112690, 1106210, 1099750, 1093290, 1086810, 1080350],
      rate: 0.45945
    }
  ]
};