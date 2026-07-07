import { Link, createFileRoute } from '@tanstack/react-router'
import { useI18n } from '../lib/i18n'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const { t } = useI18n()

  return (
    <div className="px-4 py-12">
      <section className="hero min-h-[calc(100vh-12rem)]">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <div className="avatar mb-8">
              <div className="w-32 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                <div className="avatar-placeholder bg-neutral text-neutral-content flex items-center justify-center text-4xl font-bold h-full w-full rounded-full">
                  Y
                </div>
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-2">
              <span className="text-primary">Yuy</span>
            </h1>

            <p className="text-2xl text-base-content/80 mb-6 font-medium">
              {t.home.tagline}
            </p>
            <p className="text-base-content/70 mb-4 max-w-2xl mx-auto leading-relaxed">
              {t.home.intro}
            </p>
            {t.home.belief && (
              <p className="text-base-content/60 mb-8 max-w-2xl mx-auto leading-relaxed">
                {t.home.belief}
              </p>
            )}
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/projects" className="btn btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                </svg>
                {t.home.projectsCta}
              </Link>
              <Link to="/skills" className="btn btn-soft btn-primary">
                {t.nav.skills}
              </Link>
              <a href="/resume.pdf" className="btn btn-soft btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 5a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L8 10.586V7z" clipRule="evenodd" />
                </svg>
                {t.common.resume}
              </a>
              <Link to="/about" className="btn btn-outline">
                {t.home.aboutCta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto py-12">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">Product-minded engineering</p>
          <h2 className="text-3xl font-bold mb-3">{t.home.methodTitle}</h2>
          <p className="text-base-content/60 leading-relaxed">{t.home.methodIntro}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {t.home.methodItems.map(([title, description], index) => (
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

      <section className="max-w-5xl mx-auto py-12">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">Project focus</p>
          <h2 className="text-3xl font-bold mb-3">{t.home.evidenceTitle}</h2>
          <p className="text-base-content/60 leading-relaxed">{t.home.evidenceSubtitle}</p>
        </div>
        <div className="grid gap-5 max-w-3xl">
          {t.projects.items.map((project) => (
            <Link
              key={project.title}
              to="/projects"
              className="card bg-base-200 border border-base-300 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="card-body">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{project.icon}</span>
                  <div>
                    <h3 className="font-bold leading-tight">{project.title}</h3>
                    <p className="text-xs text-base-content/50">{project.subtitle}</p>
                  </div>
                </div>
                <div className="badge badge-soft badge-primary badge-sm w-fit">{t.home.proofLabel}</div>
                <p className="text-sm text-base-content/65 leading-relaxed">{project.evidence}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="badge badge-soft badge-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto py-12">
        <div className="card bg-base-200 border border-base-300">
          <div className="card-body md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">Now</p>
              <h2 className="card-title text-3xl mb-3">{t.home.nowTitle}</h2>
              <div className="space-y-2">
                {t.home.nowItems.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-base-content/70">
                    <span className="text-primary mt-0.5">▶</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link to="/skills" className="btn btn-outline btn-sm">{t.nav.skills}</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
