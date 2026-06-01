// Single source of truth for every project across the site.
// Used by /projects, the Companies page, and anywhere else a project appears,
// so name / stats / image stay consistent everywhere.
export const projects = [
  {
    id: 'kusaha-solar',
    mapX: 872,
    mapY: 534,
    name: 'Kusaha Solar',
    type: 'Solar Generation',
    generation: 'Solar',
    companyId: 'solaeris',
    company: 'Solaeris',
    companyLogo: '/logos/solaeris.svg',
    capacity: '50 MW',
    location: 'Sunsari District, Nepal',
    status: 'Operational',
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
    location: 'Dhanusha District, Nepal',
    status: 'In Development',
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
    location: 'Darchula District, Nepal',
    status: 'In Development',
    builder: 'Aether Construction',
    image:
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=1200&h=800&fit=crop',
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
    location: 'Gandaki Province, Nepal',
    status: 'In Development',
    builder: 'Aether Construction',
    image:
      'https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=1200&h=800&fit=crop',
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
