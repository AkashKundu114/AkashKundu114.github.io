import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { skills } from '../data/skills'
import PageTransition from '../components/PageTransition'

export default function Home() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <PageTransition>
      <section className="hero-grid relative min-h-screen flex items-center overflow-hidden" style={{ paddingTop: '6rem' }}>
        <div className="container">
          <div className="relative z-10 max-w-3xl">
            <div className="fade-up inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-mono uppercase mb-8"
              style={{ background:'var(--accent-dim)', borderColor:'rgba(79,163,255,0.22)', color:'var(--accent)', fontSize:'0.66rem', letterSpacing:'0.12em' }}>
              <span style={{ fontSize:'0.42rem', animation:'blink 1.6s infinite' }}>●</span>
              Available for Internship — Kolkata, India
            </div>
            <h1 className="fade-up d1 mb-7">Turning<br /><em style={{ color:'var(--accent)', fontStyle:'normal' }}>raw data</em><br />into insight.</h1>
            <p className="fade-up d2 mb-9" style={{ fontSize:'1.05rem', maxWidth:'52ch', color:'var(--muted)', lineHeight:1.75 }}>
              B.Tech CSE student at Techno India University with a passion for data analytics, AI-driven applications, and building tools that solve real-world problems.
            </p>
            <div className="fade-up d3 flex flex-wrap gap-3 mb-6">
              <Link to="/projects" className="btn btn-primary">View Projects →</Link>
              <Link to="/contact"  className="btn btn-outline">Get in Touch</Link>
              <a href="/cv/AkashKundu_CV.pdf" download className="btn btn-outline">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 16l-6-6h4V4h4v6h4l-6 6zm-6 2h12v2H6v-2z"/></svg>
                Download CV
              </a>
            </div>
            <div className="fade-up d4 flex flex-wrap gap-2 mb-14">
              {[
                { href:'https://www.linkedin.com/in/akashkundu114/', label:'LinkedIn' },
                { href:'https://github.com/AkashKundu114',           label:'GitHub' },
                { href:'mailto:akashkundu7487@gmail.com',             label:'Email' },
              ].map(({ href, label }) => (
                <a key={label} href={href} target={href.startsWith('http')?'_blank':undefined} rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono uppercase rounded border transition-all duration-200"
                  style={{ color:'var(--muted)', borderColor:'var(--border)', padding:'0.38rem 0.75rem', fontSize:'0.62rem', letterSpacing:'0.1em' }}
                  onMouseEnter={e=>{ e.currentTarget.style.color='var(--accent)'; e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.background='var(--accent-dim)' }}
                  onMouseLeave={e=>{ e.currentTarget.style.color='var(--muted)'; e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='transparent' }}
                >{label}</a>
              ))}
            </div>
            <div className="fade-up d5 flex flex-wrap gap-10" style={{ paddingTop:'2.5rem', borderTop:'1px solid var(--border)' }}>
              {[
                { num:'5+',  label:'Projects Built' },
                { num:'16+', label:'Technologies' },
                { num:'6+',  label:'Certifications' },
                { num:"'27", label:'Graduating' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <span className="block font-display font-bold" style={{ fontSize:'2rem', color:'var(--ink)' }}>{num}</span>
                  <span className="block font-mono uppercase" style={{ fontSize:'0.6rem', letterSpacing:'0.12em', color:'var(--muted)' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="relative z-10" style={{ padding:'4rem 0', borderTop:'1px solid var(--border)' }}>
        <div className="container">
          <div className="label">Technologies</div>
          <div className="flex flex-wrap gap-2">
            {skills.map(sk => <span key={sk.id} className="skill-tag">{sk.name}</span>)}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
