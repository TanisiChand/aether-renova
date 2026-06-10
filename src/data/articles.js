// Shared blog/insights data used by the homepage "From The Grid" section
// and the dedicated /blog page.
export const articles = [
  {
    slug: 'nepal-mountains-are-a-battery',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000&h=600&fit=crop',
    alt: 'A high mountain reservoir between Himalayan peaks',
    tag: 'Analysis',
    date: 'Jun 9, 2026',
    read: '8 min read',
    title: "Nepal's Mountains Are a Battery. We Just Need to Flip the Switch.",
    excerpt:
      "How pumped storage hydropower can turn Nepal's costliest grid problem — billions of rupees of curtailed monsoon power — into its greatest export opportunity.",
    initials: 'PC',
    author: 'Puja Chand Thakur',
    authorRole: 'Managing Director & Chairperson',
    featured: true,
    body: [
      {
        type: 'p',
        text: "Every June, Nepal's grid drowns in electricity. Run-of-river hydropower surges past roughly 4,000 MW of installed capacity while domestic peak demand sits comfortably below it. The result is a wet-season surplus that cannot be absorbed at home or exported fast enough.",
      },
      {
        type: 'list',
        items: [
          'USD 192M — electricity curtailed in 2024/25',
          '42 GW — pumped-storage technical potential identified',
          '3–5× — peak versus off-peak price premium',
          '4,000 m — elevation drop within 150 kilometres',
        ],
      },
      { type: 'h2', text: 'The Monsoon Paradox' },
      {
        type: 'p',
        text: "In 2024/25, the Nepal Electricity Authority (NEA) curtailed electricity worth approximately USD 192 million — power that was generated and then thrown away because there was no buyer for it. One recent study projects this surplus will reach 3.8 TWh by 2028 if installed capacity keeps growing at current rates.",
      },
      {
        type: 'p',
        text: "Then the monsoon ends. By November, river flows drop sharply and generation falls to roughly one-third of installed capacity. NEA scrambles to import power from India at premium prices — 654 MW of import approvals were secured as recently as February 2026, even as India's own summer demand was peaking.",
      },
      {
        type: 'quote',
        text: "Drowning in summer, gasping in winter — Nepal's energy paradox demands a structural fix, not just more megawatts.",
      },
      {
        type: 'p',
        text: "Pumped storage hydropower (PSH) is built precisely to solve this. During surplus hours, electric pumps push water uphill to an upper reservoir, storing gravitational potential energy. When demand peaks, that water flows back down through turbines on command.",
      },
      { type: 'h2', text: "The World's Oldest Battery, Nepal's Newest Opportunity" },
      {
        type: 'p',
        text: "The technology is elegantly simple. During hours of surplus electricity, pumps move water uphill into an upper reservoir, converting cheap power into gravitational potential energy. When demand peaks and prices spike, that water flows back down through turbines, generating electricity exactly when it is worth the most.",
      },
      {
        type: 'p',
        text: "Modern PSH plants achieve 70–85% round-trip efficiency, operate for 50–100 years with minimal degradation, and can store energy for hours or even days at a stretch. No lithium-ion battery on earth can match that combination of scale, duration, and longevity over a full project life.",
      },
      { type: 'h2', text: 'A Day in the Life of a PSH Plant' },
      {
        type: 'p',
        text: "2:00 AM, surplus hours. Nepal's run-of-river plants are generating at full capacity and demand is low. Instead of curtailing, the plant's pumps activate, pushing water 400 metres uphill into a saddle reservoir above the valley. Every megawatt-hour stored is one that would otherwise have been wasted.",
      },
      {
        type: 'p',
        text: "6:00 PM, peak demand. Homes light up, factories run a final shift, and India's power exchange 200 kilometres south registers peak prices. The plant opens its penstocks, water roars down through the turbines, and it dispatches power at three to five times the price it would have fetched at midnight.",
      },
      {
        type: 'quote',
        text: 'The same water. The same mountain. An entirely different economics.',
      },
      { type: 'h2', text: 'From Price-Taker to Price-Setter' },
      {
        type: 'p',
        text: "Today Nepal operates only Kulekhani I (60 MW) and Kulekhani II (32 MW), historically its sole true storage-type assets — and both were built by Aether Renova's mentors back in the 1970s. Developing modern pumped storage would extend that legacy at a transformative scale.",
      },
      {
        type: 'p',
        text: "NEA has recognised that the next generation of storage is PSH, identifying 156 potential sites nationally and shortlisting 33 with a combined technical potential of 42,000 MW. A plant that absorbs monsoon surplus and re-dispatches it during dry-season peaks doesn't just improve Nepal's economics — it transforms the country's market position. Instead of being a price-taker that sells whatever it generates whenever it generates it, Nepal becomes a dispatchable supplier that can respond to price signals across the region.",
      },
      { type: 'h2', text: 'The Geography Most Countries Would Pay Billions to Create' },
      {
        type: 'p',
        text: "The economics of PSH are dominated by one variable: head — the vertical distance water falls. Most developers around the world spend hundreds of millions of dollars constructing artificial elevation differentials. Nepal's topography provides them for free.",
      },
      {
        type: 'p',
        text: 'A drop of more than 4,000 metres within 150 horizontal kilometres is not just unusual — it is extraordinary. It compresses construction costs, increases the energy stored per cubic metre of water, and opens up sites that simply do not exist in flatter geographies.',
      },
      { type: 'h2', text: 'The Gears Are Finally Moving' },
      {
        type: 'p',
        text: 'For years, the missing piece was not geology or engineering — it was policy. PSH requires a fundamentally different tariff structure than run-of-river power. It needs a power-purchase-agreement framework that prices dispatchability, not just kilowatt-hours. Without that, no project is bankable.',
      },
      {
        type: 'p',
        text: "That is changing. The NEA, with support from the Electricity Regulatory Commission, is now actively developing dedicated PSH policy frameworks, PPA rates, and tariffs. It is arguably the single most important regulatory development in Nepal's energy sector in years, because it converts a technically viable resource into a commercially investable one.",
      },
      { type: 'h2', text: 'A Structural Hedge Against a Changing Climate' },
      {
        type: 'p',
        text: "The climate case only sharpens the urgency. Expert projections suggest Himalayan glaciers could lose 50–80% of their volume by 2100, gradually reducing dry-season river flows. Nepal's wet–dry imbalance — already the defining challenge of its grid — is likely to worsen over the coming decades.",
      },
      {
        type: 'p',
        text: "Pumped storage is Nepal's hedge against that uncertainty. It stores hydrological abundance when rivers run full and releases it precisely when they do not, partially decoupling electricity supply from an increasingly erratic monsoon. The technology is proven across four continents, the sites exist in Nepal's hills, and the policy process has begun. What is needed now is speed of execution — because the next dry season is already coming.",
      },
      { type: 'h2', text: 'We Saw This Coming. We Moved Early.' },
      {
        type: 'p',
        text: 'At Aether, we have been watching Nepal\'s PSH story develop for some time — and we have not just been watching. Our engineering team has been on the ground, evaluating sites, running feasibility assessments, and identifying the projects that combine exceptional head differentials with viable construction corridors and grid access.',
      },
      {
        type: 'p',
        text: 'We have already initiated the process to secure our first pumped-storage project. The site our team has identified is technically compelling — the kind of natural geometry that experienced PSH developers recognise immediately. We are not ready to share full details yet, but the project is real, the process is underway, and the timing is precisely right.',
      },
      {
        type: 'quote',
        text: 'Stay tuned. The mountain battery is coming online.',
      },
    ],
  },
  {
    slug: 'himalayan-winds',
    img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1000&h=600&fit=crop',
    alt: 'Solar panels in Nepal mountains',
    tag: 'Innovation',
    date: 'Jan 15, 2024',
    read: '5 min read',
    title: 'Harnessing Himalayan Winds: The Future of High-Altitude Wind Energy',
    excerpt:
      "Exploring how Nepal's unique topography presents unprecedented opportunities for wind energy generation in previously inaccessible regions.",
    initials: 'RS',
    author: 'Ravi Sharma',
    authorRole: 'Head of Wind Development',
    featured: false,
    body: [
      {
        type: 'p',
        text: "Nepal is defined by its verticality. From the Terai plains to the 8,000-metre peaks of the Himalaya, the country rises faster than almost anywhere on Earth — and that dramatic relief does something remarkable to the wind.",
      },
      {
        type: 'p',
        text: 'As air is forced up and over mountain ridges and funneled through high valleys, it accelerates. These orographic and channeling effects create some of the most energetic, consistent wind resources in South Asia. The challenge has never been whether the wind is there. It is whether we can reach it, measure it, and build for it.',
      },
      { type: 'h2', text: 'The Opportunity Above the Clouds' },
      {
        type: 'p',
        text: 'High-altitude corridors that were historically dismissed as too remote are exactly where the wind is strongest. Ridge lines above 3,000 metres routinely see mean wind speeds that make utility-scale generation viable — often complementing hydropower beautifully, with wind peaking in the dry season precisely when river flows drop.',
      },
      {
        type: 'quote',
        text: 'The wind doesn’t care that a site is hard to reach. Our job is to make the hard-to-reach buildable.',
      },
      { type: 'h2', text: 'Engineering for the Frontier' },
      {
        type: 'p',
        text: 'Building in this terrain demands a different playbook. Turbine logistics over mountain roads, foundations engineered for seismic loads, cold-climate components, and proprietary wind-mapping calibrated for turbulent mountain corridors are all part of how we de-risk these sites before a single blade turns.',
      },
      {
        type: 'list',
        items: [
          'Micro-siting using high-resolution terrain and turbulence modelling',
          'Modular turbine designs suited to constrained access roads',
          'Hybrid wind-hydro planning to balance seasonal generation',
          'Community-first land and benefit-sharing agreements',
        ],
      },
      { type: 'h2', text: 'A Resilient, Diversified Grid' },
      {
        type: 'p',
        text: 'Adding high-altitude wind to Nepal’s energy mix is not just about more megawatts — it is about resilience. A grid that draws on hydro, solar, and wind across different geographies and seasons is far harder to knock offline. That diversity is the foundation of a sustainable, electrified Nepal.',
      },
      {
        type: 'p',
        text: 'The mountains have always shaped life in Nepal. With the right engineering and the right partnerships, they can now help power it too.',
      },
    ],
  },
  {
    slug: 'kusaha-impact',
    img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1000&h=600&fit=crop',
    alt: 'Solar farm workers',
    tag: 'Community',
    date: 'Jan 10, 2024',
    read: '8 min read',
    title: "Powering Remote Villages: Kusaha's Impact on Local Communities",
    excerpt:
      'How our flagship solar installation is transforming lives in Sunsari District through sustainable employment and energy access.',
    initials: 'AP',
    author: 'Anita Poudel',
  },
  {
    slug: 'climate-resilient-infra',
    img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1000&h=600&fit=crop',
    alt: 'Engineering team',
    tag: 'Engineering',
    date: 'Jan 5, 2024',
    read: '6 min read',
    title: 'Building for Tomorrow: Our Approach to Climate-Resilient Infrastructure',
    excerpt:
      "Engineering insights into designing energy infrastructure that withstands Nepal's monsoon seasons and seismic challenges.",
    initials: 'BK',
    author: 'Bikash Koirala',
  },
  {
    slug: 'microgrids-karnali',
    img: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1000&h=600&fit=crop',
    alt: 'Microgrid installation',
    tag: 'Innovation',
    date: 'Dec 28, 2023',
    read: '7 min read',
    title: 'Off-Grid, Not Off-Limits: Bringing Microgrids to Karnali',
    excerpt:
      'A look inside the Highland Microgrid Network and how distributed clean power is reaching Nepal’s most remote communities.',
    initials: 'SK',
    author: 'Sita Karki',
  },
  {
    slug: 'transmission-backbone',
    img: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=1000&h=600&fit=crop',
    alt: 'Transmission lines at dusk',
    tag: 'Grid',
    date: 'Dec 12, 2023',
    read: '5 min read',
    title: 'The Invisible Backbone: Why Transmission Is the Real Bottleneck',
    excerpt:
      'Generation gets the headlines, but moving clean power to where it’s needed is the harder, more important challenge.',
    initials: 'PT',
    author: 'Prakash Thapa',
  },
  {
    slug: 'women-in-energy',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1000&h=600&fit=crop',
    alt: 'Engineer on site',
    tag: 'Community',
    date: 'Nov 30, 2023',
    read: '6 min read',
    title: 'Women Powering the Grid: Building a More Inclusive Energy Workforce',
    excerpt:
      'How our internship and training programs are opening engineering and operations careers to women across Nepal.',
    initials: 'MT',
    author: 'Maya Tamang',
  },
]
