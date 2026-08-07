export type ServiceOption = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  quoteFormLabel: string;
  primaryKeyword: string;
  relatedSlugs: string[];
};

export type UrgencyOption = {
  value: string;
  label: string;
};

export const SERVICE_OPTIONS: ServiceOption[] = [
  {
    slug: 'septic-pumping',
    name: 'Septic Tank Pumping',
    shortName: 'Pumping',
    description:
      'Professional removal of sludge and scum from your septic tank to restore capacity, prevent backups, and extend system life.',
    quoteFormLabel: 'Septic tank pumping / routine service',
    primaryKeyword: 'septic tank pumping',
    relatedSlugs: [
      'septic-tank-cleaning',
      'septic-inspection',
      'septic-riser-installation',
      'emergency-septic-service',
    ],
  },
  {
    slug: 'septic-repair',
    name: 'Septic System Repair',
    shortName: 'Repair',
    description:
      'Diagnosis and repair of pumps, alarms, floats, baffles, lines, and other components that keep your septic system working safely.',
    quoteFormLabel: 'Septic system repair',
    primaryKeyword: 'septic system repair',
    relatedSlugs: [
      'drain-field-repair',
      'leach-field-repair',
      'emergency-septic-service',
      'septic-inspection',
    ],
  },
  {
    slug: 'septic-tank-cleaning',
    name: 'Septic Tank Cleaning',
    shortName: 'Cleaning',
    description:
      'Thorough tank cleaning beyond standard pumping, including heavy sludge removal and preparation for inspection or real estate transfer.',
    quoteFormLabel: 'Septic tank cleaning',
    primaryKeyword: 'septic tank cleaning',
    relatedSlugs: ['septic-pumping', 'septic-inspection', 'real-estate-septic-inspection'],
  },
  {
    slug: 'septic-inspection',
    name: 'Septic System Inspection',
    shortName: 'Inspection',
    description:
      'Visual and operational inspection of tank, distribution, and drain field components to identify failures before they become emergencies.',
    quoteFormLabel: 'Septic system inspection',
    primaryKeyword: 'septic system inspection',
    relatedSlugs: [
      'real-estate-septic-inspection',
      'septic-pumping',
      'septic-repair',
      'drain-field-repair',
    ],
  },
  {
    slug: 'septic-installation',
    name: 'Septic System Installation',
    shortName: 'Installation',
    description:
      'Design and installation of new conventional or advanced treatment systems for homes without municipal sewer access.',
    quoteFormLabel: 'New septic system installation',
    primaryKeyword: 'septic system installation',
    relatedSlugs: ['septic-system-replacement', 'septic-inspection', 'drain-field-repair'],
  },
  {
    slug: 'septic-system-replacement',
    name: 'Septic System Replacement',
    shortName: 'Replacement',
    description:
      'Full or partial replacement of failing tanks, distribution boxes, pumps, or drain fields when repair is no longer viable.',
    quoteFormLabel: 'Septic system replacement',
    primaryKeyword: 'septic system replacement',
    relatedSlugs: [
      'septic-installation',
      'drain-field-repair',
      'leach-field-repair',
      'septic-inspection',
    ],
  },
  {
    slug: 'drain-field-repair',
    name: 'Drain Field Repair',
    shortName: 'Drain Field',
    description:
      'Restoration or replacement of soil absorption areas where effluent is treated underground, including pipe and distribution repairs.',
    quoteFormLabel: 'Drain field repair',
    primaryKeyword: 'drain field repair',
    relatedSlugs: ['leach-field-repair', 'septic-repair', 'septic-system-replacement'],
  },
  {
    slug: 'leach-field-repair',
    name: 'Leach Field Repair',
    shortName: 'Leach Field',
    description:
      'Repair of leach lines, headers, and surrounding soil conditions that affect how wastewater percolates through the field.',
    quoteFormLabel: 'Leach field repair',
    primaryKeyword: 'leach field repair',
    relatedSlugs: ['drain-field-repair', 'septic-repair', 'septic-system-replacement'],
  },
  {
    slug: 'emergency-septic-service',
    name: 'Emergency Septic Service',
    shortName: 'Emergency',
    description:
      'Same-day or after-hours response for sewage backups, overflowing tanks, alarm failures, and other urgent septic problems.',
    quoteFormLabel: 'Emergency septic service',
    primaryKeyword: 'emergency septic service',
    relatedSlugs: ['septic-pumping', 'septic-repair', 'septic-inspection'],
  },
  {
    slug: 'septic-riser-installation',
    name: 'Septic Riser Installation',
    shortName: 'Riser Install',
    description:
      'Installation of risers and secure lids to bring tank access to grade, making future pumping and inspections faster and safer.',
    quoteFormLabel: 'Septic riser installation',
    primaryKeyword: 'septic riser installation',
    relatedSlugs: ['septic-pumping', 'septic-inspection', 'septic-tank-cleaning'],
  },
  {
    slug: 'real-estate-septic-inspection',
    name: 'Real Estate Septic Inspection',
    shortName: 'RE Inspection',
    description:
      'Pre-purchase or pre-sale septic evaluation documenting tank condition, access, and drain field performance for property transfers.',
    quoteFormLabel: 'Real estate septic inspection',
    primaryKeyword: 'real estate septic inspection',
    relatedSlugs: ['septic-inspection', 'septic-pumping', 'septic-tank-cleaning'],
  },
];

export const SERVICES: Record<string, ServiceOption> = Object.fromEntries(
  SERVICE_OPTIONS.map((service) => [service.slug, service]),
);

export const URGENCY_OPTIONS: UrgencyOption[] = [
  { value: 'emergency', label: 'Emergency — sewage backup or overflow now' },
  { value: '24h', label: 'Within 24 hours' },
  { value: 'few_days', label: 'Within a few days' },
  { value: '1_2_weeks', label: 'Within 1–2 weeks' },
  { value: 'planning', label: 'Planning / comparing quotes' },
];
