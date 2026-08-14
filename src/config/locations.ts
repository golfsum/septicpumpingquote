export type Location = {
  slug: string;
  name: string;
  state: string;
  stateSlug: string;
  nearbySlugs: string[];
  nearbyNames: string[];
  zipExamples: string[];
  regionLabel: string;
  localNotes: string;
  climateNotes: string;
  soilNotes: string;
  accessNotes: string;
  pumpingNotes: string;
  published: boolean;
};

export const LOCATIONS: Record<string, Location> = {
  tucson: {
    slug: "tucson",
    name: "Tucson",
    state: "AZ",
    stateSlug: "az",
    nearbySlugs: ["marana", "oro-valley", "sahuarita", "vail", "catalina"],
    nearbyNames: ["Marana", "Oro Valley", "Sahuarita", "Vail", "Catalina", "Green Valley"],
    zipExamples: ["85701", "85704", "85710", "85712", "85719", "85730", "85745", "85749"],
    regionLabel: "Pima County",
    localNotes:
      "Much of metro Tucson relies on septic in outlying neighborhoods, foothill parcels, and older unincorporated pockets where municipal sewer never reached.",
    climateNotes:
      "Monsoon downpours can saturate absorption areas quickly, so homeowners often notice slow drains or surfacing effluent after heavy summer rains. Extreme heat stresses pumps and exposed controls.",
    soilNotes:
      "Caliche and compacted desert soils are common, which can limit drain-field sizing and make locating buried tanks harder without proper records.",
    accessNotes:
      "Hillside Catalina and Tanque Verde lots often need longer hose runs. Buried lids from older installs remain common outside newer subdivisions with risers.",
    pumpingNotes:
      "Three- to five-year intervals fit many Tucson households, but winter-visitor occupancy in Sahuarita and Green Valley corridors can shorten the cycle.",
    published: true,
  },
  marana: {
    slug: "marana",
    name: "Marana",
    state: "AZ",
    stateSlug: "az",
    nearbySlugs: ["tucson", "oro-valley", "catalina"],
    nearbyNames: ["Tucson", "Oro Valley", "Avra Valley", "Catalina"],
    zipExamples: ["85653", "85658", "85742", "85743"],
    regionLabel: "northwest Pima County",
    localNotes:
      "Marana mixes newer master-planned communities with rural acreage along the I-10 corridor and Avra Valley, where septic remains standard outside sewer districts.",
    climateNotes:
      "Hard water and summer heat do not replace pumping. Seasonal monsoon moisture can expose marginal fields that looked fine in dry months.",
    soilNotes:
      "Desert soils and caliche layers influence trench depth and drain-field performance on larger acreage lots.",
    accessNotes:
      "Ranch gates, longer private drives, and well/septic setbacks on the same parcel are common quoting factors.",
    pumpingNotes:
      "Well water and septic often share the same lot, so providers pay attention to access paths and disposal logistics when scheduling.",
    published: false,
  },
  "oro-valley": {
    slug: "oro-valley",
    name: "Oro Valley",
    state: "AZ",
    stateSlug: "az",
    nearbySlugs: ["tucson", "catalina", "marana"],
    nearbyNames: ["Tucson", "Catalina", "Marana"],
    zipExamples: ["85704", "85737", "85755"],
    regionLabel: "Catalina foothills",
    localNotes:
      "Oro Valley and the adjacent Catalina foothills include hillside homes where steep grades affect drain-field layout and access for pump trucks.",
    climateNotes:
      "Desert landscaping can hide wet spots over a failing field, making periodic inspection worthwhile even when toilets still flush normally.",
    soilNotes:
      "Sloped lots and shallow bedrock influence pressure-dosed systems and lateral placement.",
    accessNotes:
      "Steep driveways and limited truck staging raise hose-run and dig costs compared with flat basin lots.",
    pumpingNotes:
      "Many properties date to the 1970s–1990s and may have buried lids, undersized tanks, or aging concrete baffles.",
    published: false,
  },
  sahuarita: {
    slug: "sahuarita",
    name: "Sahuarita",
    state: "AZ",
    stateSlug: "az",
    nearbySlugs: ["tucson", "vail"],
    nearbyNames: ["Tucson", "Green Valley", "Vail"],
    zipExamples: ["85629", "85614"],
    regionLabel: "Santa Cruz Valley",
    localNotes:
      "Sahuarita and the Green Valley corridor south of Tucson have long been septic country, with many retirement and ranch-style homes on larger lots.",
    climateNotes:
      "High seasonal occupancy can push systems harder in winter months, increasing scum and solids accumulation between pumpings.",
    soilNotes:
      "Clay-rich soils in parts of the Santa Cruz Valley may drain more slowly than sandy desert washes.",
    accessNotes:
      "Larger lots and HOA communities each bring different staging and gate-access needs for vacuum trucks.",
    pumpingNotes:
      "Schedule around peak winter occupancy if the home sees long guest stays or snowbird use.",
    published: false,
  },
  vail: {
    slug: "vail",
    name: "Vail",
    state: "AZ",
    stateSlug: "az",
    nearbySlugs: ["tucson", "sahuarita"],
    nearbyNames: ["Tucson", "Sahuarita", "Corona de Tucson"],
    zipExamples: ["85641", "85747"],
    regionLabel: "southeast Tucson basin",
    localNotes:
      "Vail sits in the southeast Tucson basin where newer subdivisions and horse properties often depend on onsite wastewater systems.",
    climateNotes:
      "Dust, heat, and low humidity do not eliminate septic maintenance—solids still accumulate, and pumps and alarms fail from age and electrical issues.",
    soilNotes:
      "Shallow bedrock and caliche layers appear frequently during excavation, which influences trench depth for leach lines.",
    accessNotes:
      "Horse properties and cul-de-sac staging can complicate hose routing—mention access details when requesting quotes.",
    pumpingNotes:
      "First-time service on newer rural subdivisions often includes locating lids that were never brought to grade.",
    published: false,
  },
  catalina: {
    slug: "catalina",
    name: "Catalina",
    state: "AZ",
    stateSlug: "az",
    nearbySlugs: ["oro-valley", "tucson", "marana"],
    nearbyNames: ["Oro Valley", "Tucson", "Oracle"],
    zipExamples: ["85739", "85718"],
    regionLabel: "Oracle Road corridor",
    localNotes:
      "The Catalina and Oracle Road corridor north of Tucson includes semi-rural parcels where septic systems were installed decades apart under changing Pima County requirements.",
    climateNotes:
      "Seasonal washes can disturb shallow distribution lines if fields were placed without accounting for drainage paths.",
    soilNotes:
      "Older steel or thin-walled tanks may corrode in salty, alkaline desert soils.",
    accessNotes:
      "Semi-rural parcels and wildlife/mesquite root areas can slow lid location and line repairs.",
    pumpingNotes:
      "Newer systems often include risers and effluent filters that still require routine service even when access is easier.",
    published: false,
  },
  phoenix: {
    slug: "phoenix",
    name: "Phoenix",
    state: "AZ",
    stateSlug: "az",
    nearbySlugs: [],
    nearbyNames: ["Cave Creek", "Carefree", "New River", "Laveen", "Tonopah", "Buckeye outskirts", "Queen Creek rural"],
    zipExamples: ["85086", "85331", "85383", "85326", "85142"],
    regionLabel: "Maricopa County outskirts",
    localNotes:
      "Central Phoenix is largely sewered, but large septic pockets remain on desert acreage and older unincorporated parcels toward Cave Creek, New River, Tonopah, and the far West Valley.",
    climateNotes:
      "Summer heat and monsoon storms stress pumps and can saturate marginal fields overnight. Hard water is common and does not replace scheduled pumping.",
    soilNotes:
      "Caliche, sandy desert soils, and shallow rock in foothill communities complicate drain-field repairs and lid excavation.",
    accessNotes:
      "Acreage lots, wash crossings, and long private drives are typical outside the urban grid—travel time shows up in quotes.",
    pumpingNotes:
      "Many West Valley and foothills homes still run conventional tanks with buried lids from 1980s–2000s builds.",
    published: true,
  },
  albuquerque: {
    slug: "albuquerque",
    name: "Albuquerque",
    state: "NM",
    stateSlug: "nm",
    nearbySlugs: [],
    nearbyNames: ["Rio Rancho", "Corrales", "Los Lunas", "Bernalillo", "Edgewood", "Cedar Crest"],
    zipExamples: ["87114", "87120", "87124", "87048", "87031"],
    regionLabel: "Bernalillo and Sandoval Counties",
    localNotes:
      "The Albuquerque metro mixes city sewer with extensive septic use in the North Valley, East Mountains, South Valley outskirts, and Rio Rancho fringe areas.",
    climateNotes:
      "Freeze–thaw cycles and summer monsoon bursts both matter. Frozen lids and saturated fields after storms are common seasonal call drivers.",
    soilNotes:
      "Sandy valley soils drain differently than clay and rock in the East Mountains, where trench depth and slope change repair options.",
    accessNotes:
      "Acequia-adjacent lots and mountain driveways can limit truck staging. Confirm gate codes and winter road conditions when booking.",
    pumpingNotes:
      "Older adobe-era and mid-century rural homes often lack clear tank maps—first visits may include locate-and-riser work.",
    published: true,
  },
  austin: {
    slug: "austin",
    name: "Austin",
    state: "TX",
    stateSlug: "tx",
    nearbySlugs: [],
    nearbyNames: ["Dripping Springs", "Bee Cave", "Lakeway", "Manor", "Elgin", "Bastrop", "Cedar Park outskirts"],
    zipExamples: ["78620", "78734", "78669", "78602", "78621"],
    regionLabel: "Travis, Hays, and Bastrop Counties",
    localNotes:
      "Austin’s urban core is sewered, but Hill Country and eastern prairie growth still depends heavily on septic—especially outside city utility districts.",
    climateNotes:
      "Flash floods and prolonged drought both stress systems. Heavy rain can reveal failing fields that looked fine in dry summers.",
    soilNotes:
      "Limestone, shallow soils, and rocky Hill Country lots often need alternative or advanced treatment designs rather than simple trenches.",
    accessNotes:
      "Steep limestone driveways and gated Hill Country parcels affect vacuum-truck access and hose length.",
    pumpingNotes:
      "Rapid growth means many systems are less than 20 years old but still overdue for first or second pumping after builder turnover.",
    published: true,
  },
  "san-antonio": {
    slug: "san-antonio",
    name: "San Antonio",
    state: "TX",
    stateSlug: "tx",
    nearbySlugs: [],
    nearbyNames: ["Boerne", "Helotes", "Converse outskirts", "Elmendorf", "St. Hedwig", "Fair Oaks Ranch"],
    zipExamples: ["78006", "78023", "78112", "78152", "78015"],
    regionLabel: "Bexar County and Hill Country fringe",
    localNotes:
      "San Antonio’s outer rings and surrounding Hill Country communities rely on septic where SAWS and other utilities never extended lines.",
    climateNotes:
      "South Texas heat and occasional tropical moisture spikes load systems. Holiday and family gatherings can overload tanks that were due for pumping.",
    soilNotes:
      "Edwards Plateau rock and clay pockets influence field performance west and northwest of the city.",
    accessNotes:
      "Ranch-style acreage and limestone driveways are common quoting variables outside Loop 1604.",
    pumpingNotes:
      "Many homes combine well water and septic—providers familiar with rural Bexar and Kendall County routes are a better match than downtown-only crews.",
    published: true,
  },
  houston: {
    slug: "houston",
    name: "Houston",
    state: "TX",
    stateSlug: "tx",
    nearbySlugs: [],
    nearbyNames: ["Cypress", "Tomball", "Conroe", "Katy outskirts", "Alvin", "Huffman", "Crosby"],
    zipExamples: ["77429", "77375", "77301", "77511", "77532"],
    regionLabel: "Harris, Montgomery, and Fort Bend fringe",
    localNotes:
      "Houston’s core is sewered, but vast unincorporated areas north and east of the metro still run conventional and aerobic septic systems.",
    climateNotes:
      "Gulf humidity, hurricanes, and high water tables raise flood and field-saturation risk. Aerobic systems need ongoing maintenance contracts in many counties.",
    soilNotes:
      "Coastal prairie clays and high water tables often require aerobic or mound-style systems rather than simple gravity trenches.",
    accessNotes:
      "Floodplain lots, soft yards after storms, and long rural lanes affect truck access—reschedule if ground cannot support vacuum trucks safely.",
    pumpingNotes:
      "Aerobic tanks and trash tanks both need pumping on a schedule; skipping manufacturer service intervals is a common cause of alarms.",
    published: true,
  },
  "oklahoma-city": {
    slug: "oklahoma-city",
    name: "Oklahoma City",
    state: "OK",
    stateSlug: "ok",
    nearbySlugs: [],
    nearbyNames: ["Edmond rural", "Mustang outskirts", "Choctaw", "Harrah", "Yukon outskirts", "Norman fringe"],
    zipExamples: ["73034", "73064", "73020", "73045", "73099"],
    regionLabel: "Oklahoma and Canadian Counties",
    localNotes:
      "OKC metro growth pushed housing into former farmland where septic remains the default outside municipal sewer districts.",
    climateNotes:
      "Ice storms, freeze risk on shallow lids, and spring thunderstorms all affect access and field saturation.",
    soilNotes:
      "Red clay and expansive soils common in central Oklahoma influence trench performance and distribution-box settling.",
    accessNotes:
      "Acreage homes and new rural subdivisions often still have buried lids from builder installs.",
    pumpingNotes:
      "Many systems are first-generation installs on 1–5 acre lots—establish a pumping baseline before problems appear at resale.",
    published: true,
  },
  nashville: {
    slug: "nashville",
    name: "Nashville",
    state: "TN",
    stateSlug: "tn",
    nearbySlugs: [],
    nearbyNames: ["Franklin outskirts", "Spring Hill", "Lebanon", "Mount Juliet rural", "Ashland City", "Kingston Springs"],
    zipExamples: ["37064", "37174", "37087", "37122", "37015"],
    regionLabel: "Davidson and surrounding Middle Tennessee counties",
    localNotes:
      "Nashville’s boom built thousands of homes beyond sewer lines in surrounding counties, where conventional and alternative septic systems are routine.",
    climateNotes:
      "Humid summers and heavy winter rains saturate fields. Leaf litter and root growth from hardwoods are common maintenance factors.",
    soilNotes:
      "Limestone, karst features, and clay soils in Middle Tennessee can restrict conventional field options and require careful siting.",
    accessNotes:
      "Hilly lots and tree-lined drives outside Davidson County affect hose runs and dig access.",
    pumpingNotes:
      "Builder-era systems from the 2000s–2020s often lack owner records after rapid resale—first professional pumping documents tank size and lid locations.",
    published: true,
  },
  charlotte: {
    slug: "charlotte",
    name: "Charlotte",
    state: "NC",
    stateSlug: "nc",
    nearbySlugs: [],
    nearbyNames: ["Waxhaw", "Marvin", "Denver NC", "Mooresville rural", "Concord outskirts", "Gastonia fringe"],
    zipExamples: ["28173", "28104", "28037", "28115", "28027"],
    regionLabel: "Mecklenburg fringe and surrounding counties",
    localNotes:
      "Charlotte’s suburban expansion into Union, Cabarrus, Iredell, and Gaston Counties left many neighborhoods on septic even as the urban core stays on sewer.",
    climateNotes:
      "Humid subtropical weather, tropical remnants, and clay soils make wet-season field stress common.",
    soilNotes:
      "Piedmont red clay slows percolation and can shorten field life when systems are overloaded or poorly graded.",
    accessNotes:
      "Cul-de-sac subdivisions and wooded lots both appear—mention HOA rules and landscaping over lids when booking.",
    pumpingNotes:
      "Many HOA communities still require owners to maintain private septic; pumping receipts help at resale.",
    published: true,
  },
  raleigh: {
    slug: "raleigh",
    name: "Raleigh",
    state: "NC",
    stateSlug: "nc",
    nearbySlugs: [],
    nearbyNames: ["Wake Forest rural", "Fuquay-Varina outskirts", "Apex fringe", "Clayton", "Zebulon", "Rolesville"],
    zipExamples: ["27587", "27526", "27502", "27520", "27597"],
    regionLabel: "Wake and Johnston Counties",
    localNotes:
      "The Research Triangle’s growth pushed housing into Wake County outskirts and neighboring counties where septic is still widely permitted.",
    climateNotes:
      "Hurricane remnants and humid summers load drain fields. Keep roof drains and sump discharge away from absorption areas.",
    soilNotes:
      "Coastal plain sands east of Raleigh behave differently than Piedmont clays west and south of the city—local soil maps matter for repairs.",
    accessNotes:
      "Newer subdivisions may have risers; older rural parcels often need locate-and-dig service on the first visit.",
    pumpingNotes:
      "Homes with garbage disposals and large families should lean toward shorter pumping intervals than the national three-to-five-year average.",
    published: true,
  },
  atlanta: {
    slug: "atlanta",
    name: "Atlanta",
    state: "GA",
    stateSlug: "ga",
    nearbySlugs: [],
    nearbyNames: ["Cumming", "Dallas GA", "McDonough", "Newnan", "Canton", "Loganville"],
    zipExamples: ["30040", "30132", "30253", "30263", "30114"],
    regionLabel: "metro Atlanta outer counties",
    localNotes:
      "Inside the Perimeter is mostly sewered, but outer metro counties still have dense pockets of septic on wooded lots and older subdivisions.",
    climateNotes:
      "Heavy Piedmont rains and humid summers saturate clay fields. Root intrusion from mature trees is a frequent repair driver.",
    soilNotes:
      "Georgia red clay and steep lots complicate conventional fields; many repairs involve distribution issues before full replacement.",
    accessNotes:
      "Wooded lots, long gravel drives, and limited truck turnaround space are common outside I-285.",
    pumpingNotes:
      "Deferred maintenance on 1980s–1990s systems shows up at home sale inspections across Forsyth, Paulding, and Henry Counties.",
    published: true,
  },
  jacksonville: {
    slug: "jacksonville",
    name: "Jacksonville",
    state: "FL",
    stateSlug: "fl",
    nearbySlugs: [],
    nearbyNames: ["St. Johns outskirts", "Middleburg", "Green Cove Springs", "Callahan", "Yulee rural"],
    zipExamples: ["32068", "32043", "32011", "32097", "32234"],
    regionLabel: "Duval and surrounding Northeast Florida counties",
    localNotes:
      "Jacksonville’s huge geographic footprint includes many septic neighborhoods and rural parcels, especially west and south of the urban core.",
    climateNotes:
      "High water tables, tropical storms, and year-round humidity increase field saturation and tank corrosion risk.",
    soilNotes:
      "Sandy coastal plain soils drain quickly in places, while low-lying parcels flood—system type varies block by block.",
    accessNotes:
      "Flood-prone yards may be unreachable after storms; providers often prioritize indoor backups first.",
    pumpingNotes:
      "Florida counties often have specific pump-out and inspection rules—ask providers what documentation they provide for property transfers.",
    published: true,
  },
  tampa: {
    slug: "tampa",
    name: "Tampa",
    state: "FL",
    stateSlug: "fl",
    nearbySlugs: [],
    nearbyNames: ["Lutz", "Land O' Lakes", "Odessa", "Plant City rural", "Riverview outskirts", "Thonotosassa"],
    zipExamples: ["33558", "34638", "33556", "33567", "33592"],
    regionLabel: "Hillsborough and Pasco fringe",
    localNotes:
      "Tampa’s suburbs and agricultural fringe still include large septic inventories, even as some corridors connect to county sewer over time.",
    climateNotes:
      "Hurricane season, afternoon thunderstorms, and high water tables make wet-weather failures common on neglected fields.",
    soilNotes:
      "Sandy soils and high groundwater influence tank buoyancy and field design—risers and proper backfill matter after pumping.",
    accessNotes:
      "Cul-de-sac HOAs and rural acreage both appear in the same metro; describe your lot type when requesting quotes.",
    pumpingNotes:
      "Many Florida systems use effluent filters that should be cleaned during pumping visits.",
    published: true,
  },
  birmingham: {
    slug: "birmingham",
    name: "Birmingham",
    state: "AL",
    stateSlug: "al",
    nearbySlugs: [],
    nearbyNames: ["Hoover outskirts", "Trussville rural", "Springville", "McCalla", "Bessemer fringe", "Chelsea"],
    zipExamples: ["35173", "35146", "35111", "35022", "35043"],
    regionLabel: "Jefferson and surrounding counties",
    localNotes:
      "Birmingham’s hills and outer suburbs keep septic common outside municipal sewer districts, especially on wooded and older rural parcels.",
    climateNotes:
      "Humid summers, heavy rain, and occasional ice events affect lids, pumps, and field saturation.",
    soilNotes:
      "Red clay and rocky hillside soils influence trench layout and repair difficulty.",
    accessNotes:
      "Steep drives and tree cover can hide lids and limit truck staging—photos of the access path help estimators.",
    pumpingNotes:
      "Older steel tanks still appear on rural Jefferson County properties and should be checked for corrosion during pumping.",
    published: true,
  },
  denver: {
    slug: "denver",
    name: "Denver",
    state: "CO",
    stateSlug: "co",
    nearbySlugs: [],
    nearbyNames: ["Parker rural", "Castle Rock outskirts", "Evergreen", "Conifer", "Brighton fringe", "Erie rural"],
    zipExamples: ["80138", "80108", "80439", "80433", "80601"],
    regionLabel: "Front Range foothills and plains fringe",
    localNotes:
      "Denver proper is sewered, but foothills communities and plains acreage around the metro still rely on septic and vault systems.",
    climateNotes:
      "Freeze risk, heavy snow access limits, and intense summer storms all affect service windows and field performance.",
    soilNotes:
      "Rocky foothills soils and expansive clays on the plains require different field strategies than coastal systems.",
    accessNotes:
      "Mountain driveways may be impassable after storms—winter pumping appointments need flexible scheduling.",
    pumpingNotes:
      "Some foothills homes use holding tanks or advanced treatment; confirm system type before assuming a standard pump-out.",
    published: true,
  },
  boise: {
    slug: "boise",
    name: "Boise",
    state: "ID",
    stateSlug: "id",
    nearbySlugs: [],
    nearbyNames: ["Eagle rural", "Star", "Kuna", "Meridian fringe", "Emmett", "Middleton"],
    zipExamples: ["83616", "83669", "83634", "83646", "83617"],
    regionLabel: "Ada and Canyon Counties",
    localNotes:
      "Treasure Valley growth pushed subdivisions and acreage homes onto septic where city sewer has not caught up, especially west and south of Boise.",
    climateNotes:
      "Cold winters freeze shallow components; spring thaw and irrigation season can saturate fields.",
    soilNotes:
      "Sandy and rocky Treasure Valley soils vary by bench and bottomland—soil reports matter for replacements.",
    accessNotes:
      "New rural subdivisions and farm parcels both need clear lid maps after the first service visit.",
    pumpingNotes:
      "Many systems are relatively new but already due for first pumping after household occupancy exceeded builder assumptions.",
    published: true,
  },
  sacramento: {
    slug: "sacramento",
    name: "Sacramento",
    state: "CA",
    stateSlug: "ca",
    nearbySlugs: [],
    nearbyNames: ["Folsom rural", "Orangevale", "Wilton", "Sloughhouse", "Rio Linda", "Elk Grove fringe"],
    zipExamples: ["95630", "95662", "95693", "95683", "95673"],
    regionLabel: "Sacramento County fringe",
    localNotes:
      "Sacramento’s agricultural and foothill edges still include many septic properties even as the urban grid runs on sewer.",
    climateNotes:
      "Hot dry summers and wet winters create a feast-or-famine moisture pattern for drain fields.",
    soilNotes:
      "Valley soils and hardpans can limit percolation; repairs should respect county environmental health rules.",
    accessNotes:
      "Rural lanes, orchards, and ranchettes affect hose length and disposal travel time.",
    pumpingNotes:
      "California counties may require specific pumper registration and documentation—use licensed local haulers.",
    published: true,
  },
  "kansas-city": {
    slug: "kansas-city",
    name: "Kansas City",
    state: "MO",
    stateSlug: "mo",
    nearbySlugs: [],
    nearbyNames: ["Lee's Summit rural", "Liberty outskirts", "Smithville", "Belton fringe", "Basehor KS", "Lansing KS"],
    zipExamples: ["64086", "64068", "64089", "64012", "66007"],
    regionLabel: "Kansas City metro fringe (MO/KS)",
    localNotes:
      "The Kansas City metro’s suburban and exurban ring still has large septic inventories on both the Missouri and Kansas sides.",
    climateNotes:
      "Freeze–thaw, thunderstorms, and clay soils make spring the busiest season for slow-drain and surfacing calls.",
    soilNotes:
      "Midwest clay slows absorption and can tilt distribution boxes over time.",
    accessNotes:
      "Acreage properties and older farmsteads may have tanks far from the driveway—expect hose-run charges.",
    pumpingNotes:
      "Cross-state metro routing is normal; confirm the provider serves your county and disposal facility.",
    published: true,
  },
  indianapolis: {
    slug: "indianapolis",
    name: "Indianapolis",
    state: "IN",
    stateSlug: "in",
    nearbySlugs: [],
    nearbyNames: ["Fishers rural", "Zionsville outskirts", "Greenfield", "Brownsburg fringe", "Whiteland", "Pendleton"],
    zipExamples: ["46037", "46077", "46140", "46112", "46184"],
    regionLabel: "Marion County fringe and surrounding counties",
    localNotes:
      "Indianapolis sewer covers much of the core, but surrounding counties and older township pockets still depend on septic systems.",
    climateNotes:
      "Freeze risk, spring thaws, and humid summers affect lids, fields, and pumping seasonality.",
    soilNotes:
      "Midwest glacial soils and clay layers influence trench longevity and wet-weather performance.",
    accessNotes:
      "Township lots and former farmland conversions often have poorly marked tanks from decades-old installs.",
    pumpingNotes:
      "Home sale inspections frequently trigger first pumping in years—keep receipts for the next transfer.",
    published: true,
  },
  louisville: {
    slug: "louisville",
    name: "Louisville",
    state: "KY",
    stateSlug: "ky",
    nearbySlugs: [],
    nearbyNames: ["Mount Washington", "Shepherdsville", "Crestwood", "La Grange", "Floyds Knobs IN", "Georgetown IN"],
    zipExamples: ["40047", "40165", "40014", "40031", "47119"],
    regionLabel: "Jefferson County fringe and nearby KY/IN counties",
    localNotes:
      "Louisville’s outer suburbs and southern Indiana hill communities still use septic widely outside MSD and municipal sewer service.",
    climateNotes:
      "Ohio Valley humidity, freeze events, and heavy rains saturate clay fields and drive seasonal emergency calls.",
    soilNotes:
      "Clay and karst-influenced geology can limit conventional field options on hillside lots.",
    accessNotes:
      "Steep Indiana knobs and wooded Kentucky acreage both need clear access notes for pump trucks.",
    pumpingNotes:
      "Older rural tanks may be steel or undersized relative to modern water use—inspection during pumping is worthwhile.",
    published: true,
  },
  memphis: {
    slug: "memphis",
    name: "Memphis",
    state: "TN",
    stateSlug: "tn",
    nearbySlugs: [],
    nearbyNames: ["Collierville rural", "Eads", "Arlington", "Millington", "Olive Branch MS", "Southaven fringe"],
    zipExamples: ["38017", "38028", "38002", "38053", "38654"],
    regionLabel: "Shelby County fringe and DeSoto County MS",
    localNotes:
      "Memphis city sewer covers much of the urban area, but eastern and northern Shelby County plus nearby Mississippi suburbs still run many septic systems.",
    climateNotes:
      "Hot humid summers, heavy storms, and high clay moisture stress neglected fields.",
    soilNotes:
      "Delta and loess-influenced soils can drain poorly when compacted or overloaded.",
    accessNotes:
      "Larger lot subdivisions and rural lanes are the typical service profile outside the urban grid.",
    pumpingNotes:
      "Cross-border metro service into DeSoto County is common—confirm licensing and disposal for your address.",
    published: true,
  },
  "virginia-beach": {
    slug: "virginia-beach",
    name: "Virginia Beach",
    state: "VA",
    stateSlug: "va",
    nearbySlugs: [],
    nearbyNames: ["Chesapeake rural", "Pungo", "Blackwater", "Suffolk outskirts", "Knotts Island"],
    zipExamples: ["23457", "23456", "23322", "23437", "27950"],
    regionLabel: "Southside Hampton Roads",
    localNotes:
      "Virginia Beach and neighboring Chesapeake still have significant septic use in southern agricultural and low-density residential areas.",
    climateNotes:
      "Coastal storms, high water tables, and hurricane season increase saturation and access problems.",
    soilNotes:
      "Sandy coastal soils and poorly drained pockets both exist—system performance is highly site-specific.",
    accessNotes:
      "Farm roads and soft ground after nor’easters can delay trucks; indoor backups take priority.",
    pumpingNotes:
      "Some localities have pump-out ordinances or disclosure rules at sale—ask for documentation with service.",
    published: true,
  },
  columbus: {
    slug: "columbus",
    name: "Columbus",
    state: "OH",
    stateSlug: "oh",
    nearbySlugs: [],
    nearbyNames: ["Pickerington rural", "Canal Winchester", "Delaware outskirts", "Pataskala", "Grove City fringe"],
    zipExamples: ["43147", "43110", "43015", "43062", "43123"],
    regionLabel: "Franklin County fringe and surrounding counties",
    localNotes:
      "Columbus sewer serves the urban core, while surrounding townships and county growth areas still install and maintain large numbers of septic systems.",
    climateNotes:
      "Freeze–thaw cycles, lake-effect moisture patterns, and spring rains drive seasonal service demand.",
    soilNotes:
      "Midwest clay and glacial till slow percolation and can shift distribution components over time.",
    accessNotes:
      "Township acreage and newer rural subdivisions are the main quoting profiles outside city utilities.",
    pumpingNotes:
      "Ohio county health departments often have specific operation and pumping expectations—local providers know the paperwork.",
    published: true,
  },
  spokane: {
    slug: "spokane",
    name: "Spokane",
    state: "WA",
    stateSlug: "wa",
    nearbySlugs: [],
    nearbyNames: ["Spokane Valley rural", "Liberty Lake outskirts", "Mead", "Cheney fringe", "Airway Heights rural"],
    zipExamples: ["99005", "99016", "99021", "99004", "99001"],
    regionLabel: "Spokane County",
    localNotes:
      "Spokane’s valley and surrounding rural communities rely on septic where city and county sewer lines stop.",
    climateNotes:
      "Cold winters, snow access limits, and spring runoff affect lids, pumps, and field moisture.",
    soilNotes:
      "Sandy glacial soils in parts of the valley drain differently than denser hillside soils.",
    accessNotes:
      "Snow and ice can block lid access—clear a path when possible before the truck arrives.",
    pumpingNotes:
      "Many systems include effluent filters and risers; filter cleaning during pumping prevents early backups.",
    published: true,
  },
  tulsa: {
    slug: "tulsa",
    name: "Tulsa",
    state: "OK",
    stateSlug: "ok",
    nearbySlugs: [],
    nearbyNames: ["Broken Arrow rural", "Owasso outskirts", "Sand Springs", "Bixby fringe", "Claremore"],
    zipExamples: ["74012", "74055", "74063", "74008", "74017"],
    regionLabel: "Tulsa and surrounding counties",
    localNotes:
      "Tulsa’s suburban and lake-country growth still leaves many homes on septic outside municipal sewer districts.",
    climateNotes:
      "Severe storms, freeze events, and humid summers drive seasonal backups and field saturation.",
    soilNotes:
      "Eastern Oklahoma clay and rocky hillsides influence trench performance and repair options.",
    accessNotes:
      "Acreage and gated lake communities need clear access notes for vacuum trucks.",
    pumpingNotes:
      "Many systems on 1–5 acre lots are overdue for first documented pumping after ownership changes.",
    published: true,
  },
  "little-rock": {
    slug: "little-rock",
    name: "Little Rock",
    state: "AR",
    stateSlug: "ar",
    nearbySlugs: [],
    nearbyNames: ["Bryant", "Benton", "Maumelle outskirts", "Sherwood rural", "Conway fringe"],
    zipExamples: ["72022", "72015", "72113", "72120", "72034"],
    regionLabel: "central Arkansas metro fringe",
    localNotes:
      "Little Rock sewer covers the core, while surrounding communities and wooded lots still rely heavily on septic.",
    climateNotes:
      "Humid summers, heavy rain, and occasional ice storms affect lids, fields, and access.",
    soilNotes:
      "Clay and rocky foothill soils west of the metro commonly limit conventional field designs.",
    accessNotes:
      "Wooded parcels and long drives are typical outside city utilities.",
    pumpingNotes:
      "Home sales often trigger first pumping in years—keep receipts for the next transfer.",
    published: true,
  },
  knoxville: {
    slug: "knoxville",
    name: "Knoxville",
    state: "TN",
    stateSlug: "tn",
    nearbySlugs: [],
    nearbyNames: ["Farragut outskirts", "Maryville", "Lenoir City", "Powell", "Seymour"],
    zipExamples: ["37934", "37801", "37771", "37849", "37865"],
    regionLabel: "East Tennessee foothills",
    localNotes:
      "Knoxville’s ridges and surrounding counties keep septic common on hillside and rural parcels beyond city sewer.",
    climateNotes:
      "Appalachian rainfall and freeze–thaw cycles stress fields and shallow components.",
    soilNotes:
      "Rocky and sloping soils often require careful siting and sometimes alternative systems.",
    accessNotes:
      "Steep drives and tree cover complicate hose runs and lid location.",
    pumpingNotes:
      "Many mountain and lake homes see seasonal occupancy that shortens safe pumping intervals.",
    published: true,
  },
  greenville: {
    slug: "greenville",
    name: "Greenville",
    state: "SC",
    stateSlug: "sc",
    nearbySlugs: [],
    nearbyNames: ["Travelers Rest", "Simpsonville rural", "Greer outskirts", "Easley", "Fountain Inn"],
    zipExamples: ["29690", "29681", "29650", "29640", "29644"],
    regionLabel: "Upstate South Carolina",
    localNotes:
      "Upstate growth around Greenville pushed housing into foothills and former farmland where septic remains standard.",
    climateNotes:
      "Humid subtropical weather and heavy rain saturate clay fields; tropical remnants raise emergency call volume.",
    soilNotes:
      "Piedmont clay slows percolation and can shorten field life when systems are overloaded.",
    accessNotes:
      "New subdivisions and older rural lots both need clear lid maps after first service.",
    pumpingNotes:
      "Builder-era systems from rapid growth often lack owner records until the first professional visit.",
    published: true,
  },
  richmond: {
    slug: "richmond",
    name: "Richmond",
    state: "VA",
    stateSlug: "va",
    nearbySlugs: [],
    nearbyNames: ["Midlothian rural", "Chesterfield outskirts", "Mechanicsville", "Powhatan", "Goochland"],
    zipExamples: ["23112", "23832", "23111", "23139", "23063"],
    regionLabel: "central Virginia metro fringe",
    localNotes:
      "Richmond’s surrounding counties still have large septic inventories on wooded and agricultural parcels.",
    climateNotes:
      "Humid summers, nor’easter moisture, and freeze events affect fields and access.",
    soilNotes:
      "Coastal plain and Piedmont soils vary across the metro—design and repair must match the parcel.",
    accessNotes:
      "Long rural lanes and older farmsteads are common outside city utilities.",
    pumpingNotes:
      "Virginia localities may have pump-out or disclosure expectations at sale—ask for documentation with service.",
    published: true,
  },
  "colorado-springs": {
    slug: "colorado-springs",
    name: "Colorado Springs",
    state: "CO",
    stateSlug: "co",
    nearbySlugs: [],
    nearbyNames: ["Monument", "Black Forest", "Falcon", "Peyton", "Manitou outskirts"],
    zipExamples: ["80132", "80908", "80831", "80829", "80921"],
    regionLabel: "El Paso County",
    localNotes:
      "Colorado Springs city sewer stops short of Black Forest, Falcon, and other acreage communities that depend on septic.",
    climateNotes:
      "Freeze risk, snow access limits, and intense summer storms shape service windows.",
    soilNotes:
      "Rocky Front Range soils and expansive clays influence trench depth and system type.",
    accessNotes:
      "Mountain and forest drives may be impassable after storms—winter appointments need flexibility.",
    pumpingNotes:
      "Some properties use advanced treatment or holding components—confirm system type before quoting a standard pump-out.",
    published: true,
  },
  "fort-worth": {
    slug: "fort-worth",
    name: "Fort Worth",
    state: "TX",
    stateSlug: "tx",
    nearbySlugs: [],
    nearbyNames: ["Weatherford", "Azle", "Springtown", "Burleson rural", "Joshua"],
    zipExamples: ["76085", "76020", "76082", "76028", "76058"],
    regionLabel: "western Tarrant and Parker Counties",
    localNotes:
      "Fort Worth’s western and southern fringe still includes many septic homes on acreage outside city sewer extensions.",
    climateNotes:
      "North Texas heat, flash floods, and freeze snaps all stress systems and access.",
    soilNotes:
      "Clay and limestone-influenced soils affect field performance west of the metro.",
    accessNotes:
      "Ranch gates and long private drives are common quoting factors.",
    pumpingNotes:
      "Many acreage systems combine wells and septic—note both when requesting service.",
    published: true,
  },
  "des-moines": {
    slug: "des-moines",
    name: "Des Moines",
    state: "IA",
    stateSlug: "ia",
    nearbySlugs: [],
    nearbyNames: ["Ankeny rural", "Waukee outskirts", "Altoona fringe", "Norwalk", "Indianola"],
    zipExamples: ["50023", "50263", "50009", "50211", "50125"],
    regionLabel: "central Iowa metro fringe",
    localNotes:
      "Des Moines sewer serves the core, while surrounding towns and farmland conversions still install and maintain septic systems.",
    climateNotes:
      "Harsh winters, spring thaw, and summer storms drive seasonal service demand.",
    soilNotes:
      "Midwest glacial soils and clay layers slow percolation and can shift distribution boxes.",
    accessNotes:
      "Frozen lids and soft spring yards affect scheduling—clear snow when possible.",
    pumpingNotes:
      "County health rules often expect documented pumping—keep receipts with home records.",
    published: true,
  },
  omaha: {
    slug: "omaha",
    name: "Omaha",
    state: "NE",
    stateSlug: "ne",
    nearbySlugs: [],
    nearbyNames: ["Gretna", "Elkhorn outskirts", "Bennington", "Papillion rural", "Blair"],
    zipExamples: ["68028", "68022", "68007", "68046", "68008"],
    regionLabel: "Omaha metro fringe",
    localNotes:
      "Omaha’s growing edge and nearby towns still rely on septic where city and SID sewer has not extended.",
    climateNotes:
      "Freeze–thaw, blizzards, and severe thunderstorms affect access and field moisture.",
    soilNotes:
      "Midwest clay and loess soils influence trench longevity and wet-weather performance.",
    accessNotes:
      "Acreage subdivisions and older farmsteads need clear tank maps after first service.",
    pumpingNotes:
      "Establish a pumping baseline before resale inspections catch deferred maintenance.",
    published: true,
  },
  wichita: {
    slug: "wichita",
    name: "Wichita",
    state: "KS",
    stateSlug: "ks",
    nearbySlugs: [],
    nearbyNames: ["Andover rural", "Goddard", "Derby outskirts", "Valley Center", "Clearwater"],
    zipExamples: ["67002", "67052", "67037", "67147", "67026"],
    regionLabel: "south-central Kansas",
    localNotes:
      "Wichita’s surrounding communities and county parcels still use septic widely outside municipal sewer.",
    climateNotes:
      "Ice storms, tornado-season rain, and hot summers stress lids, fields, and pumps.",
    soilNotes:
      "Prairie clay soils slow absorption and can tilt distribution components over time.",
    accessNotes:
      "Rural lanes and new county subdivisions are the typical service profile.",
    pumpingNotes:
      "Many systems on former farmland are first-generation installs needing a documented maintenance start.",
    published: true,
  },
  chattanooga: {
    slug: "chattanooga",
    name: "Chattanooga",
    state: "TN",
    stateSlug: "tn",
    nearbySlugs: [],
    nearbyNames: ["Ooltewah", "Soddy-Daisy", "Signal Mountain", "Harrison", "Ringgold GA"],
    zipExamples: ["37363", "37379", "37377", "37341", "30736"],
    regionLabel: "Chattanooga metro and nearby GA/TN ridges",
    localNotes:
      "Chattanooga’s ridges, valleys, and cross-border suburbs keep septic common outside city sewer lines.",
    climateNotes:
      "Humid summers, heavy rain, and occasional ice affect hillside fields and access.",
    soilNotes:
      "Rocky and sloping Appalachian soils often require careful siting and engineered options.",
    accessNotes:
      "Steep mountain drives and narrow lanes complicate truck staging.",
    pumpingNotes:
      "Seasonal cabins and primary homes both appear—state occupancy patterns when booking.",
    published: true,
  },
  mobile: {
    slug: "mobile",
    name: "Mobile",
    state: "AL",
    stateSlug: "al",
    nearbySlugs: [],
    nearbyNames: ["Semmes", "Saraland outskirts", "Theodore", "Grand Bay", "Spanish Fort rural"],
    zipExamples: ["36575", "36571", "36582", "36541", "36527"],
    regionLabel: "Mobile County and coastal fringe",
    localNotes:
      "Mobile’s outlying communities and coastal plain parcels still include large septic inventories beyond city utilities.",
    climateNotes:
      "Gulf humidity, tropical storms, and high water tables raise flood and saturation risk.",
    soilNotes:
      "Sandy and poorly drained coastal soils often need specialized or elevated designs.",
    accessNotes:
      "Soft ground after storms can delay trucks—indoor backups take priority.",
    pumpingNotes:
      "Aerobic and conventional systems both appear—confirm type and any required maintenance contracts.",
    published: true,
  },
  asheville: {
    slug: "asheville",
    name: "Asheville",
    state: "NC",
    stateSlug: "nc",
    nearbySlugs: [],
    nearbyNames: ["Weaverville", "Fairview", "Leicester", "Candler", "Black Mountain"],
    zipExamples: ["28787", "28730", "28748", "28715", "28711"],
    regionLabel: "western North Carolina mountains",
    localNotes:
      "Asheville’s mountain communities rely heavily on septic where municipal sewer never reached steep parcels.",
    climateNotes:
      "Heavy mountain rain, freeze events, and landslide-prone slopes affect fields and access roads.",
    soilNotes:
      "Shallow, rocky mountain soils frequently require alternative or carefully engineered systems.",
    accessNotes:
      "Narrow mountain roads and steep drives limit truck size and hose staging.",
    pumpingNotes:
      "Many vacation and primary homes share routes—flexible scheduling helps after storms.",
    published: true,
  },
};

export const LOCATION_OPTIONS = Object.values(LOCATIONS);

export function getPublishedLocations(): Location[] {
  return LOCATION_OPTIONS.filter((loc) => loc.published);
}

export function getLocation(slug: string): Location | undefined {
  return LOCATIONS[slug];
}
