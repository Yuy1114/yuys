import { createFileRoute } from '@tanstack/react-router'
import { useI18n } from '../lib/i18n'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  const { t } = useI18n()

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-12 max-w-3xl">
        <h1 className="text-4xl font-bold mb-3">{t.about.title}</h1>
        <p className="text-base-content/60 text-lg leading-relaxed">
          {t.about.subtitle}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          <div className="card bg-base-200 border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-xl mb-3">{t.about.hey}</h2>
              <div className="space-y-4 text-base-content/70 leading-relaxed">
                <p>{t.about.bio1}</p>
                <p>{t.about.bio2}</p>
              </div>
            </div>
          </div>

          <div className="card bg-base-200 border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-xl mb-3">{t.about.shiftTitle}</h2>
              <p className="text-base-content/70 leading-relaxed">
                {t.about.shiftText}
              </p>
            </div>
          </div>

          <div className="card bg-base-200 border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-xl mb-3">{t.about.philosophyTitle}</h2>
              <ul className="space-y-4 text-base-content/70">
                {t.about.philosophy.map(([title, description], index) => (
                  <li key={title} className="flex gap-3">
                    <span className="text-primary font-bold font-mono">{String(index + 1).padStart(2, '0')}</span>
                    <span><strong>{title}</strong> — {description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="card bg-base-200 border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-xl mb-3">{t.about.workTitle}</h2>
              <div className="space-y-4">
                {t.about.workItems.map(([title, description]) => (
                  <div key={title} className="rounded-box bg-base-100/60 border border-base-300 p-4">
                    <h3 className="font-semibold text-sm mb-1">{title}</h3>
                    <p className="text-xs text-base-content/55 leading-relaxed">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card bg-base-200 border border-base-300">
            <div className="card-body text-center">
              <h2 className="card-title text-xl mb-2 justify-center">{t.about.contactTitle}</h2>
              <p className="text-base-content/55 mb-6 leading-relaxed">
                {t.about.contactText}
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <a
                  href="mailto:Zhi_Yuzzz@outlook.com"
                  className="btn btn-primary"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Outlook
                </a>
                <a
                  href="mailto:c4llm3Jade@gmail.com"
                  className="btn btn-outline"
                >
                  Gmail
                </a>
                <a
                  href="https://github.com/Yuy1114"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
                <a
                  href="/resume.pdf"
                  className="btn btn-soft btn-primary"
                >
                  {t.common.downloadResume}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
