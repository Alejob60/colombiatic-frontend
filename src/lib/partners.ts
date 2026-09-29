export type Program = {
  id: string;
  name: string;
  sub?: string;
};

export const PROGRAMS: Program[] = [
  { id: 'nvidia-inception', name: 'NVIDIA Inception' },
  { id: 'google-for-startups', name: 'Google for Startups' },
  { id: 'microsoft-for-startups', name: 'Microsoft for Startups' },
  { id: 'alibaba-cloud', name: 'Alibaba Cloud' },
  { id: 'colombiatic', name: 'ColombiaTIC', sub: 'Ingeniería SAS · Est. 2020' },
];
