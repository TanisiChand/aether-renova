import Hero from '../components/Hero'
import ProjectStatus from '../components/ProjectStatus'
import Synergy from '../components/Synergy'
import WhoAreWe from '../components/WhoAreWe'
import CommunityImpact from '../components/CommunityImpact'
import InvestCTA from '../components/InvestCTA'
import FromTheGrid from '../components/FromTheGrid'
import EnergyLandscape from '../components/EnergyLandscape'

export default function Home() {
  return (
    <>
      <Hero />
      <WhoAreWe />
      <Synergy />
      <ProjectStatus />
      <CommunityImpact />
      <InvestCTA />
      {/* "From The Grid" hidden on mobile, shown on tablet/desktop */}
      <div className="hidden md:block">
        <FromTheGrid />
      </div>
      {/* Animated energy value-chain panorama — desktop/tablet only */}
      <div className="hidden md:block">
        <EnergyLandscape />
      </div>
    </>
  )
}
