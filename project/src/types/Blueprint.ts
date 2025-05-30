export interface Blueprint {
  id: string;
  name: string;
  phaseOffsets: {
    discovery: number;
    content: number;
    design: number;
    launch: number;
  };
  defaultSiteMap: string[];
  tasks: any[]; // We'll type this properly later
}