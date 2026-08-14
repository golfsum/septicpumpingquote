import { getPublishedLocations, type Location } from "@/config/locations";
import type { SeoPageContent } from "@/content/seo-pages";

type CityServiceSlug =
  | "septic-pumping"
  | "emergency-septic-service"
  | "septic-repair"
  | "septic-installation"
  | "septic-tank-cleaning";

function hubPath(loc: Location) {
  return `/${loc.stateSlug}/${loc.slug}`;
}

function cityServicePath(loc: Location, service: CityServiceSlug) {
  return `${hubPath(loc)}/${service}`;
}

function cityHub(loc: Location): SeoPageContent {
  const nearby = loc.nearbyNames.slice(0, 5).join(", ");
  const serviceLinks = (
    [
      "septic-pumping",
      "emergency-septic-service",
      "septic-repair",
      "septic-installation",
      "septic-tank-cleaning",
    ] as CityServiceSlug[]
  ).map((service) => ({
    href: cityServicePath(loc, service),
    label: `${loc.name} ${service.replace(/-/g, " ")}`,
  }));

  return {
    slug: `${loc.stateSlug}/${loc.slug}`,
    pageType: "city",
    city: loc.slug,
    state: loc.stateSlug,
    primaryKeyword: `septic service ${loc.name} ${loc.state}`,
    secondaryKeywords: [
      `septic ${loc.name}`,
      `${loc.name} septic service`,
      `septic services ${loc.name}`,
      `${loc.name} septic pumping`,
      `${loc.regionLabel} septic`,
    ],
    title: `Septic Services in ${loc.name}, ${loc.state} | Local Quotes`,
    metaDescription: `Compare septic pumping, emergency, repair, installation, and cleaning quotes in ${loc.name} and ${loc.regionLabel}. Local notes on soil, climate, and access.`,
    h1: `Septic Services in ${loc.name}, ${loc.state}`,
    intro: `Looking for septic service in ${loc.name}, ${loc.state}? ${loc.localNotes} Nearby areas often include ${nearby}. Use the quote form to describe your property and get matched with licensed local providers.`,
    sections: [
      {
        id: "local-landscape",
        heading: `Septic in the ${loc.name} area`,
        body: `${loc.localNotes} ${loc.soilNotes} Matching the job to your lot type, tank access, and urgency matters more than generic national advice.`,
      },
      {
        id: "climate",
        heading: "Climate and seasonal factors",
        body: loc.climateNotes,
      },
      {
        id: "access",
        heading: "Access, lids, and site conditions",
        body: `${loc.accessNotes} If you have a prior pumping receipt or site plan, keep it handy—it speeds lid location and more accurate quotes.`,
      },
      {
        id: "services",
        heading: "Choose a service by what you need",
        body: `Routine maintenance usually starts with pumping or thorough tank cleaning. New builds and failed systems need installation or replacement planning. Backups and alarms belong on the emergency and repair paths—often after a stabilizing pump-out. Select a service below for focused guidance, or request a quote for your ${loc.name}-area address now.`,
      },
    ],
    faqs: [
      {
        question: `Is septic common in ${loc.name}?`,
        answer: `The urban core may be largely sewered, but ${loc.regionLabel} still has many homes on septic—especially in outlying and unincorporated areas. Confirm your connection type before scheduling.`,
      },
      {
        question: `What areas near ${loc.name} do you cover?`,
        answer: `Providers commonly serve ${nearby}, depending on route and licensing. Include your city, ZIP, and gate or access notes when requesting a quote.`,
      },
      {
        question: "How often should I pump my septic tank?",
        answer:
          "Many homes need pumping every three to five years, but household size, tank volume, garbage disposals, and seasonal occupancy can shorten that interval.",
      },
      {
        question: `Can I get emergency septic service near ${loc.name}?`,
        answer:
          "Urgent pumping and repair windows are often available for true backups. Availability varies by season and truck routes—describe symptoms clearly when you request help.",
      },
      {
        question: "Do I need to know my tank size?",
        answer:
          "Helpful but not required. Providers can often estimate from records or onsite measurement during the first pumping visit.",
      },
    ],
    internalLinks: [
      ...serviceLinks,
      { href: "/drain-field-repair", label: "Drain field repair" },
      { href: "/septic-tank-pumping-cost", label: "Pumping cost guide" },
    ],
    indexStatus: "indexable",
    published: true,
  };
}

function cityPumping(loc: Location): SeoPageContent {
  const nearby = loc.nearbyNames.slice(0, 4).join(", ");
  return {
    slug: `${loc.stateSlug}/${loc.slug}/septic-pumping`,
    pageType: "city-service",
    service: "septic-pumping",
    city: loc.slug,
    state: loc.stateSlug,
    primaryKeyword: `septic pumping ${loc.name} ${loc.state}`,
    secondaryKeywords: [
      `${loc.name} septic tank pumping`,
      `pump septic ${loc.name}`,
      `emergency septic pumping near me`,
      `${loc.regionLabel} septic pumping`,
    ],
    title: `Septic Tank Pumping in ${loc.name}, ${loc.state} | Local Quotes`,
    metaDescription: `Get septic tank pumping quotes in ${loc.name} and nearby ${loc.regionLabel} communities. Local notes on access, soils, and timing.`,
    h1: `Septic Tank Pumping in ${loc.name}, ${loc.state}`,
    intro: `${loc.pumpingNotes} ${loc.accessNotes} Request a local quote with your ZIP, tank details if known, and urgency.`,
    sections: [
      {
        id: "local-access",
        heading: `Access and lid location near ${loc.name}`,
        body: `${loc.accessNotes} Buried lids add dig time unless risers are already installed. Marking the tank after service saves money on the next cycle.`,
      },
      {
        id: "intervals",
        heading: "Recommended pumping intervals locally",
        body: `${loc.pumpingNotes} ${loc.climateNotes}`,
      },
      {
        id: "soil-climate",
        heading: "Soil and climate considerations",
        body: `${loc.soilNotes} ${loc.climateNotes}`,
      },
      {
        id: "coverage",
        heading: `${loc.name} hub serving nearby areas`,
        body: `Providers routing through ${loc.regionLabel} often also cover ${nearby}. Mention gate codes, soft ground, steep drives, and HOA rules when you request a quote so travel and hose assumptions are accurate.`,
      },
    ],
    faqs: [
      {
        question: `How do I find my septic tank in ${loc.name}?`,
        answer:
          "Check prior pumping receipts, county permit files, or look for lid outlines near a line from the home cleanout. Providers locate tanks regularly and can install risers after digging.",
      },
      {
        question: "What affects pumping cost?",
        answer:
          "Tank size, how full the tank is, dig time for buried lids, hose length, travel distance, and emergency timing. Compare written scopes, not just a single lump-sum number.",
      },
      {
        question: `Should I pump before the wet season near ${loc.name}?`,
        answer:
          "Staying on schedule reduces backup risk when heavy rain or seasonal occupancy stresses marginal systems. Pumping is not a substitute for fixing a failed drain field.",
      },
      {
        question: "Do providers pump commercial tanks?",
        answer:
          "Many residential pumpers also handle small commercial tanks with proper disposal paperwork. Describe tank size and business type when requesting a quote.",
      },
    ],
    internalLinks: [
      { href: "/septic-pumping", label: "Septic pumping overview" },
      { href: hubPath(loc), label: `All ${loc.name} septic services` },
      {
        href: cityServicePath(loc, "emergency-septic-service"),
        label: `${loc.name} emergency septic`,
      },
      { href: "/septic-tank-pumping-cost", label: "Pumping cost guide" },
    ],
    indexStatus: "indexable",
    published: true,
  };
}

function cityEmergency(loc: Location): SeoPageContent {
  const nearby = loc.nearbyNames.slice(0, 4).join(", ");
  return {
    slug: `${loc.stateSlug}/${loc.slug}/emergency-septic-service`,
    pageType: "city-service",
    service: "emergency-septic-service",
    city: loc.slug,
    state: loc.stateSlug,
    primaryKeyword: `emergency septic service ${loc.name}`,
    secondaryKeywords: [
      `emergency septic pumping near me`,
      `emergency septic repair near me`,
      `emergency septic repair ${loc.name}`,
      `septic backup ${loc.name}`,
      `24 hour septic ${loc.name}`,
    ],
    title: `Emergency Septic Service in ${loc.name}, ${loc.state} | Urgent Help`,
    metaDescription: `Emergency septic pumping and repair near ${loc.name}. What to do for backups and overflows in ${loc.regionLabel} before the truck arrives.`,
    h1: `Emergency Septic Service in ${loc.name}, ${loc.state}`,
    intro: `Need emergency septic pumping or repair near you in the ${loc.name} area? ${loc.climateNotes} Stop water use, keep people and pets away from wastewater, and request dispatch with a clear symptom description for ${loc.regionLabel} routes.`,
    sections: [
      {
        id: "local-emergencies",
        heading: `Typical emergencies near ${loc.name}`,
        body: `${loc.climateNotes} ${loc.soilNotes} Stabilization usually starts with pumping, then repair if pumps, lines, or fields failed.`,
      },
      {
        id: "before-truck",
        heading: "Before the emergency truck arrives",
        body: `Shut off optional water use and avoid flushing. ${loc.accessNotes} Confirm gate codes and rural address notes with dispatch so crews covering ${nearby} can find you quickly.`,
      },
      {
        id: "pumping-vs-repair",
        heading: "Emergency pumping vs. emergency repair",
        body: `Overfull tanks often calm down after urgent pumping. Failed pumps, broken lines, and saturated fields need repair after stabilization. ${loc.pumpingNotes}`,
      },
    ],
    faqs: [
      {
        question: `How fast is emergency septic service near ${loc.name}?`,
        answer:
          "Same-day response is often available for true backups, depending on route and time. Describe whether sewage is indoors or surfacing outdoors to help triage.",
      },
      {
        question: "Will one emergency pump fix the problem?",
        answer:
          "It stops many active backups if the tank was full, but pump failure, line breaks, or dead fields need follow-up repairs.",
      },
      {
        question: "Should I call a plumber or septic company?",
        answer:
          "If multiple drains are affected or you know you are on septic, start with a septic provider. Plumbers help isolated indoor clogs when the septic system is healthy.",
      },
      {
        question: "What should I do right now?",
        answer:
          "Stop water use, avoid contact with sewage, and request emergency pumping or repair with your ZIP and symptoms.",
      },
    ],
    internalLinks: [
      { href: "/emergency-septic-service", label: "Emergency septic overview" },
      { href: cityServicePath(loc, "septic-pumping"), label: `${loc.name} septic pumping` },
      { href: cityServicePath(loc, "septic-repair"), label: `${loc.name} septic repair` },
      { href: hubPath(loc), label: `${loc.name} septic hub` },
    ],
    indexStatus: "indexable",
    published: true,
  };
}

function cityRepair(loc: Location): SeoPageContent {
  return {
    slug: `${loc.stateSlug}/${loc.slug}/septic-repair`,
    pageType: "city-service",
    service: "septic-repair",
    city: loc.slug,
    state: loc.stateSlug,
    primaryKeyword: `septic repair ${loc.name} ${loc.state}`,
    secondaryKeywords: [
      `${loc.name} septic system repair`,
      `emergency septic repair near me`,
      `septic tank and drain field repair`,
      `fix septic ${loc.name}`,
    ],
    title: `Septic System Repair in ${loc.name}, ${loc.state} | Local Quotes`,
    metaDescription: `Septic repair quotes in ${loc.name} for pumps, baffles, lines, and field-related issues. Local notes for ${loc.regionLabel} soils and access.`,
    h1: `Septic System Repair in ${loc.name}, ${loc.state}`,
    intro: `Repair calls around ${loc.name} often trace to pumps, alarms, baffles, distribution boxes, and lines stressed by local soils and weather. ${loc.soilNotes} Accurate diagnosis separates a pump-out from a true field failure.`,
    sections: [
      {
        id: "common-repairs",
        heading: `Common repairs in ${loc.regionLabel}`,
        body: `${loc.accessNotes} ${loc.climateNotes} Outlet baffles, effluent pumps, and tilted distribution boxes are frequent fixes before full field replacement.`,
      },
      {
        id: "soil-limits",
        heading: "Soil and excavation limits",
        body: `${loc.soilNotes} Providers familiar with local conditions plan shorter lateral repairs when full-depth trenches are impossible.`,
      },
      {
        id: "repair-vs-replace",
        heading: "When repair becomes replacement",
        body: `${loc.pumpingNotes} Repeat emergency pumping after dry weather strongly suggests field evaluation or replacement planning rather than another patch.`,
      },
    ],
    faqs: [
      {
        question: `Can you repair a septic system near ${loc.name} without replacing it?`,
        answer:
          "Often yes for pumps, baffles, lids, and localized line damage. Widespread field failure usually needs new absorption area or redesign.",
      },
      {
        question: "Does repair include pumping?",
        answer:
          "Many repair visits start with pumping so technicians can see baffles and levels. Ask whether pumping is included in the quote.",
      },
      {
        question: "Do I need a permit for repairs?",
        answer:
          "Like-for-like component swaps may differ from altering fields or tanks. Local providers familiar with county rules can advise.",
      },
      {
        question: "Is drain field repair different from tank repair?",
        answer:
          "Yes. Tank and component repairs differ from soil absorption repairs. Describe wet spots, odors, and how fast the tank refills after pumping.",
      },
    ],
    internalLinks: [
      { href: "/septic-repair", label: "Septic repair overview" },
      { href: "/drain-field-repair", label: "Drain field repair" },
      {
        href: cityServicePath(loc, "emergency-septic-service"),
        label: `${loc.name} emergency septic`,
      },
      { href: hubPath(loc), label: `${loc.name} septic hub` },
    ],
    indexStatus: "indexable",
    published: true,
  };
}

function cityInstallation(loc: Location): SeoPageContent {
  return {
    slug: `${loc.stateSlug}/${loc.slug}/septic-installation`,
    pageType: "city-service",
    service: "septic-installation",
    city: loc.slug,
    state: loc.stateSlug,
    primaryKeyword: `septic system installation ${loc.name}`,
    secondaryKeywords: [
      `septic tank installation ${loc.name}`,
      `new septic system ${loc.name}`,
      `septic install ${loc.name} ${loc.state}`,
    ],
    title: `Septic System Installation in ${loc.name}, ${loc.state} | Quotes`,
    metaDescription: `Septic tank and system installation quotes in ${loc.name} and ${loc.regionLabel}. Site evaluation, permits, and local soil considerations.`,
    h1: `Septic System Installation in ${loc.name}, ${loc.state}`,
    intro: `New septic tank and system installation around ${loc.name} depends on local soils, lot layout, and health department rules. ${loc.soilNotes} Request quotes with bedroom count, parcel location, and whether this is a new build or replacement.`,
    sections: [
      {
        id: "local-design",
        heading: `Designing for ${loc.regionLabel}`,
        body: `${loc.localNotes} ${loc.soilNotes} Conventional trenches work on some lots; others need pressure-dosed or alternative systems.`,
      },
      {
        id: "permits",
        heading: "Site evaluation and permits",
        body: `Expect soil or site evaluation before design approval. ${loc.accessNotes} Keep prior permit files if replacing a failed system—they speed redesign.`,
      },
      {
        id: "cost-local",
        heading: "What drives install cost locally",
        body: `${loc.climateNotes} Excavation difficulty, system type, tank size, and equipment access dominate quotes more than a generic per-bedroom national average.`,
      },
    ],
    faqs: [
      {
        question: `How much does septic installation cost near ${loc.name}?`,
        answer:
          "It varies with soil, system type, and access. Get itemized local quotes for design, permits, tank, field, and inspection rather than relying on national averages.",
      },
      {
        question: "Do I need a soil test?",
        answer:
          "Almost always. Soil and site evaluation determine whether a conventional field is allowed or an alternative system is required.",
      },
      {
        question: "Is installation different from replacement?",
        answer:
          "Replacement may reuse house plumbing stubs, but failed fields often need a new absorption area. New builds start from a blank site evaluation.",
      },
      {
        question: `Can I install septic inside ${loc.name}?`,
        answer:
          "Many central parcels are on sewer. Septic is more common in outlying and unincorporated areas. Confirm utility availability first.",
      },
    ],
    internalLinks: [
      { href: "/septic-installation", label: "Installation overview" },
      { href: "/drain-field-repair", label: "Drain field repair" },
      { href: cityServicePath(loc, "septic-repair"), label: `${loc.name} septic repair` },
      { href: hubPath(loc), label: `${loc.name} septic hub` },
    ],
    indexStatus: "indexable",
    published: true,
  };
}

function cityCleaning(loc: Location): SeoPageContent {
  return {
    slug: `${loc.stateSlug}/${loc.slug}/septic-tank-cleaning`,
    pageType: "city-service",
    service: "septic-tank-cleaning",
    city: loc.slug,
    state: loc.stateSlug,
    primaryKeyword: `septic tank cleaning ${loc.name}`,
    secondaryKeywords: [
      `septic system cleaning near me`,
      `septic system cleaning ${loc.name}`,
      `${loc.name} septic cleaning`,
      `clean septic tank ${loc.name}`,
    ],
    title: `Septic Tank Cleaning in ${loc.name}, ${loc.state} | Local Quotes`,
    metaDescription: `Septic system cleaning near ${loc.name}—thorough sludge and scum removal for ${loc.regionLabel} homes before inspection, sale, or after deferred maintenance.`,
    h1: `Septic Tank Cleaning in ${loc.name}, ${loc.state}`,
    intro: `Searching for septic system cleaning near you around ${loc.name} usually means you need a thorough solids removal—not a rushed liquid pump-out. ${loc.pumpingNotes}`,
    sections: [
      {
        id: "local-cleaning",
        heading: `Cleaning needs in ${loc.regionLabel}`,
        body: `${loc.climateNotes} ${loc.accessNotes} Long gaps between services and buried lids are common reasons homeowners book a deeper clean.`,
      },
      {
        id: "visit",
        heading: "What the visit includes",
        body: `Technicians empty compartments, check visible baffles, and often clean effluent filters. ${loc.soilNotes} Ask for risers at grade if lids were buried.`,
      },
      {
        id: "vs-additives",
        heading: "Cleaning vs. additives",
        body: `Additives do not remove sludge. If odors return soon after a cheap pump-out, schedule thorough cleaning and consider field evaluation if the tank refills unusually fast.`,
      },
    ],
    faqs: [
      {
        question: "Is cleaning the same as pumping?",
        answer:
          "They overlap. Cleaning usually implies more thorough solids removal and prep for inspection. Clarify scope when you request a quote.",
      },
      {
        question: `How much does septic cleaning cost near ${loc.name}?`,
        answer:
          "Tank size, dig time, access, and sludge thickness drive price. Outer parcels and buried lids usually cost more than easy riser access.",
      },
      {
        question: "Should I clean before selling?",
        answer:
          "Often yes—buyers want recent service history and a clearer view of tank condition. Pair with inspection when records are missing.",
      },
      {
        question: "Do additives work?",
        answer:
          "No. Mechanical removal of sludge and scum is still required. Some additives can harm drain-field biology.",
      },
    ],
    internalLinks: [
      { href: "/septic-tank-cleaning", label: "Cleaning overview" },
      { href: cityServicePath(loc, "septic-pumping"), label: `${loc.name} septic pumping` },
      { href: "/septic-inspection", label: "Septic inspection" },
      { href: hubPath(loc), label: `${loc.name} septic hub` },
    ],
    indexStatus: "indexable",
    published: true,
  };
}

/** City hubs + high-intent service pages (excludes Tucson, which is hand-authored richer). */
export function buildGeneratedCitySeoPages(): SeoPageContent[] {
  return getPublishedLocations()
    .filter((loc) => loc.slug !== "tucson")
    .flatMap((loc) => [
      cityHub(loc),
      cityPumping(loc),
      cityEmergency(loc),
      cityRepair(loc),
      cityInstallation(loc),
      cityCleaning(loc),
    ]);
}
