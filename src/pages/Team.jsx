import SynergyBackground from '../components/SynergyBackground'
import Button from '../components/Button'

const Eyebrow = ({ children, center }) => (
  <p
    className={`text-aether-accent uppercase tracking-[0.25em] text-sm font-semibold mb-6 flex items-center gap-4 ${
      center ? 'justify-center' : ''
    }`}
  >
    <span className="w-12 h-[1px] bg-aether-accent/60" />
    {children}
    {center && <span className="w-12 h-[1px] bg-aether-accent/60" />}
  </p>
)

const LinkedInIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
)

const leadership = [
  {
    name: 'Puja Chand Thakur',
    role: 'Managing Director & Chairperson',
    bio: 'Sets the vision and direction of the group, steering Aether Renova’s long-term strategy and growth.',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&h=700&fit=crop',
  },
  {
    name: 'Kirti Chand Thakur',
    role: 'Chief Advisor & Head of Engineering',
    bio: 'Guides strategic decisions and leads engineering excellence across all of the group’s projects.',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&h=700&fit=crop',
  },
  {
    name: 'Karan Chand',
    role: 'Chief Financial Officer',
    bio: 'Oversees the group’s financial strategy, capital structure, and community-ownership models.',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&h=700&fit=crop',
  },
  {
    name: 'Dhiraj Bhohara',
    role: 'Chief Engineer & Head of Engineering',
    bio: 'Leads technical delivery from design through commissioning across hydro, solar, and grid works.',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&h=700&fit=crop',
  },
]

const team = [
  {
    name: 'Purna Nand Joshi',
    role: 'Director of Liaison & Government Relations',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&h=600&fit=crop',
  },
  {
    name: 'Prakash Thapa',
    role: 'Office Manager',
    image:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=500&h=600&fit=crop',
  },
  {
    name: 'Dipendra Bahadur Kadyat',
    role: 'Civil Engineer',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=500&h=600&fit=crop',
  },
  {
    name: 'Parash Bahadur Singh',
    role: 'Assistant Engineer',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500&h=600&fit=crop',
  },
  {
    name: 'Siddhartha Singh',
    role: 'Account & HR Officer',
    image:
      'https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=500&h=600&fit=crop',
  },
  {
    name: 'Keshav Raj Malla Thakuri',
    role: 'Administrative & Procurement Officer',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=500&h=600&fit=crop',
  },
  {
    name: 'Ram Thapa',
    role: 'Office Assistant & Support Staff',
    image:
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=500&h=600&fit=crop',
  },
  {
    name: 'Dhan Bahadur Basnet',
    role: 'Company Chef & Catering Officer',
    image:
      'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=500&h=600&fit=crop',
  },
  {
    name: 'Sudip Shamsher Rana',
    role: 'Site Manager',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=500&h=600&fit=crop',
  },
  {
    name: 'Tanisi Chand',
    role: 'Head of Marketing & Creative',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=500&h=600&fit=crop',
  },
  {
    name: 'Samina Rana',
    role: 'Asst. Brand Manager',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=500&h=600&fit=crop',
  },
  {
    name: 'Shrijana Shrestha',
    role: 'Office Manager',
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&h=600&fit=crop',
  },
]

function LeaderCard({ person }) {
  return (
    <div className="group relative bg-aether-card border border-aether-border rounded-2xl overflow-hidden transition-all duration-500 hover:border-aether-accent/40 hover:-translate-y-1">
      <div className="relative h-72 overflow-hidden">
        <img
          src={person.image}
          alt={person.name}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-aether-card via-transparent to-transparent" />
        <a
          href={person.linkedin || '#'}
          aria-label={`${person.name} on LinkedIn`}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur border border-aether-border flex items-center justify-center text-aether-muted opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-aether-accent hover:border-aether-accent/50"
        >
          <LinkedInIcon />
        </a>
      </div>
      <div className="p-6">
        <h3 className="text-white text-lg font-bold leading-tight">
          {person.name}
        </h3>
        <p className="text-aether-accent text-sm font-medium mb-3">
          {person.role}
        </p>
        <p className="text-aether-muted text-sm leading-relaxed">{person.bio}</p>
      </div>
    </div>
  )
}

function MemberCard({ person }) {
  return (
    <div className="group relative rounded-2xl overflow-hidden border border-aether-border">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={person.image}
          alt={person.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
        <a
          href={person.linkedin || '#'}
          aria-label={`${person.name} on LinkedIn`}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur border border-aether-border flex items-center justify-center text-aether-muted opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-aether-accent hover:border-aether-accent/50"
        >
          <LinkedInIcon />
        </a>
        <div className="absolute bottom-0 inset-x-0 p-5">
          <h3 className="text-white text-base font-bold leading-tight">
            {person.name}
          </h3>
          <p className="text-aether-accent text-xs font-medium mt-1">
            {person.role}
          </p>
        </div>
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-aether-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  )
}

export default function Team() {
  return (
    <main className="relative bg-[#020203] font-sans">
      {/* ── Hero ───────────────────────────────── */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-[#020203]">
        <SynergyBackground />
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(0,240,152,0.12)_0%,_transparent_65%)]" />
        </div>
        <div className="absolute left-0 right-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#020203] pointer-events-none z-[1]" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <Eyebrow center>The People</Eyebrow>
          <h1 className="text-white text-5xl md:text-7xl font-medium tracking-tight mb-6">
            Our Team
          </h1>
          <p className="text-aether-muted text-lg md:text-xl leading-relaxed">
            Engineers, builders, and community leaders united by one mission —
            powering a sustainable, electrified Nepal.
          </p>
        </div>
      </section>

      {/* ── Leadership ─────────────────────────── */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <Eyebrow center>Leadership</Eyebrow>
            <h2 className="text-white text-3xl md:text-5xl font-medium tracking-tight">
              Guiding the Vision
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((p) => (
              <LeaderCard key={p.name} person={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Team grid ──────────────────────────── */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <Eyebrow center>The Team</Eyebrow>
            <h2 className="text-white text-3xl md:text-5xl font-medium tracking-tight">
              The People Behind the Power
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {team.map((p) => (
              <MemberCard key={p.name} person={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Join us CTA ────────────────────────── */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Eyebrow center>Join Us</Eyebrow>
          <h2 className="text-white text-3xl md:text-4xl font-medium tracking-tight mb-5">
            We’re always looking for great people
          </h2>
          <p className="text-aether-muted text-lg mb-8">
            From engineering to community work, explore how you can help build
            Nepal’s energy future.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/careers" variant="primary">
              View Open Roles
            </Button>
            <Button href="/about" variant="secondary" withArrow={false}>
              About the Company
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
