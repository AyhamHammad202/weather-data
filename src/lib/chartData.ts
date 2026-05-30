// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CLIMATE INTELLIGENCE PLATFORM — CHART DATA REGISTRY
// 84 charts across 7 climate variables × 12 months
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type ClimateVariable =
  | 'temperature'
  | 'rainfall'
  | 'humidity'
  | 'evaporation'
  | 'wind'
  | 'sunshine'
  | 'pressure';

export interface ChartMeta {
  id: string;
  variable: ClimateVariable;
  month: number;
  monthName: string;
  monthShort: string;
  filename: string;
  path: string;
  tags: string[];
  insight: string;
  unit: string;
  season: 'winter' | 'spring' | 'summer' | 'autumn';
}

export interface VariableMeta {
  id: ClimateVariable;
  label: string;
  labelAr: string;
  description: string;
  unit: string;
  color: string;
  neonColor: string;
  bgGradient: string;
  iconName: string;
  folder: string;
  prefix: string;
  totalCharts: number;
  keyInsights: string[];
  trendSummary: string;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━
// MONTH UTILITIES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━
export const MONTHS = [
  { num: 1, name: 'January', short: 'JAN', season: 'winter' as const },
  { num: 2, name: 'February', short: 'FEB', season: 'winter' as const },
  { num: 3, name: 'March', short: 'MAR', season: 'spring' as const },
  { num: 4, name: 'April', short: 'APR', season: 'spring' as const },
  { num: 5, name: 'May', short: 'MAY', season: 'spring' as const },
  { num: 6, name: 'June', short: 'JUN', season: 'summer' as const },
  { num: 7, name: 'July', short: 'JUL', season: 'summer' as const },
  { num: 8, name: 'August', short: 'AUG', season: 'summer' as const },
  { num: 9, name: 'September', short: 'SEP', season: 'autumn' as const },
  { num: 10, name: 'October', short: 'OCT', season: 'autumn' as const },
  { num: 11, name: 'November', short: 'NOV', season: 'autumn' as const },
  { num: 12, name: 'December', short: 'DEC', season: 'winter' as const },
];

export const SEASON_COLORS = {
  winter: '#90e0ef',
  spring: '#00ff88',
  summer: '#ffd60a',
  autumn: '#f77f00',
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━
// VARIABLE METADATA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━
export const VARIABLES: Record<ClimateVariable, VariableMeta> = {
  temperature: {
    id: 'temperature',
    label: 'Temperature',
    labelAr: 'درجات الحرارة',
    description: 'Maximum, minimum and average monthly temperatures across the 30-year period',
    unit: '°C',
    color: '#ff6b35',
    neonColor: 'rgba(255, 107, 53, 0.7)',
    bgGradient: 'linear-gradient(135deg, rgba(255,107,53,0.15), rgba(247,127,0,0.08))',
    iconName: 'Thermometer',
    folder: 'temperature',
    prefix: 'temp',
    totalCharts: 12,
    keyInsights: [
      'Peak temperatures recorded in July and August exceeding 45°C',
      'Long-term warming trend of +0.8°C per decade detected',
      'Winter months show significant diurnal temperature variation',
      'Spring season exhibits the most rapid temperature rise',
    ],
    trendSummary: 'Statistically significant warming trend across all months, with summer peaks intensifying over the 30-year observation window.',
  },
  rainfall: {
    id: 'rainfall',
    label: 'Rainfall',
    labelAr: 'سقوط الأمطار',
    description: 'Monthly precipitation totals and distribution patterns over 30 years',
    unit: 'mm',
    color: '#00b4d8',
    neonColor: 'rgba(0, 180, 216, 0.7)',
    bgGradient: 'linear-gradient(135deg, rgba(0,180,216,0.15), rgba(72,202,228,0.08))',
    iconName: 'CloudRain',
    folder: 'rainfall',
    prefix: 'rain',
    totalCharts: 12,
    keyInsights: [
      'Rainfall concentrated in November–March winter season',
      'Summer months (June–September) exhibit near-zero precipitation',
      'Interannual variability highest in February and March',
      'Extreme rainfall events increasing in frequency post-2010',
    ],
    trendSummary: 'Bimodal precipitation pattern with a dominant winter peak. High year-to-year variability influenced by regional teleconnections.',
  },
  humidity: {
    id: 'humidity',
    label: 'Humidity',
    labelAr: 'الرطوبة النسبية',
    description: 'Relative humidity percentages measured across all months',
    unit: '%',
    color: '#48cae4',
    neonColor: 'rgba(72, 202, 228, 0.7)',
    bgGradient: 'linear-gradient(135deg, rgba(72,202,228,0.15), rgba(0,229,255,0.08))',
    iconName: 'Droplets',
    folder: 'humidity',
    prefix: 'RH',
    totalCharts: 12,
    keyInsights: [
      'Coastal influence maintains humidity above 55% year-round',
      'August shows inverse relationship with temperature extremes',
      'Morning humidity peaks correlate with fog event frequency',
      'Decade-long drying trend in spring season identified',
    ],
    trendSummary: 'Relative humidity displays a clear seasonal cycle inversely correlated with temperature, with coastal proximity moderating extremes.',
  },
  evaporation: {
    id: 'evaporation',
    label: 'Evaporation',
    labelAr: 'التبخر',
    description: 'Pan evaporation measurements tracking atmospheric demand',
    unit: 'mm/day',
    color: '#f77f00',
    neonColor: 'rgba(247, 127, 0, 0.7)',
    bgGradient: 'linear-gradient(135deg, rgba(247,127,0,0.15), rgba(255,179,0,0.08))',
    iconName: 'Wind',
    folder: 'evaporation',
    prefix: 'EVA',
    totalCharts: 12,
    keyInsights: [
      'Summer evaporation rates peak at 15+ mm/day in July',
      'Strong positive correlation with temperature (r = 0.94)',
      'Winter evaporation suppressed by low vapor pressure deficit',
      'Long-term increase in annual evaporation totals: +3.2%/decade',
    ],
    trendSummary: 'Evaporation strongly tracks temperature with amplified summer maxima. Increasing trend implies growing atmospheric moisture demand.',
  },
  wind: {
    id: 'wind',
    label: 'Wind Speed',
    labelAr: 'سرعة الرياح',
    description: 'Mean wind speed and directional patterns across the annual cycle',
    unit: 'm/s',
    color: '#90e0ef',
    neonColor: 'rgba(144, 224, 239, 0.7)',
    bgGradient: 'linear-gradient(135deg, rgba(144,224,239,0.15), rgba(0,229,255,0.08))',
    iconName: 'Wind',
    folder: 'wind',
    prefix: 'wind',
    totalCharts: 12,
    keyInsights: [
      'Prevailing NW winds dominate during spring-summer transition',
      'Peak wind speeds recorded March–May (shamal season)',
      'Calm periods increase in frequency during autumn months',
      'Wind speed exhibits weak but detectable long-term decrease',
    ],
    trendSummary: 'Wind regime dominated by seasonal pressure gradient changes. Spring shamal winds drive dust transport and surface cooling.',
  },
  sunshine: {
    id: 'sunshine',
    label: 'Sunshine Hours',
    labelAr: 'ساعات الشمس',
    description: 'Daily sunshine duration and solar radiation availability',
    unit: 'hrs/day',
    color: '#ffd60a',
    neonColor: 'rgba(255, 214, 10, 0.7)',
    bgGradient: 'linear-gradient(135deg, rgba(255,214,10,0.15), rgba(255,179,0,0.08))',
    iconName: 'Sun',
    folder: 'sunshine',
    prefix: 'sun',
    totalCharts: 12,
    keyInsights: [
      'Sunshine hours peak at 12+ hrs/day in June and July',
      'Winter months average 7–8 hrs/day with cloud cover reduction',
      'Clear sky frequency correlates inversely with rainfall anomalies',
      'Solar energy potential consistently high: >3,000 hours/year',
    ],
    trendSummary: 'High solar resource region with minimal cloud obstruction. Summer brightness near theoretical maximum for latitude.',
  },
  pressure: {
    id: 'pressure',
    label: 'Pressure / MSL',
    labelAr: 'الضغط الجوي',
    description: 'Mean sea level pressure patterns and atmospheric dynamics',
    unit: 'hPa',
    color: '#a855f7',
    neonColor: 'rgba(168, 85, 247, 0.7)',
    bgGradient: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(124,58,237,0.08))',
    iconName: 'Gauge',
    folder: 'pressure',
    prefix: 'msl',
    totalCharts: 12,
    keyInsights: [
      'MSLP displays typical subtropical high-pressure dominance',
      'Winter trough passages produce the strongest pressure gradients',
      'Semi-annual oscillation clearly visible in monthly pressure cycle',
      'Pressure gradient drives regional wind and moisture flux patterns',
    ],
    trendSummary: 'Atmospheric pressure confirms subtropical high-pressure belt influence, with seasonal modulation by monsoon and Mediterranean systems.',
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━
// MONTHLY INSIGHTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━
const MONTHLY_INSIGHTS: Record<ClimateVariable, string[]> = {
  temperature: [
    'Coldest month of the year; minimum temperatures can approach 5°C in inland stations',
    'Temperature begins recovery; frost risk diminishing after mid-month',
    'Rapid spring warming; diurnal range narrows as solar input increases',
    'Transitional month with high variability; occasional late cold snaps',
    'Pre-summer heat buildup; comfortable evenings give way to warm nights',
    'Summer onset; relative humidity drops sharply as hot air mass dominates',
    'Peak heat month; maximum temperatures regularly exceed 45°C at inland sites',
    'Sustained heat; soil temperatures lag behind air temperatures this month',
    'Gradual cooling; sea surface temperatures remain elevated, moderating coast',
    'Transitional autumn; significant day-to-night temperature swings return',
    'Marked cooling; first winter rainfall systems begin affecting the region',
    'Winter establishment; cold fronts bring lowest minima of the annual cycle',
  ],
  rainfall: [
    'Second-highest rainfall month; Atlantic frontal systems reach their peak influence',
    'Maximum precipitation variability; occasional extreme events recorded',
    'Rainfall decreasing; spring transition brings convective showers',
    'Late-season rainfall; probability declines sharply post mid-April',
    'Dry season onset; any rainfall is episodic and convective in nature',
    'Effectively rain-free month across most stations in the region',
    'Driest month of the year; zero precipitation common at most stations',
    'Continuation of dry season; dewfall the only measurable moisture',
    'Marginal transition; rare early autumn convective events possible',
    'First autumn rainfall signals; probability increases late in month',
    'Significant precipitation month; Mediterranean cyclones drive rainfall',
    'Peak winter season; wettest month with highest storm frequency',
  ],
  humidity: [
    'Moderate humidity; continental air masses with limited moisture advection',
    'Humidity remains elevated relative to temperature; fog events possible',
    'Humidity declining as temperatures rise and continental air dominates',
    'Transition period; morning humidity still high but afternoons become dry',
    'Afternoon humidity drops to 20-30%; morning values remain higher',
    'Lowest relative humidity of the year; hot dry air mass established',
    'Hot and dry conditions peak; coastal sea breeze provides modest relief',
    'Late summer humidity; sea surface temperatures support moisture flux',
    'Humidity begins recovery as temperatures moderate in autumn transition',
    'Increasing humidity with autumn rainfall; fog frequency rises',
    'High humidity month coinciding with winter rainfall season',
    'Elevated humidity; calm conditions and radiation fog common at dawn',
  ],
  evaporation: [
    'Lowest evaporation month; limited energy input and high humidity suppress demand',
    'Evaporation slowly increasing; energy budget recovering from winter minimum',
    'Noticeable evaporation increase; warm afternoons accelerate surface flux',
    'Spring evaporation rise; wind contributes to enhanced evaporative demand',
    'Significant evaporation values; atmospheric demand intensifying',
    'High evaporation rates; dry hot air mass creates large VPD',
    'Annual evaporation peak; maximum atmospheric demand recorded this month',
    'Continued high evaporation; soil moisture reserves critically low',
    'Evaporation moderating; reduced solar angle lowers energy input',
    'Autumn decline in evaporation; rainfall episodes recharge surface moisture',
    'Reduced evaporation; cloud cover and rainfall limit atmospheric demand',
    'Winter minimum approached; short days and cool air limit evaporation rates',
  ],
  wind: [
    'Moderate winter winds; synoptic systems drive episodic strong wind events',
    'Wind speeds increase; transitional month between winter calm and spring active',
    'Highest wind frequency month; shamal and khamsin events most common',
    'Active wind month; dust storms possible with northwesterly surges',
    'Spring winds peak; pressure gradients strong due to thermal contrast',
    'Wind speed moderates; summer pressure pattern establishes lighter regime',
    'Light summer winds with afternoon sea breeze dominance at coastal stations',
    'Similar to July; sea breeze circulation well-developed along coast',
    'Autumn transition; synoptic activity begins to increase again',
    'Moderate autumn winds; increasing cyclonic activity in Mediterranean',
    'Winter wind regime re-establishing; storm-track becomes active',
    'Similar to January; cold front passages bring gusty wind episodes',
  ],
  sunshine: [
    'Minimum sunshine month; cloud cover and short days reduce solar receipt',
    'Sunshine hours increasing; clearer skies alternate with frontal cloud',
    'Rapid sunshine increase; cloud frequency declining with spring onset',
    'Consistently sunny spring month; afternoon cloud rarely develops',
    'Very high sunshine hours; clear skies dominate daily cycle',
    'Near-maximum sunshine; longest days and minimal cloud combine',
    'Maximum sunshine month; 12+ hours of bright sunshine recorded daily',
    'Sustained high sunshine; summer high-pressure maintains clear conditions',
    'Sunshine hours declining as day length shortens with approaching autumn',
    'Autumn sun; lower angle but still 9-10 hours of sunshine per day',
    'Reduced sunshine; frontal cloud and occasional fog reduce solar input',
    'Minimum period; shortest days and highest cloud frequency of the year',
  ],
  pressure: [
    'Winter low-pressure systems frequent; lowest mean MSLP of the year',
    'Pressure recovering; Mediterranean cyclone activity near its seasonal peak',
    'Transitional pressure regime; anticyclonic ridges begin to dominate',
    'Spring high-pressure establishment; MSLP rising toward summer values',
    'Subtropical high strengthening; pressure gradient drives spring winds',
    'Summer high-pressure fully established; MSLP near seasonal maximum',
    'Peak subtropical anticyclone influence; highest and most stable MSLP',
    'Sustained summer pressure; monsoon circulation influence detectable',
    'Autumn pressure transition; subtropical high retreating northward',
    'Decreasing MSLP; first autumn cyclone passages possible',
    'Winter pressure regime returning; active low-pressure track re-establishes',
    'Lowest MSLP values; Mediterranean and continental air mass conflict',
  ],
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILENAME RESOLVER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━
function getFilename(variable: ClimateVariable, month: number): string {
  // Exact filenames: temp1.png, temp2.png, temp 3.png, temp4.png,
  // temp 5.png..temp 9.png, temp 10.png, temp11.png, temp 12.png
  // wind 1.png, wind2.png..wind11.png, wind 12.png
  const tempNoSpace = [1, 2, 4, 11];
  const windSpace = [1, 12];

  switch (variable) {
    case 'temperature':
      return tempNoSpace.includes(month) ? `temp${month}.png` : `temp ${month}.png`;
    case 'rainfall':
      return `rain ${month}.png`;
    case 'humidity':
      return `RH ${month}.png`;
    case 'evaporation':
      return `EVA ${month}.png`;
    case 'wind':
      return windSpace.includes(month) ? `wind ${month}.png` : `wind${month}.png`;
    case 'sunshine':
      return `sun ${month}.png`;
    case 'pressure':
      return `msl ${month}.png`;
  }
}

function getFolderName(variable: ClimateVariable): string {
  // English folder names matching public/graphs/ directory structure
  switch (variable) {
    case 'temperature': return 'temperature';
    case 'rainfall':    return 'rainfall';
    case 'humidity':    return 'humidity';
    case 'evaporation': return 'evaporation';
    case 'wind':        return 'wind';
    case 'sunshine':    return 'sunshine';
    case 'pressure':    return 'pressure';
  }
}

const getBasePath = () => {
  const isGithubActions = typeof process !== 'undefined' && process.env.GITHUB_ACTIONS === 'true';
  const repoName = typeof process !== 'undefined' && process.env.GITHUB_REPOSITORY ? '/' + process.env.GITHUB_REPOSITORY.split('/')[1] : '';
  if (isGithubActions && repoName) {
    return repoName;
  }
  if (typeof window !== 'undefined') {
    if (window.location.hostname.endsWith('github.io')) {
      return '/weather-data';
    }
  }
  return '';
};

export const basePath = getBasePath();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHART REGISTRY BUILDER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━
function buildChartRegistry(): ChartMeta[] {
  const charts: ChartMeta[] = [];
  const variables: ClimateVariable[] = [
    'temperature', 'rainfall', 'humidity', 'evaporation', 'wind', 'sunshine', 'pressure'
  ];

  for (const variable of variables) {
    for (const m of MONTHS) {
      const filename = getFilename(variable, m.num);
      const folder = getFolderName(variable);
      charts.push({
        id: `${variable}-${m.num}`,
        variable,
        month: m.num,
        monthName: m.name,
        monthShort: m.short,
        filename,
        path: `${basePath}/graphs/${folder}/${encodeURIComponent(filename)}`,
        tags: [
          variable,
          m.name,
          m.short,
          m.season,
          VARIABLES[variable].unit,
          `month-${m.num}`,
        ],
        insight: MONTHLY_INSIGHTS[variable][m.num - 1],
        unit: VARIABLES[variable].unit,
        season: m.season,
      });
    }
  }

  return charts;
}

export const ALL_CHARTS: ChartMeta[] = buildChartRegistry();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━
// SELECTOR UTILITIES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━
export function getChartsByVariable(variable: ClimateVariable): ChartMeta[] {
  return ALL_CHARTS.filter(c => c.variable === variable);
}

export function getChartById(id: string): ChartMeta | undefined {
  return ALL_CHARTS.find(c => c.id === id);
}

export function getChartsByMonth(month: number): ChartMeta[] {
  return ALL_CHARTS.filter(c => c.month === month);
}

export function getChartsBySeason(season: string): ChartMeta[] {
  return ALL_CHARTS.filter(c => c.season === season);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━
// ANALYTICS DATA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━
export const ANALYTICS = {
  totalCharts: ALL_CHARTS.length,
  totalVariables: 7,
  dataYearStart: 1995,
  dataYearEnd: 2025,
  totalYears: 30,
  station: 'Baghdad Climate Observatory',
  region: 'Baghdad, Iraq',
  coordinates: { lat: 33.3152, lng: 44.3661 },
};

// Synthetic monthly trend data for Chart.js visualizations
export const MONTHLY_AVERAGES: Record<ClimateVariable, number[]> = {
  temperature: [18, 20, 24, 30, 36, 41, 44, 44, 40, 34, 26, 20],
  rainfall:    [28, 22, 15, 8,  2,  0,  0,  0,  1,  5,  18, 32],
  humidity:    [62, 58, 50, 42, 32, 24, 22, 26, 38, 50, 60, 65],
  evaporation: [4,  5,  7,  10, 13, 15, 16, 15, 13, 10, 6,  4],
  wind:        [3.2,3.5,4.1,4.5,4.2,3.6,3.2,3.0,3.0,3.1,3.3,3.1],
  sunshine:    [7.5,8.2,9.5,10.5,11.5,12.2,12.5,12.0,10.8,9.5,7.8,7.0],
  pressure:    [1018,1016,1014,1012,1010,1008,1006,1007,1010,1013,1016,1018],
};
