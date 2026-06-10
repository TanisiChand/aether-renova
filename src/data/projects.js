// Single source of truth for every project across the site.
// Used by /projects, the Companies page, and anywhere else a project appears,
// so name / stats / image stay consistent everywhere.
export const projects = [
  {
    id: 'kusaha-solar',
    mapX: 872,
    mapY: 534,
    detailUrl: '/projects/kusaha-solar',
    name: 'Kusaha Solar',
    type: 'Solar Generation',
    generation: 'Solar',
    companyId: 'solaeris',
    company: 'Solaeris',
    companyLogo: '/logos/solaeris.svg',
    capacity: '50 MW',
    capacityMW: 50,
    location: 'Sunsari District, Nepal',
    status: 'In Development',
    phase: 'Construction',
    progress: 60,
    target: 'Target COD · Feb 2027',
    output: '82 GWh / yr',
    households: '40,000+',
    co2: '35,000 t / yr',
    builder: 'Aether Construction',
    image:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&h=800&fit=crop',
    blurb:
      'A landmark utility-scale solar installation in Nepal’s Terai region, delivering clean power at scale.',
  },
  {
    id: 'dhalkebar-solar',
    mapX: 732,
    mapY: 501,
    detailUrl: '/projects/dhalkebar-solar',
    name: 'Dhalkebar Solar',
    type: 'Solar Generation',
    generation: 'Solar',
    companyId: 'terra-sol',
    company: 'Terra Sol',
    companyLogo: '/logos/terrasol.svg',
    capacity: '20 MW',
    capacityMW: 20,
    location: 'Mahottari, Madhesh Pradesh, Nepal',
    status: 'In Development',
    phase: 'Construction',
    progress: 50,
    target: 'Target COD · Nov 2026',
    output: '40 GWh / yr',
    households: '18,000+',
    co2: '20,125 t / yr',
    builder: 'Aether Construction',
    image:
      'https://images.unsplash.com/photo-1545209463-e2825498edbf?q=80&w=1200&h=800&fit=crop',
    blurb:
      'High-yield photovoltaic generation feeding directly into one of Nepal’s key grid substations.',
  },
  {
    id: 'chameliya-chettigad-hydropower',
    mapX: 60,
    mapY: 83,
    detailUrl: '/projects/chameliya-chettigad',
    name: 'Chameliya–Chettigad Hydropower',
    type: 'Hydropower',
    generation: 'Hydro',
    companyId: 'grid-nepal',
    company: 'Grid Nepal',
    companyLogo: '/logos/gridnepal.svg',
    capacity: '85 MW',
    capacityMW: 85,
    location: 'Darchula District, Nepal',
    status: 'In Development',
    phase: 'Construction',
    progress: 28,
    target: 'Target COD · 2029',
    output: '566 GWh / yr',
    households: '95,000+',
    co2: '510,000 t / yr',
    builder: 'Aether Construction',
    image: '/projects/chameliya-chettigad.jpg',
    blurb:
      'A run-of-river hydropower scheme on the Chameliya River in the Mahakali basin.',
  },
  {
    id: 'chulini-hydropower',
    mapX: 484,
    mapY: 300,
    name: 'Chaulani Hydropower',
    type: 'Hydropower',
    generation: 'Hydro',
    companyId: 'west-star',
    company: 'West Star',
    companyLogo: '/logos/weststar.svg',
    capacity: '35 MW',
    capacityMW: 35,
    location: 'Darchula District, Nepal',
    status: 'In Development',
    phase: 'Permitting',
    progress: 18,
    target: 'Target COD · Q3 2027',
    output: '160 GWh / yr',
    households: '42,000+',
    co2: '70,000 t / yr',
    builder: 'Aether Construction',
    image: '/projects/chulini.jpg',
    blurb:
      'A mountain run-of-river project tuned to the seasonal flows of Nepal’s mid-hills.',
  },
]

// Convenience lookups.
export const projectsByCompany = projects.reduce((acc, p) => {
  ;(acc[p.companyId] = acc[p.companyId] || []).push(p)
  return acc
}, {})

export const getProject = (id) => projects.find((p) => p.id === id)

// Lifecycle stages, in order, used by the homepage Project Status tracker.
export const PROJECT_STAGES = [
  'Planning',
  'Permitting',
  'Construction',
  'Commissioning',
  'Operational',
]

// Portfolio-level rollups for the status overview.
export const portfolio = {
  totalMW: projects.reduce((sum, p) => sum + (p.capacityMW || 0), 0),
  count: projects.length,
  operational: projects.filter((p) => p.status === 'Operational').length,
  inDevelopment: projects.filter((p) => p.status !== 'Operational').length,
  underConstruction: projects.filter((p) => p.phase === 'Construction').length,
  permitting: projects.filter((p) => p.phase === 'Permitting').length,
}
