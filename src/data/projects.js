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
    status: 'Operational',
    phase: 'Operational',
    progress: 100,
    target: 'Online since 2023',
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
    name: 'Dhalkebar Solar',
    type: 'Solar Generation',
    generation: 'Solar',
    companyId: 'terra-sol',
    company: 'Terra Sol',
    companyLogo: '/logos/terrasol.svg',
    capacity: '20 MW',
    capacityMW: 20,
    location: 'Dhanusha District, Nepal',
    status: 'In Development',
    phase: 'Construction',
    progress: 55,
    target: 'Target COD · Q4 2026',
    output: '34 GWh / yr',
    households: '18,000+',
    co2: '14,000 t / yr',
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
    phase: 'Permitting',
    progress: 28,
    target: 'Target COD · 2028',
    output: '410 GWh / yr',
    households: '95,000+',
    co2: '180,000 t / yr',
    builder: 'Aether Construction',
    image: '/projects/chameliya-chettigad.jpg',
    blurb:
      'A combined run-of-river hydropower scheme harnessing the Chameliya and Chettigad river systems.',
  },
  {
    id: 'chulini-hydropower',
    mapX: 484,
    mapY: 300,
    name: 'Chulini Hydropower',
    type: 'Hydropower',
    generation: 'Hydro',
    companyId: 'west-star',
    company: 'West Star',
    companyLogo: '/logos/weststar.svg',
    capacity: '35 MW',
    capacityMW: 35,
    location: 'Gandaki Province, Nepal',
    status: 'In Development',
    phase: 'Construction',
    progress: 62,
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
}
