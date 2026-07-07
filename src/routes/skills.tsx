import { Link, createFileRoute } from '@tanstack/react-router'
import { useI18n } from '../lib/i18n'

export const Route = createFileRoute('/skills')({
  component: Skills,
})

function Skills() {
  const { t } = useI18n()

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-14 max-w-3xl">
        <h1 className="text-4xl font-bold mb-3">{t.skills.title}</h1>
        <p className="text-base-content/60 text-lg leading-relaxed">
          {t.skills.subtitle}
        </p>
      </div>

      {/* Act 1 — the claim */}
      <section className="mb-16">
        <div className="mb-6 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">Capability</p>
          <h2 className="text-3xl font-bold mb-3">{t.skills.capabilityTitle}</h2>
          <p className="text-base-content/60 leading-relaxed">
            {t.skills.capabilitySubtitle}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {t.skills.capabilityItems.map(([title, description], index) => (
            <div key={title} className="card bg-base-200 border border-base-300">
              <div className="card-body">
                <span className="text-primary font-mono text-sm">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="card-title text-lg">{title}</h3>
                <p className="text-sm text-base-content/60 leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Act 2 — the proof */}
      <section className="mb-16">
        <div className="mb-6 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">Evidence</p>
          <h2 className="text-3xl font-bold mb-3">{t.skills.proofTitle}</h2>
          <p className="text-base-content/60 leading-relaxed">
            {t.skills.proofSubtitle}
          </p>
        </div>
        <div className="space-y-4">
          {t.skills.proofLanes.map((lane) => (
            <Link
              key={lane.capability}
              to="/projects"
              className="group card bg-base-200 border border-base-300 hover:border-primary/50 hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="card-body gap-4 md:flex-row md:items-center">
                <div className="md:flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-xs text-primary">◆</span>
                    <h3 className="text-lg font-bold">{lane.capability}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {lane.tools.map((tool) => (
                      <span key={tool} className="badge badge-soft badge-sm">{tool}</span>
                    ))}
                  </div>
                  <p className="text-sm text-base-content/60 leading-relaxed">{lane.evidence}</p>
                </div>
                <div className="md:w-52 md:shrink-0 md:border-l md:border-base-300 md:pl-6">
                  <p className="text-xs uppercase tracking-wide text-base-content/40 mb-2">
                    {t.skills.evidenceLabel}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{lane.icon}</span>
                    <span className="font-semibold leading-tight">{lane.project}</span>
                    <span className="text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
