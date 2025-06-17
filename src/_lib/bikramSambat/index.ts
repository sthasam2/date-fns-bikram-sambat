// Direct Bikram Sambat (Nepali Calendar) conversion functions
// Using lookup tables instead of Julian Day Number intermediary

// Constants from the provided data
const startDateAD = 19430414; // April 14, 1943 CE
const startDateBS = 20000101; // Baisakh 1, 2000 BS

const bsStartYear = 2000;
const bsEndYear = 2089;

const yearMonthDaysMap = {
	2000: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
	2001: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
	2002: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
	2003: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
	2004: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
	2005: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
	2006: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
	2007: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
	2008: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
	2009: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
	2010: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
	2011: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
	2012: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
	2013: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
	2014: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
	2015: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
	2016: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
	2017: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
	2018: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
	2019: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
	2020: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
	2021: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
	2022: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
	2023: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
	2024: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
	2025: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
	2026: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
	2027: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
	2028: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
	2029: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
	2030: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
	2031: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
	2032: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
	2033: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
	2034: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
	2035: [30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
	2036: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
	2037: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
	2038: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
	2039: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
	2040: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
	2041: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
	2042: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
	2043: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
	2044: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
	2045: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
	2046: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
	2047: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
	2048: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
	2049: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
	2050: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
	2051: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
	2052: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
	2053: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
	2054: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
	2055: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
	2056: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
	2057: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
	2058: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
	2059: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
	2060: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
	2061: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
	2062: [30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
	2063: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
	2064: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
	2065: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
	2066: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
	2067: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
	2068: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
	2069: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
	2070: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
	2071: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
	2072: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
	2073: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
	2074: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
	2075: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
	2076: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
	2077: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
	2078: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
	2079: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
	2080: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
	2081: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
	2082: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
	2083: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
	2084: [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
	2085: [31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30],
	2086: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
	2087: [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30],
	2088: [30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30],
	2089: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
} satisfies Record<number, number[]>;

const baishakOneMap = {
	2000: 19430414,
	2001: 19440413,
	2002: 19450413,
	2003: 19460413,
	2004: 19470414,
	2005: 19480413,
	2006: 19490413,
	2007: 19500413,
	2008: 19510414,
	2009: 19520413,
	2010: 19530413,
	2011: 19540413,
	2012: 19550414,
	2013: 19560413,
	2014: 19570413,
	2015: 19580413,
	2016: 19590414,
	2017: 19600413,
	2018: 19610413,
	2019: 19620413,
	2020: 19630414,
	2021: 19640413,
	2022: 19650413,
	2023: 19660413,
	2024: 19670414,
	2025: 19680413,
	2026: 19690413,
	2027: 19700414,
	2028: 19710414,
	2029: 19720413,
	2030: 19730413,
	2031: 19740414,
	2032: 19750414,
	2033: 19760413,
	2034: 19770413,
	2035: 19780414,
	2036: 19790414,
	2037: 19800413,
	2038: 19810413,
	2039: 19820414,
	2040: 19830414,
	2041: 19840413,
	2042: 19850413,
	2043: 19860414,
	2044: 19870414,
	2045: 19880413,
	2046: 19890413,
	2047: 19900414,
	2048: 19910414,
	2049: 19920413,
	2050: 19930413,
	2051: 19940414,
	2052: 19950414,
	2053: 19960413,
	2054: 19970413,
	2055: 19980414,
	2056: 19990414,
	2057: 20000413,
	2058: 20010414,
	2059: 20020414,
	2060: 20030414,
	2061: 20040413,
	2062: 20050414,
	2063: 20060414,
	2064: 20070414,
	2065: 20080413,
	2066: 20090414,
	2067: 20100414,
	2068: 20110414,
	2069: 20120413,
	2070: 20130414,
	2071: 20140414,
	2072: 20150414,
	2073: 20160413,
	2074: 20170414,
	2075: 20180414,
	2076: 20190414,
	2077: 20200413,
	2078: 20210414,
	2079: 20220414,
	2080: 20230414,
	2081: 20240413,
	2082: 20250414,
	2083: 20260414,
	2084: 20270414,
	2085: 20280413,
	2086: 20290414,
	2087: 20300414,
	2088: 20310415,
	2089: 20320414,
} satisfies Record<number, number>;

// Constants for localization
const ENGLISH_NEPALI_MONTH = [
	"Baisakh",
	"Jestha",
	"Asar",
	"Shrawan",
	"Bhadra",
	"Aswin",
	"Kartik",
	"Mangsir",
	"Poush",
	"Magh",
	"Falgun",
	"Chaitra",
];

const NEPALI_MONTH = [
	"बैशाख",
	"जेठ",
	"असार",
	"श्रावण",
	"भाद्र",
	"आश्विन",
	"कार्तिक",
	"मंसिर",
	"पौष",
	"माघ",
	"फाल्गुण",
	"चैत्र",
];

const NEPALI_DIGITS = {
	"0": "०",
	"1": "१",
	"2": "२",
	"3": "३",
	"4": "४",
	"5": "५",
	"6": "६",
	"7": "७",
	"8": "८",
	"9": "९",
};

/**
 * Parse date from YYYYMMDD integer format
 */
export function dateToGreagorian(dateInt: number): {
	year: number;
	month: number;
	day: number;
} {
	const str = dateInt.toString();
	return {
		year: Number.parseInt(str.substring(0, 4)),
		month: Number.parseInt(str.substring(4, 6)),
		day: Number.parseInt(str.substring(6, 8)),
	};
}

/**
 * Convert date to YYYYMMDD integer format
 */
export function gregorianToDate(year: number, month: number, day: number): number {
	return year * 10000 + month * 100 + day;
}

/**
 * Calculate days between two Gregorian dates
 */
function daysBetweenGregorian(startDate: number, endDate: number): number {
	const start = dateToGreagorian(startDate);
	const end = dateToGreagorian(endDate);

	const startJSDate = new Date(start.year, start.month - 1, start.day);
	const endJSDate = new Date(end.year, end.month - 1, end.day);

	const timeDiff = endJSDate.getTime() - startJSDate.getTime();
	return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
}

/**
 * Add days to a Gregorian date
 */
function addDaysToGregorian(dateInt: number, days: number): number {
	const parsed = dateToGreagorian(dateInt);
	const date = new Date(parsed.year, parsed.month - 1, parsed.day);
	date.setDate(date.getDate() + days);

	return gregorianToDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

/**
 * Get days in a BS month for a specific year
 */
function getDaysInBm(by: number, bm: number): number {
	if (!(by in yearMonthDaysMap)) {
		throw new Error(
			`BS year ${by} is out of supported range (${bsStartYear}-${bsEndYear})`,
		);
	}
	// @ts-expect-error: by key inference is check via prev if
	return yearMonthDaysMap[by][bm - 1];
}

/**
 * Get total days in a BS year
 */
function getTotalDaysInBy(by: number): number {
	if (!(by in yearMonthDaysMap)) {
		throw new Error(
			`BS year ${by} is out of supported range (${bsStartYear}-${bsEndYear})`,
		);
	}
	// @ts-expect-error: by key inference is check via prev if
	return yearMonthDaysMap[by].reduce((sum, days) => sum + days, 0);
}

/**
 * Get Baisakh 1 date for a given BS year
 */
function getBaishakOneAD(by: number): number {
	if (!(by in baishakOneMap)) {
		throw new Error(`BS year ${by} is out of supported range`);
	}
	// @ts-expect-error: by key inference is check via prev if
	return baishakOneMap[by];
}

/**
 * Converts a Gregorian date to Bikram Sambat
 */
export function toBikramSambat(
	gy: number,
	gm: number,
	gd: number,
): { by: number; bm: number; bd: number } {
	const gregorianDate = gregorianToDate(gy, gm, gd);
	if (gregorianDate < startDateAD) {
		throw new Error("Given data is out of supported range");
	}

	// Find the appropriate BS year by checking which Baisakh 1 this date falls after
	let by = 2000;
	let baishakOneDate = getBaishakOneAD(by);

	// Find the correct BS year
	while (by < bsEndYear) {
		const nextBaishakOne = getBaishakOneAD(by + 1);
		if (gregorianDate >= baishakOneDate && gregorianDate < nextBaishakOne) {
			break;
		}
		by++;
		baishakOneDate = nextBaishakOne;
	}

	// Calculate days from Baisakh 1 of this BS year
	const daysSince2000Baisakh1 = daysBetweenGregorian(
		baishakOneDate,
		gregorianDate,
	);

	if (daysSince2000Baisakh1 < 0) {
		// Date is before this year's Baisakh 1, go to previous year
		by--;
		baishakOneDate = getBaishakOneAD(by);
		const newDaysSinceBaisakh1 = daysBetweenGregorian(
			baishakOneDate,
			gregorianDate,
		);
		return calculateBSDate(by, newDaysSinceBaisakh1);
	}

	return calculateBSDate(by, daysSince2000Baisakh1);
}

/**
 * Calculate BS month and day from year and days since Baisakh 1
 */
function calculateBSDate(
	by: number,
	daysSince2000Baisakh1: number,
): { by: number; bm: number; bd: number } {
	let bm = 1;
	let remainingDays = daysSince2000Baisakh1;

	// Find the month
	while (bm <= 12) {
		const daysInMonth = getDaysInBm(by, bm);
		if (remainingDays < daysInMonth) {
			break;
		}
		remainingDays -= daysInMonth;
		bm++;
	}

	const bd = remainingDays + 1; // +1 because days start from 1

	return { by, bm, bd };
}

/**
 * Converts a Bikram Sambat date to Gregorian
 */
export function toGregorian(
	by: number,
	bm: number,
	bd: number,
): { gy: number; gm: number; gd: number } {
	// Get Baisakh 1 of this BS year
	const baishakOneDate = getBaishakOneAD(by);

	// Calculate days to add from Baisakh 1
	let daysToAdd = bd - 1; // Start from day 1

	// Add days for complete months
	for (let month = 1; month < bm; month++) {
		daysToAdd += getDaysInBm(by, month);
	}

	// Add days to Baisakh 1 to get the Gregorian date
	const gregorianDate = addDaysToGregorian(baishakOneDate, daysToAdd);
	const parsed = dateToGreagorian(gregorianDate);

	return {
		gy: parsed.year,
		gm: parsed.month,
		gd: parsed.day,
	};
}

/**
 * Check if a BS year is a leap year (has 366 days)
 */
export function isLeapBikramSambatYear(by: number): boolean {
	return getTotalDaysInBy(by) === 366;
}

/**
 * Get month name in English
 */
function getBmName(bm: number, nepali = false): string {
	if (nepali) {
		return NEPALI_MONTH[bm - 1] || "";
	}
	return ENGLISH_NEPALI_MONTH[bm - 1] || "";
}

/**
 * Convert number to Nepali digits
 */
function toNepaliDigits(num: number | string): string {
	return num
		.toString()
		.replace(
			/[0-9]/g,
			(digit) => NEPALI_DIGITS[digit as keyof typeof NEPALI_DIGITS] || digit,
		);
}

/**
 * Format BS date as string
 */
function formatBSDate(
	by: number,
	bm: number,
	bd: number,
	options: {
		includeMonthName?: boolean;
		nepali?: boolean;
		separator?: string;
	} = {},
): string {
	const { includeMonthName = true, nepali = false, separator = "/" } = options;

	if (includeMonthName) {
		const monthName = getBmName(bm, nepali);
		if (nepali) {
			return `${toNepaliDigits(bd)} ${monthName} ${toNepaliDigits(by)}`;
		}
		return `${bd} ${monthName} ${by}`;
	}

	const formatted = `${by}${separator}${bm.toString().padStart(2, "0")}${separator}${bd.toString().padStart(2, "0")}`;
	return nepali ? toNepaliDigits(formatted) : formatted;
}

/**
 * Get current BS date
 */
function getCurrentBSDate(): {
	by: number;
	bm: number;
	bd: number;
} {
	const now = new Date();
	return toBikramSambat(now.getFullYear(), now.getMonth() + 1, now.getDate());
}

/**
 * Get supported year range
 */
function getSupportedYearRange(): { minYear: number; maxYear: number } {
	return {
		minYear: bsStartYear,
		maxYear: bsEndYear,
	};
}

// Example usage and testing
export function testBikramSambatConversions() {
	console.log("Testing Direct Bikram Sambat Calendar Conversions:");

	const range = getSupportedYearRange();
	console.log(`Supported range: BS ${range.minYear} - ${range.maxYear}`);

	// Test current date
	const current = getCurrentBSDate();
	console.log(
		`Current BS Date: [${JSON.stringify(current)}] ${formatBSDate(current.by, current.bm, current.bd)}`,
	);
	console.log(
		`Current BS Date (Nepali): [${JSON.stringify(current)}] ${formatBSDate(current.by, current.bm, current.bd, { nepali: true })}`,
	);

	// Test specific conversions
	const testDates = [
		{ gy: 2024, gm: 1, gd: 1 },
		{ gy: 2024, gm: 4, gd: 13 }, // Should be close to Nepali New Year
		{ gy: 1943, gm: 4, gd: 14 }, // First supported date
		{ gy: 2024, gm: 12, gd: 31 },
	];

	for (const { gy, gm, gd } of testDates) {
		try {
			const bs = toBikramSambat(gy, gm, gd);
			const backToGregorian = toGregorian(bs.by, bs.bm, bs.bd);

			console.log(
				`Gregorian: ${gy}/${gm}/${gd} -> BS: ${formatBSDate(bs.by, bs.bm, bs.bd)}`,
			);
			console.log(
				`Back to Gregorian: ${backToGregorian.gy}/${backToGregorian.gm}/${backToGregorian.gd}`,
			);
			console.log(`Is leap year: ${isLeapBikramSambatYear(bs.by)}`);
			console.log("---");
		} catch (error) {
			console.log(
				`Error converting ${gy}/${gm}/${gd}: ${error}`,
			);
		}
	}
}
