import { Blueprint } from '../types/Blueprint';

export const BLUEPRINTS: Blueprint[] = [
  {
    id: 'vet-standard',
    name: 'Veterinary Site – Standard',
    phaseOffsets: { discovery: 0, content: 7, design: 28, launch: 56 },
    defaultSiteMap: ['Home', 'About', 'Services', 'Contact'],
    tasks: []
  },
  {
    id: 'dental-lite',
    name: 'Dental Landing-Page',
    phaseOffsets: { discovery: 0, content: 3, design: 10, launch: 21 },
    defaultSiteMap: ['Home', 'Services', 'Contact'],
    tasks: []
  },
  {
    id: 'multi-location',
    name: 'Multi-Location Practice',
    phaseOffsets: { discovery: 0, content: 14, design: 35, launch: 70 },
    defaultSiteMap: ['Home', 'Locations', 'Services', 'About', 'Contact'],
    tasks: []
  }
];