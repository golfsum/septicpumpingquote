export type Location = {
  slug: string;
  name: string;
  state: 'AZ';
  stateSlug: 'az';
  nearbySlugs: string[];
  zipExamples: string[];
  localNotes: string;
};

export const LOCATIONS: Record<string, Location> = {
  tucson: {
    slug: 'tucson',
    name: 'Tucson',
    state: 'AZ',
    stateSlug: 'az',
    nearbySlugs: ['marana', 'oro-valley', 'sahuarita', 'vail', 'catalina'],
    zipExamples: ['85701', '85704', '85710', '85712', '85719', '85730', '85745', '85749'],
    localNotes:
      'Much of metro Tucson relies on septic in outlying neighborhoods, foothill parcels, and older unincorporated pockets where municipal sewer never reached. Caliche and compacted desert soils are common, which can limit drain-field sizing and make locating buried tanks harder without proper records. Monsoon downpours can saturate absorption areas quickly, so homeowners often notice slow drains or surfacing effluent after heavy summer rains.',
  },
  marana: {
    slug: 'marana',
    name: 'Marana',
    state: 'AZ',
    stateSlug: 'az',
    nearbySlugs: ['tucson', 'oro-valley', 'catalina', 'sahuarita'],
    zipExamples: ['85653', '85658', '85742', '85743'],
    localNotes:
      'Marana mixes newer master-planned communities with rural acreage along the I-10 corridor and Avra Valley, where septic remains standard outside sewer districts. Well water and septic often share the same lot, so cross-contamination prevention and proper setback distances matter during repairs. Hard water in the area can accelerate grease and mineral buildup in tanks if pumping intervals are stretched too long.',
  },
  'oro-valley': {
    slug: 'oro-valley',
    name: 'Oro Valley',
    state: 'AZ',
    stateSlug: 'az',
    nearbySlugs: ['tucson', 'catalina', 'marana'],
    zipExamples: ['85704', '85737', '85755'],
    localNotes:
      'Oro Valley and the adjacent Catalina foothills include hillside homes where steep grades affect drain-field layout and access for pump trucks. Many properties date to the 1970s–1990s and may have buried lids, undersized tanks, or aging concrete baffles that fail quietly until a backup occurs. Desert landscaping and drip irrigation can hide wet spots over a failing field, making periodic inspection worthwhile even when toilets still flush normally.',
  },
  sahuarita: {
    slug: 'sahuarita',
    name: 'Sahuarita',
    state: 'AZ',
    stateSlug: 'az',
    nearbySlugs: ['tucson', 'vail', 'marana'],
    zipExamples: ['85629', '85614'],
    localNotes:
      'Sahuarita and the Green Valley corridor south of Tucson have long been septic country, with many retirement and ranch-style homes on larger lots. High seasonal occupancy can push systems harder in winter months, increasing scum and solids accumulation between pumpings. Clay-rich soils in parts of the Santa Cruz Valley may drain more slowly than sandy desert washes, so drain-field stress shows up as persistent green patches or odors near lateral lines.',
  },
  vail: {
    slug: 'vail',
    name: 'Vail',
    state: 'AZ',
    stateSlug: 'az',
    nearbySlugs: ['tucson', 'sahuarita', 'marana'],
    zipExamples: ['85641', '85747'],
    localNotes:
      'Vail sits in the southeast Tucson basin where newer subdivisions and horse properties often depend on onsite wastewater systems. Shallow bedrock and caliche layers appear frequently during excavation, which influences trench depth for leach lines and can complicate replacements. Dust, heat, and low humidity do not eliminate septic maintenance needs—solids still accumulate, and pumps and alarms in lift stations fail from age and electrical issues like anywhere else.',
  },
  catalina: {
    slug: 'catalina',
    name: 'Catalina',
    state: 'AZ',
    stateSlug: 'az',
    nearbySlugs: ['oro-valley', 'tucson', 'marana'],
    zipExamples: ['85739', '85718'],
    localNotes:
      'The Catalina and Oracle Road corridor north of Tucson includes semi-rural parcels where septic systems were installed decades apart under changing Pima County requirements. Older steel or thin-walled tanks may corrode in salty, alkaline desert soils, while newer systems often include risers and effluent filters that still require routine service. Wildlife, mesquite roots, and seasonal washes can disturb shallow distribution lines if fields were placed without accounting for drainage paths.',
  },
};

export const LOCATION_OPTIONS = Object.values(LOCATIONS);
