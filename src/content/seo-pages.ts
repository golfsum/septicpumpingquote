import { SERVICES } from '@/config/services';

export type SeoPageContent = {
  slug: string;
  pageType: 'service' | 'guide' | 'city' | 'city-service' | 'home';
  service?: string;
  city?: string;
  state?: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  sections: { id: string; heading: string; body: string }[];
  faqs: { question: string; answer: string }[];
  internalLinks: { href: string; label: string }[];
  indexStatus: 'draft' | 'noindex' | 'indexable';
  published: boolean;
};

type PageSection = { id: string; heading: string; body: string };
type PageFaq = { question: string; answer: string };

function servicePage(
  slug: string,
  opts: {
    primaryKeyword: string;
    secondaryKeywords: string[];
    title: string;
    metaDescription: string;
    h1: string;
    intro: string;
    sections: PageSection[];
    faqs: PageFaq[];
    internalLinks: { href: string; label: string }[];
    indexStatus?: SeoPageContent['indexStatus'];
    published?: boolean;
  },
): SeoPageContent {
  return {
    slug,
    pageType: 'service',
    service: slug,
    primaryKeyword: opts.primaryKeyword,
    secondaryKeywords: opts.secondaryKeywords,
    title: opts.title,
    metaDescription: opts.metaDescription,
    h1: opts.h1,
    intro: opts.intro,
    sections: opts.sections,
    faqs: opts.faqs,
    internalLinks: opts.internalLinks,
    indexStatus: opts.indexStatus ?? 'indexable',
    published: opts.published ?? true,
  };
}

function cityServicePage(
  serviceSlug: string,
  opts: {
    primaryKeyword: string;
    secondaryKeywords: string[];
    title: string;
    metaDescription: string;
    h1: string;
    intro: string;
    sections: PageSection[];
    faqs: PageFaq[];
    internalLinks: { href: string; label: string }[];
  },
): SeoPageContent {
  return {
    slug: `az/tucson/${serviceSlug}`,
    pageType: 'city-service',
    service: serviceSlug,
    city: 'tucson',
    state: 'az',
    primaryKeyword: opts.primaryKeyword,
    secondaryKeywords: opts.secondaryKeywords,
    title: opts.title,
    metaDescription: opts.metaDescription,
    h1: opts.h1,
    intro: opts.intro,
    sections: opts.sections,
    faqs: opts.faqs,
    internalLinks: opts.internalLinks,
    indexStatus: 'indexable',
    published: true,
  };
}

function draftServicePage(
  slug: string,
  title: string,
  metaDescription: string,
  h1: string,
  intro: string,
): SeoPageContent {
  const service = SERVICES[slug];
  return {
    slug,
    pageType: 'service',
    service: slug,
    primaryKeyword: service?.primaryKeyword ?? slug.replace(/-/g, ' '),
    secondaryKeywords: service?.relatedSlugs ?? [],
    title,
    metaDescription,
    h1,
    intro,
    sections: [
      {
        id: 'overview',
        heading: 'What this service covers',
        body: intro,
      },
    ],
    faqs: [
      {
        question: `How do I get a quote for ${service?.name ?? slug}?`,
        answer:
          'Use our short quote form to describe your property, tank size if known, and urgency. Local providers can follow up with availability and pricing based on access, distance, and job scope.',
      },
    ],
    internalLinks: [
      { href: '/septic-pumping', label: 'Septic pumping' },
      { href: '/az/tucson', label: 'Tucson septic services' },
    ],
    indexStatus: 'draft',
    published: true,
  };
}

const SEO_PAGES_DATA: SeoPageContent[] = [
  servicePage('septic-pumping', {
    primaryKeyword: 'septic tank pumping',
    secondaryKeywords: [
      'septic pumping service',
      'septic tank cleaning',
      'how often pump septic',
      'septic maintenance',
    ],
    title: 'Septic Tank Pumping Services | Get a Local Quote',
    metaDescription:
      'Compare septic tank pumping quotes from licensed local providers. Learn what pumping includes, recommended intervals, and signs your tank is due for service.',
    h1: 'Septic Tank Pumping Services',
    intro:
      'Regular septic tank pumping removes accumulated solids and scum so your system can continue separating wastewater safely. Most homes need pumping every three to five years, but heavy use, smaller tanks, or garbage disposals can shorten that interval. Pumping is preventive maintenance—not a repair—but skipping it is one of the most common causes of backups and premature drain-field failure.',
    sections: [
      {
        id: 'what-pumping-includes',
        heading: 'What septic tank pumping includes',
        body:
          'A standard pumping visit starts with locating and opening the tank access lid—often two lids on a two-compartment tank. The technician pumps out liquids, sludge, and floating scum using a vacuum truck, then inspects inlet and outlet baffles when visible. Many providers also check the tank liquid level, note corrosion or cracks, and look for signs of drain-field stress such as backflow into the tank. Pumping does not automatically fix a failed drain field, but it restores tank capacity and gives a clear picture of system health. If your lids are buried, riser installation can make future service faster and less disruptive.',
      },
      {
        id: 'how-often',
        heading: 'How often to pump your septic tank',
        body:
          'Household size, tank volume, and daily water use determine pumping frequency more than calendar time alone. A 1,000-gallon tank serving a family of four often needs service every three to five years, while a vacation home may go longer. Garbage disposals add organic load and can require annual or biennial pumping. If you do not know your tank size, a first visit with a provider can establish a baseline and recommend an interval. Keep a simple log of pump dates and any observations—slow drains, odors, or lush grass over the field—to adjust timing before problems escalate.',
      },
      {
        id: 'signs-you-need-pumping',
        heading: 'Signs your tank needs pumping soon',
        body:
          'Slow drains throughout the house, gurgling toilets, or sewage odor near the tank or drains often mean the tank is full or outlet flow is restricted. Wastewater backing up into tubs or floor drains is urgent—limit water use and schedule service immediately. Outside, unusually green or soggy areas over the drain field may indicate saturation, but a full tank can mimic field failure. Do not rely on additives to dissolve solids; they rarely eliminate pumping and some harm soil biology. When in doubt, a quick inspection plus pumping is cheaper than emergency cleanup after a backup.',
      },
      {
        id: 'cost-factors',
        heading: 'What affects septic pumping cost',
        body:
          'Pricing typically reflects tank size, how full the tank is, access difficulty, and travel distance. Buried lids that require excavation add labor; long hose runs from the truck to a remote tank can also increase cost. Additional services—filter cleaning, minor baffle repair, or riser installation—are quoted separately. Emptying a tank for real estate or permit work may cost more because of documentation or coordination requirements. Requesting quotes from more than one licensed provider helps you compare line items rather than a single lump sum with no detail.',
      },
      {
        id: 'prepare-for-visit',
        heading: 'How to prepare for a pumping appointment',
        body:
          'Clear vehicles and obstacles from the driveway or path the truck will use; vacuum hoses are heavy and need a straight route when possible. If you have a site plan or prior pumping receipt, have it ready—it helps locate lids faster. Tell the provider about any known issues: alarms, recent backups, or a history of drain-field repairs. Pets and children should stay clear of open tanks; lids must be secured when work is finished. After pumping, resume normal water use gradually and note the service date for your maintenance records.',
      },
    ],
    faqs: [
      {
        question: 'Is septic pumping the same as septic cleaning?',
        answer:
          'Pumping removes tank contents with a vacuum truck. Cleaning may refer to the same service colloquially, or to more intensive sludge removal and tank washing before inspection. Clarify with your provider whether scum and solids removal only is included or if additional cleaning is recommended.',
      },
      {
        question: 'Can I pump my septic tank myself?',
        answer:
          'DIY pumping is impractical and unsafe for most homeowners. It requires specialized vacuum equipment, proper disposal at an approved facility, and handling of hazardous waste. Most jurisdictions also require licensed haulers for septage disposal.',
      },
      {
        question: 'How long does septic pumping take?',
        answer:
          'Most residential pumpings take 30 to 60 minutes once the tank is located and opened. First-time visits or buried lids can take longer. The provider may spend extra time if inspection or filter service is included.',
      },
      {
        question: 'Should I pump before selling my home?',
        answer:
          'Many buyers and inspectors expect recent pumping or a documented service history, especially where septic is common. Pair pumping with an inspection if the system age or condition is unknown.',
      },
      {
        question: 'Will pumping fix a drain field problem?',
        answer:
          'No. Pumping empties the tank but does not restore a failed absorption field. If liquid levels in the tank remain high immediately after pumping or water returns quickly, the field or distribution system may need separate evaluation.',
      },
    ],
    internalLinks: [
      { href: '/septic-tank-pumping-cost', label: 'Septic pumping cost guide' },
      { href: '/signs-septic-tank-is-full', label: 'Signs your tank is full' },
      { href: '/septic-inspection', label: 'Septic inspection' },
      { href: '/emergency-septic-service', label: 'Emergency septic service' },
      { href: '/az/tucson/septic-pumping', label: 'Septic pumping in Tucson' },
    ],
  }),

  servicePage('septic-repair', {
    primaryKeyword: 'septic system repair',
    secondaryKeywords: [
      'septic tank repair',
      'septic pump repair',
      'septic alarm repair',
      'fix septic system',
    ],
    title: 'Septic System Repair | Diagnosis & Local Quotes',
    metaDescription:
      'Find licensed septic repair pros for pumps, alarms, baffles, lines, and distribution issues. Learn common failure points and when repair beats replacement.',
    h1: 'Septic System Repair',
    intro:
      'Septic systems fail in predictable places: tank components, conveyance lines, pumps and controls, and the drain field. Repair starts with accurate diagnosis—treating a full tank like a failed field wastes money. A qualified technician identifies whether the issue is mechanical, hydraulic, or soil-related, then scopes repairs to restore safe, code-compliant operation.',
    sections: [
      {
        id: 'common-repairs',
        heading: 'Common septic repairs homeowners need',
        body:
          'Outlet and inlet baffles deteriorate over time, allowing scum to clog pipes or solids to escape to the drain field. Float switches, effluent pumps, and control panels fail in systems with lift stations or mound setups. Sewer lines between the house and tank can root-block or collapse; distribution boxes crack or tilt, sending uneven flow to laterals. Risers and lids break or sink, making maintenance unsafe. Alarms may sound because of high water from a failing field—or simply a tripped breaker or stuck float. Each symptom maps to a different repair path, which is why inspection before parts replacement matters.',
      },
      {
        id: 'repair-vs-replace',
        heading: 'Repair vs. replacement: how to decide',
        body:
          'Localized problems—a bad pump, a single crushed line, a broken lid—usually justify repair. Widespread drain-field saturation, repeated backups after pumping, or structurally failed tanks often point to replacement or field redesign. Age alone is not the deciding factor; maintenance history and soil conditions matter. Get a written explanation tying symptoms to root cause, and compare repair estimates to partial replacement options. If a repair only buys short relief, investing in field rehabilitation or a new absorption area may cost less over five years than repeated emergency calls.',
      },
      {
        id: 'pump-and-alarm',
        heading: 'Pump, float, and alarm repairs',
        body:
          'Pressure-dosed and pump-to-field systems depend on reliable pumps and floats. Symptoms include silent alarms, continuous pump running, or no discharge to the field. Technicians test amperage draw, float sequencing, and check valves; clogged effluent filters often mimic pump failure. Control boxes exposed to weather may need corrosion repair or replacement. After any pump service, verify the alarm panel operates in test mode and that high-water conditions would trigger notification. Homeowners in areas with seasonal power outages should ask about surge damage and whether backup options are appropriate—not mandatory everywhere, but worth discussing for critical systems.',
      },
      {
        id: 'tank-and-line',
        heading: 'Tank, baffle, and line repairs',
        body:
          'Concrete tanks may develop cracks or corroded baffles; plastic tanks can shift with soil movement. Repairs range from baffle replacement and epoxy sealing to riser installs that bring access to grade. Lines between house and tank or tank and distribution box may need jet cleaning, root removal, or spot replacement. Camera inspection helps when blockages recur without obvious cause. Avoid driving heavy equipment over tank or field areas during repairs; compaction worsens drainage problems. Permits may apply for structural tank work or distribution changes—local providers familiar with county requirements can handle filing when needed.',
      },
      {
        id: 'after-repair',
        heading: 'After repair: protecting your investment',
        body:
          'Once repairs are complete, resume water use gradually and monitor drains, odors, and alarm status for several days. Update your maintenance log with parts replaced and recommended follow-up—filter cleaning intervals, pump checks, or next pumping date. Reduce load where possible: fix leaking fixtures, spread laundry loads, and keep grease and non-degradable items out of drains. If repairs addressed field issues, temporary water conservation helps stressed soil recover. Schedule a follow-up inspection if symptoms were ambiguous; confirming stable liquid levels in the tank prevents repeat callbacks.',
      },
    ],
    faqs: [
      {
        question: 'Why does my septic alarm keep going off?',
        answer:
          'Alarms signal high water in a pump chamber or tank. Causes include pump failure, stuck floats, clogged filters, or a saturated drain field backing up into the system. A technician can determine whether the issue is electrical, mechanical, or hydraulic.',
      },
      {
        question: 'Can a cracked septic tank be repaired?',
        answer:
          'Small cracks and damaged baffles are sometimes repairable; severe structural failure or collapsed baffles often require tank replacement. An inspection with the tank pumped down clarifies which approach is appropriate.',
      },
      {
        question: 'How quickly should I address septic repair issues?',
        answer:
          'Sewage backups, surfacing effluent, or alarm conditions should be treated as urgent. Minor lid or riser issues can wait days, but open or unsafe tanks pose fall and contamination hazards and should be secured promptly.',
      },
      {
        question: 'Do septic repairs require permits?',
        answer:
          'It depends on jurisdiction and scope. Tank replacement, drain-field alteration, and major distribution changes often require permits; minor pump swaps or riser installs may not. Providers experienced in your county typically know local rules.',
      },
      {
        question: 'Should I repair the drain field or the tank first?',
        answer:
          'Diagnosis determines sequence. A full tank can mimic field failure, so pumping and inspection often come first. If the tank and distribution are sound but soil is saturated, field-focused repair or replacement is the logical next step.',
      },
    ],
    internalLinks: [
      { href: '/drain-field-repair', label: 'Drain field repair' },
      { href: '/septic-inspection', label: 'Septic inspection' },
      { href: '/emergency-septic-service', label: 'Emergency septic service' },
      { href: '/septic-system-replacement', label: 'Septic system replacement' },
      { href: '/az/tucson/septic-repair', label: 'Septic repair in Tucson' },
    ],
  }),

  servicePage('emergency-septic-service', {
    primaryKeyword: 'emergency septic service',
    secondaryKeywords: [
      'emergency septic pumping',
      'septic backup emergency',
      '24 hour septic service',
      'urgent septic repair',
    ],
    title: 'Emergency Septic Service | Same-Day Local Response',
    metaDescription:
      'Need emergency septic help now? Compare urgent pumping and repair quotes for backups, overflows, and alarm failures. Steps to take before the truck arrives.',
    h1: 'Emergency Septic Service',
    intro:
      'Emergency septic situations include sewage backing up into the home, effluent pooling in the yard, overflowing tanks, and pump or alarm failures that risk contamination. The first priorities are stopping water use, protecting people and pets from contact with wastewater, and getting a licensed provider en route. Fast pumping may relieve immediate pressure, but underlying failures still need diagnosis once the urgent risk is controlled.',
    sections: [
      {
        id: 'what-counts-as-emergency',
        heading: 'What counts as a septic emergency',
        body:
          'Any condition where wastewater enters the home, surfaces above ground, or threatens wells and living areas is an emergency. Multiple fixtures backing up simultaneously, strong sewage odor indoors, or alarm panels showing continuous high water qualify. A single slow drain may not be emergent—it could be a localized clog—but if plunging worsens backup elsewhere, stop and call for service. Outdoor wet spots after irrigation differ from persistent blackwater pooling; the latter requires immediate response. When unsure, describe symptoms honestly to the dispatcher; they can triage pumping versus full repair calls.',
      },
      {
        id: 'immediate-steps',
        heading: 'Immediate steps before help arrives',
        body:
          'Stop using toilets, showers, dishwashers, and washing machines. Do not run water “to test” the system—it adds volume to an already failing path. If safe, turn off power to effluent pumps only if instructed by a professional or if pumps are clearly running dry or cycling rapidly; otherwise leave electrical work to technicians. Keep children and pets away from affected areas. Open windows for ventilation if odors are strong indoors, but avoid spreading contamination on shoes or tools. Place towels only as a temporary barrier at interior backups—you still need professional cleanup for health reasons if sewage entered living space.',
      },
      {
        id: 'what-emergency-service-includes',
        heading: 'What emergency service typically includes',
        body:
          'Emergency visits often start with pumping to reduce tank level and stop active backup, plus a visual check of alarms, pumps, and obvious line breaks. Providers may camera or jet lines if access and time allow on the first trip; complex field failures might require a return visit after stabilization. After-hours or holiday dispatch fees are common and should be disclosed when scheduling. Stabilization is not the same as permanent repair—you may need follow-up work on baffles, pumps, or the drain field once the system is safe and visible.',
      },
      {
        id: 'prevent-recurrence',
        heading: 'Preventing repeat emergencies',
        body:
          'After an emergency, ask what caused the event and what follow-up is recommended. If pumping was only a temporary fix and the field is failing, plan inspection or field evaluation before the next overload. Install risers if lids were buried and delayed access worsened the situation. Fix leaking fixtures and spread high-water-use activities across the week. Mark tank and field locations on a site sketch for future providers. Regular pumping on schedule remains the simplest way to reduce emergency risk for tanks that were simply overdue.',
      },
    ],
    faqs: [
      {
        question: 'Will emergency pumping fix my backup?',
        answer:
          'Pumping often stops an active backup if the tank was overfull, but backups caused by clogged lines, failed pumps, or saturated drain fields may return until those issues are repaired.',
      },
      {
        question: 'Is it safe to stay in the house during a septic backup?',
        answer:
          'Minimize exposure to sewage—a biohazard. Avoid affected rooms, do not track wastewater through the house, and consider temporary relocation if sewage is widespread until cleanup occurs.',
      },
      {
        question: 'How fast can emergency septic service arrive?',
        answer:
          'Response times vary by provider, route, and time of day. Many offer same-day or after-hours windows; describe urgency clearly when requesting a quote or dispatch.',
      },
      {
        question: 'Does homeowners insurance cover septic emergencies?',
        answer:
          'Policies differ. Sudden mechanical failures may be covered in some cases; gradual neglect or field failure often is not. Contact your insurer with documentation from the service visit.',
      },
      {
        question: 'Should I call a plumber or septic company?',
        answer:
          'If multiple drains and toilets are affected, or you know you are on septic, start with a septic provider. Plumbers help with isolated fixture clogs inside the house when the septic system is confirmed healthy.',
      },
    ],
    internalLinks: [
      { href: '/septic-pumping', label: 'Septic pumping' },
      { href: '/septic-repair', label: 'Septic repair' },
      { href: '/signs-septic-tank-is-full', label: 'Signs your tank is full' },
      { href: '/az/tucson/emergency-septic-service', label: 'Tucson emergency septic' },
    ],
  }),

  servicePage('septic-inspection', {
    primaryKeyword: 'septic system inspection',
    secondaryKeywords: [
      'septic tank inspection',
      'septic inspection cost',
      'home septic inspection',
      'septic evaluation',
    ],
    title: 'Septic System Inspection Services | Local Quotes',
    metaDescription:
      'Schedule a septic system inspection with licensed local providers. Learn what inspectors check, when you need one, and how inspection differs from pumping alone.',
    h1: 'Septic System Inspection',
    intro:
      'A septic inspection evaluates tank condition, distribution components, and drain-field performance—not just whether the tank needs pumping. Inspections are useful before buying a home, after major flooding, when alarms trigger repeatedly, or when you inherit a system with unknown history. Results should identify defects, maintenance needs, and whether further testing is warranted.',
    sections: [
      {
        id: 'inspection-scope',
        heading: 'What a septic inspection includes',
        body:
          'Inspectors locate tank access, verify lids are secure, and observe liquid levels relative to outlet and inlet. They assess baffles, cracks, corrosion, and evidence of backup or effluent filter clogging. Distribution boxes, pumps, floats, and alarms are tested on systems that use them. Above ground, they look for surfacing effluent, settlement, strong odors, or vegetation patterns suggesting uneven field loading. Inspection depth varies—some visits are visual-only; others include pumping, dye testing, or camera work as add-ons. Clarify scope before booking so you know whether the report satisfies a lender, county, or personal due diligence.',
      },
      {
        id: 'when-to-inspect',
        heading: 'When to schedule an inspection',
        body:
          'Real estate transfers are the most common trigger, especially where municipal sewer is unavailable. Inspections also make sense after prolonged vacancy, before major landscaping over known field lines, or when changing household size significantly. Recurring backups, slow drains throughout the house, or chronic alarm events warrant inspection even if pumping was recent. If your last service record is lost, a baseline inspection plus pumping establishes maintenance timing. Inspection without pumping can misread liquid levels if the tank is unusually full—coordinate both when status is unknown.',
      },
      {
        id: 'inspection-vs-pumping',
        heading: 'Inspection vs. pumping: different jobs',
        body:
          'Pumping removes solids and lowers liquid level; inspection interprets condition and function. You can pump without a formal report, and you can inspect visually with limited value if the tank is buried and never opened. Many providers bundle both for efficiency. A clean bill of health after pumping does not guarantee field longevity if soil is failing slowly. Conversely, a full tank can make a field appear failed until emptied. Ask for photos, liquid level notes, and written findings you can compare over time.',
      },
      {
        id: 'reading-results',
        heading: 'Understanding inspection findings',
        body:
          'Reports may flag minor maintenance—riser install, filter cleaning, overdue pumping—or major concerns like broken baffles, flooded fields, or unsafe tank structure. “Pass/fail” language varies; focus on described defects and recommended corrections. Dye tests show connectivity and obvious breakout but are not foolproof in all soils. Camera findings in lines help pinpoint blockages separate from field saturation. Use the report to prioritize repairs and to budget for replacement if multiple subsystems are end-of-life. Keep copies with home records for future owners.',
      },
    ],
    faqs: [
      {
        question: 'How long does a septic inspection take?',
        answer:
          'Basic inspections often take one to two hours. Added pumping, dye testing, or camera work extends the visit. Access difficulty and unknown lid locations add time on first visits.',
      },
      {
        question: 'Do I need to pump before an inspection?',
        answer:
          'Not always, but pumping before inspection can clarify baffle and structural issues and distinguish a full tank from field failure. Many real estate inspections include pumping as part of the scope.',
      },
      {
        question: 'Can I inspect my own septic system?',
        answer:
          'Homeowners can look for odors, wet spots, and slow drains, but opening tanks and interpreting field health involves safety risks and experience. Professional inspection is recommended for transactions and major decisions.',
      },
      {
        question: 'What fails a septic inspection most often?',
        answer:
          'Common issues include overdue pumping, damaged or missing baffles, high liquid levels indicating field problems, surfacing effluent, non-functional pumps or alarms, and tanks without proper access for maintenance.',
      },
      {
        question: 'Is inspection required when selling a home?',
        answer:
          'Requirements vary by county and buyer lender. Even when not mandatory, buyers often request inspection or proof of recent pumping in septic-dependent areas.',
      },
    ],
    internalLinks: [
      { href: '/real-estate-septic-inspection', label: 'Real estate septic inspection' },
      { href: '/septic-pumping', label: 'Septic pumping' },
      { href: '/septic-repair', label: 'Septic repair' },
      { href: '/az/tucson/septic-inspection', label: 'Tucson septic inspection' },
    ],
  }),

  servicePage('drain-field-repair', {
    primaryKeyword: 'drain field repair',
    secondaryKeywords: [
      'leach field repair',
      'septic field failure',
      'drainfield restoration',
      'fix drain field',
    ],
    title: 'Drain Field Repair | Restore Septic Absorption',
    metaDescription:
      'Compare drain field repair quotes for failing leach lines, distribution issues, and soil saturation. Learn symptoms, repair options, and when replacement is necessary.',
    h1: 'Drain Field Repair',
    intro:
      'The drain field—or soil absorption area—treats wastewater after the septic tank. When it fails, effluent surfaces, odors persist, or tanks stay chronically full despite pumping. Repair options depend on failure mode: compacted soil, broken laterals, uneven distribution, or simply age and overload. Accurate diagnosis avoids paying for tank work when the field is the real problem.',
    sections: [
      {
        id: 'failure-signs',
        heading: 'Signs of drain field failure',
        body:
          'Persistent wet areas above laterals, black sewage odor outdoors, lush grass stripes over lines in dry weather, and slow drains combined with a full tank suggest field trouble. Gurgling throughout the house after pumping may return quickly if effluent has nowhere to go. Alarms on pumped systems often reflect back-pressure from saturated soil. Seasonal wetness differs from year-round pooling—note whether problems worsen after heavy use or rain. Camera inspection of laterals and distribution boxes confirms broken pipes versus soil exhaustion.',
      },
      {
        id: 'repair-options',
        heading: 'Drain field repair options',
        body:
          'Localized fixes include replacing crushed laterals, leveling a tilted distribution box, or clearing roots from lines. Some providers offer restorative techniques where appropriate—narrow aeration or selective soil treatment—but not all soils or regulations allow them. Shallow repairs must avoid damaging remaining functional lines. When a portion of the field is failed, redesigning flow to unused reserve area may work if the system was built with expansion space. Partial repairs fail quickly if the whole field is end-of-life or undersized for current household load.',
      },
      {
        id: 'overload-vs-failure',
        heading: 'Overload vs. permanent failure',
        body:
          'Temporary saturation can follow heavy rain or plumbing leaks sending excess water to the field. Fixing leaks and reducing use for several days sometimes restores function if soil was not permanently damaged. Chronic overload from overdue pumping, harsh chemicals, or constant high volume kills beneficial soil biology and compacts trenches. Distinguishing temporary from permanent failure saves money: pumping plus conservation helps the first; the second needs field repair or replacement. Track whether problems recur at the same time each year or continuously.',
      },
      {
        id: 'replacement-planning',
        heading: 'When repair becomes replacement',
        body:
          'Widespread breakout, sewage surfacing multiple areas, or repeated failed repairs indicate replacement or new field location is more sensible. Permits typically govern new field areas, setbacks from wells and structures, and soil testing. Replacement costs exceed spot repairs but stop the cycle of emergency pumping. If lot size limits new fields, advanced treatment or engineered options may be required—providers familiar with local health department rules can outline paths. Plan landscaping and access before installation to avoid driving over the new field later.',
      },
    ],
    faqs: [
      {
        question: 'Can you repair a drain field without replacing it?',
        answer:
          'Sometimes, if damage is limited to a section of pipe or distribution hardware. Widespread soil failure usually requires new absorption area or full replacement rather than surface-level fixes.',
      },
      {
        question: 'How long does a drain field last?',
        answer:
          'Many fields last 20 to 30 years with proper maintenance, but heavy use, poor soil, and neglected pumping shorten lifespan. Soil type and installation quality matter as much as age.',
      },
      {
        question: 'Will pumping fix a drain field?',
        answer:
          'Pumping relieves tank backup temporarily but does not restore failed soil. If the field is saturated, liquid returns quickly to the tank after pumping.',
      },
      {
        question: 'Can I plant trees near the drain field?',
        answer:
          'Deep-rooted trees and shrubs risk root intrusion into laterals. Grass cover is typical; aggressive landscaping over lines can cause damage. Follow setback guidance when replanting after repair.',
      },
      {
        question: 'Is it safe to use the home while the drain field is failing?',
        answer:
          'Minimize water use and avoid contact with surfacing effluent, which carries pathogens. Significant surfacing near wells or play areas is a health concern—schedule professional evaluation promptly.',
      },
    ],
    internalLinks: [
      { href: '/leach-field-repair', label: 'Leach field repair' },
      { href: '/septic-repair', label: 'Septic repair' },
      { href: '/septic-system-replacement', label: 'Septic system replacement' },
      { href: '/az/tucson/drain-field-repair', label: 'Tucson drain field repair' },
    ],
  }),

  {
    slug: 'septic-tank-pumping-cost',
    pageType: 'guide',
    primaryKeyword: 'septic tank pumping cost',
    secondaryKeywords: [
      'septic pumping prices',
      'cost to pump septic tank',
      'septic service cost',
      'septic pumping quote',
    ],
    title: 'Septic Tank Pumping Cost Guide | What Affects Your Quote',
    metaDescription:
      'Understand what drives septic tank pumping cost—tank size, access, location, and add-ons. Compare quotes without relying on vague national averages.',
    h1: 'Septic Tank Pumping Cost: What to Expect',
    intro:
      'Pumping cost depends on measurable factors more than a single flat rate. Tank size, how full it is, lid accessibility, hose distance, and optional services all appear on a well-written quote. Comparing two or three local estimates helps you spot outliers and avoid paying for vague “trip charges” without a clear scope of work.',
    sections: [
      {
        id: 'cost-drivers',
        heading: 'Main factors that affect pumping price',
        body:
          'Volume matters: larger tanks hold more septage and take longer to empty. Buried lids without risers require digging—often billed hourly or as a flat locate-and-dig fee. Remote tanks far from driveway access need longer vacuum hose runs and more setup time. Heavy sludge layers can slow pumping and disposal. Add-ons such as filter cleaning, baffle inspection with photos, or emergency after-hours dispatch are usually line items. Disposal fees are typically built into residential quotes but may vary by haul distance to treatment facilities.',
      },
      {
        id: 'quote-line-items',
        heading: 'Reading a pumping quote line by line',
        body:
          'A useful quote names tank size if known, states whether one or two compartments are included, and lists dig fees if lids are not at grade. Ask whether the price includes visual baffle check and effluent filter service if your system has one. Travel minimums are normal in rural areas but should be stated upfront. Be wary of extremely low quotes that omit dig or disposal—final invoices may differ. Written quotes tied to described access conditions reduce surprises on arrival.',
      },
      {
        id: 'related-services',
        heading: 'When pumping leads to other costs',
        body:
          'Pumping may reveal broken baffles, cracked lids, or high return flow indicating drain-field issues—repairs quoted separately. Real estate transactions sometimes require inspection reports or dye tests in addition to emptying. Installing risers after a dig saves money on future visits compared to paying dig fees every three years. If the truck cannot reach the tank, portable transfer or smaller equipment may cost more. Treat pumping as maintenance with optional discovery, not a guarantee that no other work is needed.',
      },
      {
        id: 'saving-without-skipping',
        heading: 'Saving money without skipping maintenance',
        body:
          'Install risers and keep a site sketch so providers spend less time locating access. Fix water leaks and spread laundry to reduce unnecessary pump frequency—not by extending intervals beyond safe limits. Bundle pumping with inspection when buying a home rather than paying for duplicate visits. Schedule non-emergency work on weekdays when after-hours fees do not apply. The most expensive pumping is the one never done until sewage backs up and cleanup costs follow.',
      },
    ],
    faqs: [
      {
        question: 'Is there a standard price to pump a septic tank?',
        answer:
          'No single national price applies. Local disposal costs, labor markets, and access conditions vary. Request quotes that specify tank size, access assumptions, and included services.',
      },
      {
        question: 'Do companies charge extra for digging up lids?',
        answer:
          'Often yes, when lids are buried and no risers exist. Riser installation is a one-time cost that typically lowers future service charges.',
      },
      {
        question: 'Why did my neighbor pay a different amount?',
        answer:
          'Different tank sizes, access, sludge levels, optional filter service, travel distance, and emergency timing all change the total. Compare scopes, not just bottom-line numbers.',
      },
      {
        question: 'Should I choose the cheapest quote?',
        answer:
          'Choose a licensed provider with a clear written scope. Extremely low quotes may exclude dig fees, disposal, or proper tank emptying of all compartments.',
      },
      {
        question: 'Does tank size affect how often I pump?',
        answer:
          'Yes. Smaller tanks fill faster with the same household use, which can increase both frequency and annual cost even if per-visit price is lower.',
      },
    ],
    internalLinks: [
      { href: '/septic-pumping', label: 'Septic pumping services' },
      { href: '/signs-septic-tank-is-full', label: 'Signs your tank is full' },
      { href: '/az/tucson/septic-pumping', label: 'Tucson septic pumping' },
    ],
    indexStatus: 'indexable',
    published: true,
  },

  {
    slug: 'signs-septic-tank-is-full',
    pageType: 'guide',
    primaryKeyword: 'signs septic tank is full',
    secondaryKeywords: [
      'full septic tank symptoms',
      'septic backup signs',
      'when to pump septic',
      'septic tank warning signs',
    ],
    title: 'Signs Your Septic Tank Is Full | When to Schedule Pumping',
    metaDescription:
      'Learn the indoor and outdoor signs of a full septic tank, how they differ from drain field failure, and what to do before sewage backs up into your home.',
    h1: 'Signs Your Septic Tank Is Full',
    intro:
      'A full septic tank loses the storage space needed to separate solids from effluent. Symptoms often appear gradually—slow drains, gurgling, odors—then suddenly worsen when wastewater has nowhere to go. Recognizing early signs lets you schedule pumping before backups damage floors, furnishings, or drain fields.',
    sections: [
      {
        id: 'indoor-signs',
        heading: 'Indoor warning signs',
        body:
          'Multiple slow drains at once—sinks, tubs, and toilets—suggest a system-wide issue rather than a single clogged P-trap. Toilets may gurgle when the washer drains, indicating air displacement in a nearly full tank. Sewage odor in bathrooms can mean poor venting or backup pressure. The most urgent sign is wastewater entering tubs or floor drains on lower levels; stop water use immediately. Occasional clogs cleared by a plunger differ from whole-house patterns that return within days.',
      },
      {
        id: 'outdoor-signs',
        heading: 'Outdoor and yard signs',
        body:
          'Pooling water or black soil staining above the tank or drain field after dry weather points to overflow or field saturation. Extremely lush grass over the tank or laterals can mean nutrient-rich leakage—not just healthy lawn. Odors near the tank after windy days may precede visible surfacing. In desert climates, ignore brief damp spots right after monsoon bursts unless they persist days later. Compare conditions before and after heavy household water use—family visits and laundry marathons stress a nearly full tank quickly.',
      },
      {
        id: 'full-vs-field',
        heading: 'Full tank vs. failed drain field',
        body:
          'Both cause slow drains and high tank liquid levels, but timing after pumping helps tell them apart. A full tank behaves normally for weeks or months after pumping; a failing field may refill the tank within days. Surfacing effluent over field lines with recent pumping history suggests soil failure, not just overdue maintenance. Providers compare inlet and outlet conditions, distribution box flow, and return rate after emptying. Do not assume one pumping fixes recurring symptoms without inspection notes.',
      },
      {
        id: 'what-to-do',
        heading: 'What to do when you notice these signs',
        body:
          'Reduce water use: shorter showers, delay laundry and dishwasher runs, and fix running toilets. Schedule pumping and mention all symptoms to the provider. If backup is active, treat as an emergency and avoid using fixtures until serviced. Keep a record of last pump date and household changes since then. After service, ask about recommended next interval and whether risers or filter cleaning would help future maintenance. Persistent signs after pumping mean follow-up repair or field evaluation is needed.',
      },
    ],
    faqs: [
      {
        question: 'Can a full septic tank cause gurgling toilets?',
        answer:
          'Yes. When the tank has little free space, displaced air can bubble back through toilets and drains, especially when large appliances discharge water.',
      },
      {
        question: 'How full is too full?',
        answer:
          'Tanks should be pumped before solids reach outlet levels that allow sludge into the field. If drains slow house-wide or liquid is near lid openings during inspection, pumping is overdue.',
      },
      {
        question: 'Do septic additives prevent a full tank?',
        answer:
          'Additives do not remove the need for pumping. Solids still accumulate; regular pumping remains the reliable maintenance step.',
      },
      {
        question: 'Is one slow drain a sign the tank is full?',
        answer:
          'Usually not—single-fixture clogs are often local. Widespread slow drainage across the home is more consistent with tank or field issues.',
      },
      {
        question: 'How soon should I pump after noticing signs?',
        answer:
          'Schedule as soon as possible for slow drains and odors. Active backup requires emergency service the same day if possible.',
      },
    ],
    internalLinks: [
      { href: '/septic-pumping', label: 'Schedule septic pumping' },
      { href: '/emergency-septic-service', label: 'Emergency septic service' },
      { href: '/septic-tank-pumping-cost', label: 'Pumping cost guide' },
      { href: '/septic-inspection', label: 'Septic inspection' },
    ],
    indexStatus: 'indexable',
    published: true,
  },

  {
    slug: 'az/tucson',
    pageType: 'city',
    city: 'tucson',
    state: 'az',
    primaryKeyword: 'septic services Tucson AZ',
    secondaryKeywords: [
      'Tucson septic pumping',
      'Pima County septic',
      'septic companies Tucson',
      'on-site wastewater Tucson',
    ],
    title: 'Septic Services in Tucson, AZ | Local Quotes by Service',
    metaDescription:
      'Compare septic pumping, repair, inspection, and emergency quotes in Tucson and nearby Pima County communities. Desert soil, monsoon season, and local system considerations.',
    h1: 'Septic Services in Tucson, Arizona',
    intro:
      'Tucson and surrounding unincorporated areas still depend on onsite septic for many homes—especially in foothills parcels, older neighborhoods without sewer extension, and rural-suburban pockets toward Marana, Vail, and Sahuarita. Desert heat, caliche layers, and monsoon downpours shape how systems fail and how maintenance should be timed. Use the links below to compare quotes by service or request a local estimate for your address.',
    sections: [
      {
        id: 'tucson-septic-landscape',
        heading: 'Septic in the Tucson metro area',
        body:
          'Pima County regulates onsite wastewater through permitting, inspection, and repair requirements that vary by parcel age and location. Older systems may have buried concrete lids, steel tanks prone to corrosion, or fields sized under outdated assumptions about household water use. Newer installs often include effluent filters, risers, and pressure-dosed fields better suited to tight or sloped lots in Oro Valley and Catalina foothills. Whether you are in central Tucson zip codes or outer areas like 85749 and 85747, matching service scope to access and soil conditions matters more than generic national advice.',
      },
      {
        id: 'desert-climate-effects',
        heading: 'How desert climate affects septic systems',
        body:
          'Low humidity does not stop solids accumulation—pumping intervals still apply. Extreme heat can stress pump components and electrical controls in exposed chambers. Monsoon rains can temporarily saturate drain fields, revealing marginal systems that seemed fine in dry months. Hard water common in the region contributes to mineral buildup in fixtures but does not replace the need to pump solids from the tank. Landscaping with native plants still requires keeping heavy irrigation away from absorption trenches to avoid hydraulic overload.',
      },
      {
        id: 'nearby-communities',
        heading: 'Serving Tucson and nearby communities',
        body:
          'Providers routinely serve Marana, Oro Valley, Sahuarita, Vail, Catalina, and Green Valley corridors from Tucson-based routes. Travel and access time factor into quotes on larger-acre parcels and hillside driveways where vacuum trucks need room to stage hoses. If your property spans county records with an older permit file, having that paperwork speeds inspections and replacement planning. Cross-community service is normal—choose quotes that state response time and dig assumptions for your specific lot.',
      },
      {
        id: 'services-by-need',
        heading: 'Choose a service by what you need',
        body:
          'Routine maintenance starts with pumping and visual checks. Buying or selling property usually triggers inspection and possibly real estate-specific reporting. Backups, alarms, and surfacing effluent route to emergency and repair paths—often after a quick pump to stabilize. Slow drains lasting weeks may need inspection to separate tank fullness from drain-field failure common in clay and caliche-influenced soils. Select a service page below to read Tucson-focused guidance and request matched quotes.',
      },
    ],
    faqs: [
      {
        question: 'Is septic common in Tucson city limits?',
        answer:
          'Sewer serves much of urban Tucson, but septic remains common in outlying and unincorporated areas, foothills properties, and older pockets without municipal connections. Verify your connection type before scheduling the wrong type of service.',
      },
      {
        question: 'Does Pima County require inspections when selling?',
        answer:
          'Requirements depend on location, system type, and transaction details. Buyers often request septic inspection and pumping even when not strictly mandated—confirm with your agent and local environmental health guidance.',
      },
      {
        question: 'Do monsoon rains ruin septic drain fields?',
        answer:
          'Healthy fields handle seasonal rain. Persistent surfacing after storms suggests existing saturation, poor grading, or irrigation overload rather than rain alone.',
      },
      {
        question: 'What tank sizes are typical around Tucson?',
        answer:
          'Residential tanks are often 1,000 to 1,500 gallons, but older or larger homes may differ. Unknown size is common—providers can estimate from records or onsite measurement during pumping.',
      },
      {
        question: 'Can I get same-day septic service in Tucson?',
        answer:
          'Many providers offer urgent and emergency windows, especially for backups. Availability varies by season and route—describe symptoms clearly when requesting a quote.',
      },
    ],
    internalLinks: [
      { href: '/az/tucson/septic-pumping', label: 'Tucson septic pumping' },
      { href: '/az/tucson/septic-repair', label: 'Tucson septic repair' },
      { href: '/az/tucson/emergency-septic-service', label: 'Tucson emergency septic' },
      { href: '/az/tucson/septic-inspection', label: 'Tucson septic inspection' },
      { href: '/az/tucson/drain-field-repair', label: 'Tucson drain field repair' },
    ],
    indexStatus: 'indexable',
    published: true,
  },

  cityServicePage('septic-pumping', {
    primaryKeyword: 'septic pumping Tucson AZ',
    secondaryKeywords: [
      'Tucson septic tank pumping',
      'Pima County septic pumping',
      'pump septic Tucson',
    ],
    title: 'Septic Tank Pumping in Tucson, AZ | Local Quotes',
    metaDescription:
      'Get septic tank pumping quotes in Tucson, Marana, Oro Valley, and Sahuarita. Caliche soils, buried lids, and monsoon-season timing explained for local homeowners.',
    h1: 'Septic Tank Pumping in Tucson, AZ',
    intro:
      'Tucson-area pumping jobs often involve buried lids in older foothills and desert-lot homes, long hose runs on acreage toward Vail and Catalina, and tanks stressed by seasonal guests or winter visitors in Sahuarita and Green Valley corridors. Local providers account for Pima County disposal routes, caliche near excavation depth, and the post-monsoon spike in slow-drain calls when marginal fields reach capacity.',
    sections: [
      {
        id: 'local-access',
        heading: 'Access and lid location in Pima County',
        body:
          'Many Tucson systems installed before riser requirements have lids a foot or more below grade—dig fees apply unless you add risers during the visit. Site plans from county files help, but landmarks on aging properties may be wrong after landscaping changes. Vacuum trucks need stable staging on driveways or packed pads; steep Catalina foothill lots may require longer hose runs billed accordingly. Marking tank location after service saves cost on the next cycle—GPS pins and sketched maps help future owners too.',
      },
      {
        id: 'pumping-intervals-tucson',
        heading: 'Recommended pumping intervals locally',
        body:
          'Three- to five-year intervals fit many Tucson households with 1,000-gallon tanks and moderate use, but desert retirement communities with extended winter occupancy may need shorter cycles. Garbage disposals, home offices with extra bathroom use, and rental ADUs increase solids loading. Hard water does not replace pumping—it affects fixtures more than tank biology. After monsoon season, schedule if you noticed slow drains during heavy rains; saturated fields and full tanks overlap in symptoms.',
      },
      {
        id: 'cost-factors-tucson',
        heading: 'What affects pumping cost in the Tucson area',
        body:
          'Distance from disposal facilities, dig time for buried lids, and same-day emergency dispatch influence quotes more than a generic per-gallon rate. Outer Marana and Vail parcels may include travel minimums. Filter cleaning and baffle photos are worth discussing on older concrete tanks common in 1980s subdivisions. Compare written scopes from licensed haulers registered for septage disposal—price alone should not override proper emptying of all compartments.',
      },
      {
        id: 'nearby-coverage',
        heading: 'Tucson hub serving nearby areas',
        body:
          'Central Tucson routes often same-day serve Oro Valley, Marana, Sahuarita, and Vail when truck schedules allow. Mention gate codes, HOA access rules, and ranch gates when requesting quotes to avoid delays. If you are between communities—Oracle Road corridor or Twin Peaks areas—state your zip and cross streets for accurate routing. Providers may bundle neighborhood stops; flexible timing can sometimes reduce travel surcharges.',
      },
    ],
    faqs: [
      {
        question: 'How do I find my septic tank in Tucson?',
        answer:
          'Check county permit records, prior pumping receipts, or look for lid outlines near a straight line from the home cleanout. Providers locate tanks daily and can install risers after digging.',
      },
      {
        question: 'Is pumping more expensive in foothills areas?',
        answer:
          'Steep access, longer hoses, and extra dig time can increase cost compared to flat urban lots with surface risers. Written quotes should state access assumptions.',
      },
      {
        question: 'Should I pump before Tucson monsoon season?',
        answer:
          'Pumping on schedule reduces risk before heavy use and rains stress marginal systems. It is not a substitute for fixing failing fields but prevents avoidable backups from overdue solids.',
      },
      {
        question: 'Do Tucson providers pump commercial septic systems?',
        answer:
          'Many residential pumpers also handle small commercial tanks with appropriate disposal paperwork. Describe tank size and business type when requesting a quote.',
      },
    ],
    internalLinks: [
      { href: '/septic-pumping', label: 'Septic pumping overview' },
      { href: '/az/tucson', label: 'All Tucson septic services' },
      { href: '/septic-tank-pumping-cost', label: 'Pumping cost guide' },
      { href: '/az/tucson/septic-inspection', label: 'Tucson septic inspection' },
    ],
  }),

  cityServicePage('septic-repair', {
    primaryKeyword: 'septic repair Tucson AZ',
    secondaryKeywords: [
      'Tucson septic system repair',
      'fix septic Tucson',
      'septic pump repair Tucson',
    ],
    title: 'Septic System Repair in Tucson, AZ | Local Quotes',
    metaDescription:
      'Septic repair quotes in Tucson for pumps, alarms, baffles, and distribution issues. Local notes on caliche, aging tanks, and monsoon-related failures.',
    h1: 'Septic System Repair in Tucson, AZ',
    intro:
      'Repair calls in the Tucson basin often trace to aging concrete baffles, corroded steel tanks in older desert installs, effluent pump failures on hillside pressure systems, and distribution boxes shifted by soil movement after wet winters or irrigation leaks. Caliche can complicate line repairs by limiting trench options. Accurate diagnosis separates a pump-out from a true field failure common after years of deferred maintenance.',
    sections: [
      {
        id: 'common-tucson-repairs',
        heading: 'Common repairs in the Tucson area',
        body:
          'Outlet baffle deterioration lets scum enter laterals—especially in tanks never pumped on schedule. Lift station floats and pumps fail from heat exposure and electrical surges during summer storms. Distribution boxes in clay-influenced Sahuarita soils tilt, sending uneven flow that kills one section of the field first. Roots from mesquite and desert shrubs intrude shallow lines on older ranch properties toward Vail. Risers and lids broken by mowers or UV exposure create safety issues and slow emergency response.',
      },
      {
        id: 'caliche-and-excavation',
        heading: 'Caliche and excavation challenges',
        body:
          'Caliche layers near Tucson can stop trench progress during line or box repairs, requiring equipment changes or reroutes. Shallow bedrock in foothills limits replacement depth—engineered alternatives may apply on difficult lots. Providers familiar with Pima County soil variability plan shorter lateral repairs when full depth is impossible. Do not assume national repair templates fit without a site walk—local experience reduces repeat failures after partial fixes.',
      },
      {
        id: 'when-to-replace',
        heading: 'When Tucson repairs turn into replacement',
        body:
          'Steel tanks with advanced corrosion, repeatedly flooded fields after monsoon seasons, and systems undersized for added bedrooms often exceed cost-effective repair. County permit history helps determine whether reserve field area exists. Replacement planning takes time—interim pumping and water conservation bridge urgent periods. Compare repair estimates that only delay failure 12–24 months against replacement quotes with documented permit paths.',
      },
    ],
    faqs: [
      {
        question: 'Why do septic alarms trigger more in summer?',
        answer:
          'High water use, pump heat load, and storm-related electrical issues increase summer alarm calls. High water from field saturation is also common after irrigation or monsoon overload.',
      },
      {
        question: 'Can caliche prevent drain line repair?',
        answer:
          'Caliche limits depth and trench direction; repairs may reroute around impenetrable layers or shift to permitted replacement areas.',
      },
      {
        question: 'Are steel septic tanks still found in Tucson?',
        answer:
          'Yes, on older properties. Corrosion can cause sudden failures—inspection during pumping identifies when replacement is safer than patch repair.',
      },
      {
        question: 'Do I need a permit for pump replacement?',
        answer:
          'Depends on scope and county rules. Like-for-like pump swaps may differ from altering distribution or field layout—providers familiar with Pima County can advise.',
      },
    ],
    internalLinks: [
      { href: '/septic-repair', label: 'Septic repair overview' },
      { href: '/az/tucson/drain-field-repair', label: 'Tucson drain field repair' },
      { href: '/az/tucson/emergency-septic-service', label: 'Tucson emergency septic' },
      { href: '/az/tucson', label: 'Tucson septic hub' },
    ],
  }),

  cityServicePage('emergency-septic-service', {
    primaryKeyword: 'emergency septic service Tucson',
    secondaryKeywords: [
      '24 hour septic Tucson',
      'septic backup Tucson',
      'urgent septic pumping Tucson',
    ],
    title: 'Emergency Septic Service in Tucson, AZ | Urgent Local Help',
    metaDescription:
      'Emergency septic pumping and repair in Tucson when backups or overflows happen. What to do immediately in Pima County before the service truck arrives.',
    h1: 'Emergency Septic Service in Tucson, AZ',
    intro:
      'Emergency septic calls spike in Tucson after heavy monsoon bursts, holiday guest overload, and deferred pumping on older foothill systems. Sewage backing into tubs, effluent surfacing near Tanque Verde wash parcels, or silent pump chambers after power outages all warrant urgent response. Stop water use, keep family and pets away from wastewater, and request dispatch with a clear symptom description.',
    sections: [
      {
        id: 'tucson-emergency-scenarios',
        heading: 'Typical emergency scenarios locally',
        body:
          'Post-storm surfacing appears when fields were already marginal—dry desert soil masks problems until saturation. Winter visitor season in Sahuarita and Green Valley increases overload on tanks pumped years ago. Alarm panels on Oro Valley hillside systems trip when pumps fail or lines air-lock. Main line blockages from roots show up on older ranch-style homes in Vail and southeast Tucson zip codes. Each scenario starts with stabilization—usually pumping—then targeted repair once safe.',
      },
      {
        id: 'before-truck-arrives',
        heading: 'Before the emergency truck arrives',
        body:
          'Shut off optional water use and avoid flushing. If garage or shed houses the control panel, note alarm codes without opening sealed electrical components unless you were trained. Gate codes and rural addresses should be confirmed with dispatch—Tucson outskirts often share driveways. Do not drive over wet field areas; compaction worsens failure. Document photos for insurance if indoor backup occurred, but prioritize safety over cleanup before professional guidance.',
      },
      {
        id: 'after-hours',
        heading: 'After-hours and holiday response',
        body:
          'Many Pima County providers rotate on-call routes; fees should be disclosed when you book. Stabilization pumping may be followed by daytime inspection for permanent repair. If backup returns within days, plan field evaluation rather than repeated emergency pumps alone. Keep a post-emergency log: dates, gallons pumped, and technician notes about return flow—useful for county consultations if replacement is likely.',
      },
    ],
    faqs: [
      {
        question: 'How fast is emergency septic service in Tucson?',
        answer:
          'Same-day response is often available for true backups, depending on route and time. Describe whether sewage is indoors or surfacing outdoors to help triage.',
      },
      {
        question: 'Does monsoon rain cause septic emergencies?',
        answer:
          'Rain can trigger emergencies on already failing fields by saturating soil. It rarely causes failure alone on healthy, maintained systems.',
      },
      {
        question: 'Should I call 911 for a septic backup?',
        answer:
          '911 is for immediate life safety threats. Sewage backup is a health hazard—contact a licensed septic provider urgently and avoid contact with wastewater.',
      },
      {
        question: 'Will one emergency pump fix the problem?',
        answer:
          'It stops many active backups if the tank was full, but pump failure, line breaks, or dead fields need follow-up repairs or replacement.',
      },
    ],
    internalLinks: [
      { href: '/emergency-septic-service', label: 'Emergency septic overview' },
      { href: '/az/tucson/septic-pumping', label: 'Tucson septic pumping' },
      { href: '/signs-septic-tank-is-full', label: 'Signs your tank is full' },
      { href: '/az/tucson', label: 'Tucson septic hub' },
    ],
  }),

  cityServicePage('septic-inspection', {
    primaryKeyword: 'septic inspection Tucson AZ',
    secondaryKeywords: [
      'Tucson septic system inspection',
      'Pima County septic inspection',
      'home sale septic Tucson',
    ],
    title: 'Septic System Inspection in Tucson, AZ | Local Quotes',
    metaDescription:
      'Septic inspection quotes for Tucson home sales and maintenance. Pima County considerations, buried lids, and desert soil performance checks.',
    h1: 'Septic System Inspection in Tucson, AZ',
    intro:
      'Inspections in Tucson often support real estate in unincorporated Pima County pockets, foothills transfers, and inherited systems with lost records. Inspectors evaluate tank structure, baffles, liquid levels, pumps and alarms on hillside installs, and field signs masked by xeriscaping. Pair inspection with pumping when status is unknown—desert dry spells hide surfacing until monsoon or heavy irrigation.',
    sections: [
      {
        id: 'real-estate-inspections',
        heading: 'Inspections for Tucson-area real estate',
        body:
          'Buyers request documentation beyond a seller’s word—pumping receipts, photos, and written findings. Older permits on county files may not match current layout after additions. ADUs and casitas increase load beyond original design—inspectors note capacity risk even when components function today. Lenders may require specific scopes; clarify before ordering. Inspection on a vacant home should account for dried traps and long idle periods that affect odor and level readings.',
      },
      {
        id: 'field-signs-desert',
        heading: 'Reading field signs in desert landscaping',
        body:
          'Rock mulch and native plants hide green stripes over laterals. Inspectors walk fields after irrigation cycles when possible, looking for persistent dampness unlike surrounding soil. Caliche limits percolation—systems may pass dry-season checks yet fail under winter guest load. Dye testing has limits in fractured desert soil; combine with liquid level trends and distribution box checks for clearer pictures.',
      },
      {
        id: 'report-use',
        heading: 'Using your inspection report',
        body:
          'Negotiate repairs or credits from documented defects—not vague age guesses. Schedule riser installs if access delayed past pumping. Plan replacement early if reserve field area is absent on tight Catalina lots. Keep reports for future buyers to avoid repeat inspection costs. Follow-up after monsoon season confirms whether noted marginal fields actually fail under stress.',
      },
    ],
    faqs: [
      {
        question: 'Is septic inspection required in Pima County home sales?',
        answer:
          'Not universally, but it is common practice where septic serves the property. Confirm expectations with your agent and buyer lender.',
      },
      {
        question: 'Should inspection include pumping in Tucson?',
        answer:
          'Often yes when history is unknown. Pumping clarifies baffle condition and distinguishes full tanks from field failure.',
      },
      {
        question: 'Can inspection find buried lids?',
        answer:
          'Experienced providers locate lids routinely using records and probing. First visits take longer when no risers exist.',
      },
      {
        question: 'What if the system fails inspection?',
        answer:
          'Options include repair, replacement planning, price negotiation, or walk-away depending on severity and county permit feasibility.',
      },
    ],
    internalLinks: [
      { href: '/septic-inspection', label: 'Septic inspection overview' },
      { href: '/real-estate-septic-inspection', label: 'Real estate septic inspection' },
      { href: '/az/tucson/septic-pumping', label: 'Tucson septic pumping' },
      { href: '/az/tucson', label: 'Tucson septic hub' },
    ],
  }),

  cityServicePage('drain-field-repair', {
    primaryKeyword: 'drain field repair Tucson AZ',
    secondaryKeywords: [
      'Tucson leach field repair',
      'septic field failure Tucson',
      'fix drain field Pima County',
    ],
    title: 'Drain Field Repair in Tucson, AZ | Local Quotes',
    metaDescription:
      'Drain field repair in Tucson and Pima County—clay and caliche soils, monsoon saturation, and replacement planning on desert lots.',
    h1: 'Drain Field Repair in Tucson, AZ',
    intro:
      'Drain field failures around Tucson show up as persistent wet spots after monsoon, sewage odor near Sahuarita clay soils, or chronically full tanks in Marana subdivisions built before modern sizing rules. Caliche and shallow bedrock limit trench depth—repairs must respect soil realities and county setbacks. Partial line fixes help when damage is localized; widespread failure usually means new absorption area or engineered replacement.',
    sections: [
      {
        id: 'soil-conditions',
        heading: 'Local soil and drainage conditions',
        body:
          'Desert washes and arroyos near Vail and Catalina can redirect stormwater over fields if grading ignored original drainage paths. Clay lenses in the Santa Cruz Valley slow percolation compared to sandy pockets on the east side. Caliche pans block downward flow—symptoms mimic total field death even when laterals are intact. Repairs that ignore soil limits fail quickly; soil evaluation informs whether restoration or relocation is realistic.',
      },
      {
        id: 'monsoon-and-irrigation',
        heading: 'Monsoon and irrigation overload',
        body:
          'Healthy fields recover after rain; failing ones stay wet for weeks. Over-irrigating xeriscape near laterals adds hydraulic load equal to extra indoor use. Fix leaks and redirect emitters before trenching new lines. Seasonal timing matters—some restorative work is scheduled after monsoon when moisture patterns are visible. Document wet areas with photos dated across seasons for county consultations.',
      },
      {
        id: 'repair-vs-replace-tucson',
        heading: 'Repair vs. replacement on Tucson lots',
        body:
          'Tight foothills lots may lack reserve field space—replacement shifts to engineered or advanced treatment options permitted in Pima County. Flat desert parcels sometimes allow parallel fields if setbacks to wells and structures are met. Spot lateral replacement works when distribution boxes send flow evenly to remaining good lines. Repeat emergency pumping after dry weather strongly suggests replacement over another partial repair.',
      },
    ],
    faqs: [
      {
        question: 'Can caliche cause drain field failure in Tucson?',
        answer:
          'Caliche restricts percolation and excavation depth, contributing to failure or limiting repair options. Soil conditions should guide design, not just pipe age.',
      },
      {
        question: 'Does heavy monsoon rain ruin my leach field?',
        answer:
          'Rain exposes existing failure but rarely destroys a maintained field in one season. Persistent surfacing after storms needs professional evaluation.',
      },
      {
        question: 'Can I park on my drain field in the desert?',
        answer:
          'No. Vehicle weight compacts soil and crushes laterals—even on dry desert surface. Keep traffic off absorption areas.',
      },
      {
        question: 'How do I know if I have reserve drain field area?',
        answer:
          'County permit files often show original and reserve layouts. Inspectors and installers review records during replacement planning.',
      },
    ],
    internalLinks: [
      { href: '/drain-field-repair', label: 'Drain field repair overview' },
      { href: '/leach-field-repair', label: 'Leach field repair' },
      { href: '/az/tucson/septic-repair', label: 'Tucson septic repair' },
      { href: '/az/tucson', label: 'Tucson septic hub' },
    ],
  }),

  draftServicePage(
    'septic-tank-cleaning',
    'Septic Tank Cleaning Services | Local Quotes',
    'Professional septic tank cleaning beyond standard pumping—heavy sludge removal and prep for inspection or property transfer.',
    'Septic Tank Cleaning',
    'Septic tank cleaning typically refers to thorough removal of built-up solids and scum, sometimes including washing or scraping baffle areas when preparing for inspection, real estate transfer, or long-deferred maintenance. It goes hand in hand with pumping but may involve extra time on heavily neglected tanks.',
  ),
  draftServicePage(
    'septic-installation',
    'Septic System Installation | New System Quotes',
    'New septic system installation for homes without sewer access—design, permits, tank and drain field placement.',
    'Septic System Installation',
    'New septic installation covers site evaluation, permit filing, tank and absorption field placement, and connection to household plumbing. Soil testing, setbacks from wells, and household size determine system type on each lot.',
  ),
  draftServicePage(
    'septic-system-replacement',
    'Septic System Replacement | Full & Partial Quotes',
    'Replace failing septic tanks, drain fields, pumps, and distribution when repair is no longer cost-effective.',
    'Septic System Replacement',
    'Replacement addresses end-of-life tanks, saturated drain fields, and undersized systems after home additions. Scope ranges from tank-only swaps to new absorption areas with updated county permits.',
  ),
  draftServicePage(
    'leach-field-repair',
    'Leach Field Repair | Restore Lateral Lines',
    'Leach field repair for broken laterals, root intrusion, and uneven distribution affecting soil absorption.',
    'Leach Field Repair',
    'Leach field repair targets lateral lines, headers, and distribution points where effluent enters the soil. Localized pipe damage differs from whole-field saturation—diagnosis determines whether repair or redesign is appropriate.',
  ),
  draftServicePage(
    'septic-riser-installation',
    'Septic Riser Installation | Bring Lids to Grade',
    'Install septic risers and lids for safer, faster future pumping and inspections without repeated digging.',
    'Septic Riser Installation',
    'Risers extend tank openings to or near ground level with secure lids rated for traffic where applicable. They reduce dig fees on future pumpings and make emergency access faster when every hour counts.',
  ),
  draftServicePage(
    'real-estate-septic-inspection',
    'Real Estate Septic Inspection | Pre-Sale & Pre-Purchase',
    'Real estate septic inspections with documentation for buyers, sellers, and lenders during property transfer.',
    'Real Estate Septic Inspection',
    'Real estate septic inspections focus on transfer-ready documentation: tank condition, access, pumping history, distribution components, and visible field performance. Scope is often negotiated between buyer and seller agents.',
  ),
];

export const SEO_PAGES: SeoPageContent[] = SEO_PAGES_DATA;

export function getSeoPage(slug: string): SeoPageContent | undefined {
  return SEO_PAGES.find((page) => page.slug === slug);
}

export function getPublishedSeoPages(): SeoPageContent[] {
  return SEO_PAGES.filter((page) => page.published);
}

export function getIndexableSeoPages(): SeoPageContent[] {
  return SEO_PAGES.filter((page) => page.published && page.indexStatus === 'indexable');
}
