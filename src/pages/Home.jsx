import Hero from '../components/Hero'
import ProjectStatus from '../components/ProjectStatus'
import Synergy from '../components/Synergy'
import WhoAreWe from '../components/WhoAreWe'
import CommunityImpact from '../components/CommunityImpact'
import InvestCTA from '../components/InvestCTA'
import FromTheGrid from '../components/FromTheGrid'

export default function Home() {
  return (
    <>
      <Hero />
      <WhoAreWe />
      <Synergy />
      <CommunityImpact />
      <ProjectStatus />
      <InvestCTA />
      <FromTheGrid />
    </>
  )
}
