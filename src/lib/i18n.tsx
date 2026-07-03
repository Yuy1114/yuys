import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Locale = 'en' | 'zh'

type Translation = typeof translations.en

type I18nContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
  t: Translation
}

const STORAGE_KEY = 'yuy-site-locale'

const translations = {
  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      notes: 'Notes',
      skills: 'Skills',
      about: 'About',
      language: '中文',
      menu: 'Menu',
    },
    common: {
      featured: 'featured',
      source: 'Source',
      resume: 'Resume',
      downloadResume: 'Download Resume',
      backToNotes: '← Back to notes',
      readNote: 'Read note →',
      noteNotFound: 'Note not found',
      noteNotFoundDescription: 'This Markdown file may have been renamed or removed.',
      builtWith: 'Built with React + daisyUI.',
      minRead: (minutes: string) => `${minutes} min read`,
    },
    home: {
      tagline: 'I want to become a product-minded engineer.',
      intro: 'I do not want my projects to be only technical exercises. I care about starting from real scenarios, breaking down user problems, designing system boundaries, and turning ideas into runnable, verifiable, iterable products.',
      belief: 'For me, code is not the finish line. What matters is who the system helps, whether the workflow actually works, and whether the result can be validated.',
      projectsCta: 'View project',
      aboutCta: 'About me',
      methodTitle: 'What I mean by product-minded engineering',
      methodIntro: 'I use one question to guide my projects: what scenario is worth solving, and what product boundary makes the result clear enough to build and validate?',
      methodItems: [
        ['Real scenario', 'Start from users, problems, workflows, and constraints instead of a feature checklist.'],
        ['Deliverable system', 'Turn the idea into interfaces, data models, frontend flows, deployment notes, and working software.'],
        ['Verifiable result', 'Define what counts as done, what must be accepted, and which boundaries cannot be ignored.'],
      ],
      evidenceTitle: 'A focused product project',
      evidenceSubtitle: 'do-together is centered on one vision: help students discover campus activities and understand how to participate, while keeping the system boundary small enough to validate.',
      proofLabel: 'Focus',
      nowTitle: 'What I am training now',
      nowItems: [
        'Backend fundamentals: Java, Spring Boot, MySQL, Redis, RabbitMQ, WebSocket',
        'Product thinking: user, problem, workflow, acceptance, boundary',
        'AI engineering: context management, agent runtime, tool calling, output evaluation',
      ],
    },
    projects: {
      title: 'Projects',
      subtitle: 'A focused campus participation product: vision, MVP boundary, key decisions, and validation approach.',
      proofLabel: 'Boundary and decisions',
      items: [
        {
          title: 'do-together',
          icon: '💬',
          subtitle: 'Activity-first Campus Participation Platform',
          description: 'A campus participation product that uses Activity as the main object: students discover an activity, understand who it is for and how to join, then complete the actual participation privately outside the system.',
          evidence: 'The product boundary is intentionally small: do-together does not manage organizations, memberships, chat, or sign-up workflows in the MVP. It focuses on whether the activity discovery and participation-information flow is clear, trustworthy, and easy to validate.',
          highlights: [
            'Vision: make campus participation easier to start by surfacing activities and their participation context',
            'MVP boundary: keep User + Activity as the core model and leave organizations, memberships, chat, and registration outside the first version',
            'Access design: use backend authorization as the source of truth so hidden resources stay hidden and direct access is rejected',
            'Validation path: check whether a student can discover an activity, understand the participation method, and act outside the platform',
          ],
          tags: ['Spring Boot', 'React', 'TypeScript', 'MVP Boundary', 'Authorization', 'Manual Acceptance'],
          color: 'primary',
          stats: 'Activity-first MVP · Boundary control · Manual acceptance',
          github: 'https://github.com/Yuy1114/do-together',
        },
      ],
    },
    skills: {
      title: 'Skills',
      subtitle: 'Not just a stack list. These are the abilities I am using to turn real problems into deliverable systems.',
      capabilityTitle: 'Capability model',
      capabilitySubtitle: 'The skills I care about most are the ones that help me understand a scenario, build the system, validate the result, and work with AI responsibly.',
      capabilityItems: [
        ['Product understanding', 'User, problem, workflow, MVP boundary, user story, acceptance criteria, and project retrospective.'],
        ['Backend engineering', 'Java, Spring Boot, MySQL, Redis, RabbitMQ, WebSocket, API design, data modeling, and system boundaries.'],
        ['Delivery and validation', 'Manual acceptance, bug notes, readable docs, deployment awareness, debugging, and explaining trade-offs.'],
        ['AI collaboration', 'Context management, agent runtime, tool calling, memory, traceability, output review, and AI-assisted architecture checks.'],
      ],
      stackTitle: 'Technology stack',
      stackSubtitle: 'Tools I can use today, plus the areas I am still deepening through projects.',
      currentlyDeepening: 'Currently deepening',
      learningSubtitle: 'Current P0 items for internship readiness and project depth',
      levels: ['Learning', 'Beginner', 'Competent', 'Proficient', 'Expert'],
      learning: [
        'Java fundamentals: collections, concurrency, thread pools, JVM basics',
        'Spring Boot internals: IOC, AOP, bean lifecycle, transaction boundaries',
        'MySQL: B+Tree indexes, transaction isolation, MVCC, query reasoning',
        'Redis / RabbitMQ: caching, online state, queues, delivery semantics',
        'Product engineering: MVP scope, acceptance criteria, manual validation',
        'AI Agent Runtime: context, prompt builder, tool calling, memory, trace',
      ],
    },
    about: {
      title: 'About',
      subtitle: 'Why I build this way, how I work, and what I am training next.',
      hey: '👋 Hey there',
      bio1: 'I am Yuy, a developer training myself to become a product-minded engineer. Backend engineering is my main track, but I do not want to stop at implementing features.',
      bio2: 'I care about why a system is worth building, who it serves, whether the workflow actually works, and whether the engineering result can be validated.',
      shiftTitle: 'From technical practice to product judgment',
      shiftText: 'I used to think of projects mostly as technical practice: what framework I used, what features I implemented, and whether the app could run. Over time, I started to care more about who the system serves, where the boundary should stop, and how the result can be validated.',
      philosophyTitle: '💭 How I build projects',
      philosophy: [
        ['Start from the user and workflow', 'Before choosing the implementation, I try to define who the user is, where the problem appears, and what flow should change.'],
        ['Keep the MVP small enough to verify', 'I would rather build a smaller system with clear boundaries than a large demo that is hard to explain.'],
        ['Turn features into acceptance criteria', 'A feature is not finished just because it compiles. It should have a clear way to judge whether it works.'],
        ['Record bugs and iterate from feedback', 'Manual acceptance, bug notes, and small fixes are part of the product loop, not cleanup after the real work.'],
      ],
      workTitle: '🔧 What I am training now',
      workItems: [
        ['Backend engineering', 'Java, Spring Boot, MySQL, Redis, RabbitMQ, WebSocket, and the system boundaries behind them.'],
        ['Product judgment', 'User, problem, workflow, MVP scope, acceptance criteria, and project retrospectives.'],
        ['AI engineering', 'Agent runtime, context management, tool calling, memory, traceability, and output evaluation.'],
        ['Delivery habits', 'Readable docs, manual validation, deployment awareness, and the ability to explain trade-offs.'],
      ],
      contactTitle: '📬 Get in Touch',
      contactText: 'I am looking for backend, full-stack, or AI application internship opportunities. I hope to join a team where I can work on real problems, understand the context, deliver results, and improve through feedback.',
    },
    notes: {
      label: 'Blog / Notes',
      title: 'Learning notes, project logs, and messy thoughts.',
      subtitle: 'A lightweight Markdown-powered notebook for technical notes, learning reviews, and blog-style writeups.',
    },
  },
  zh: {
    nav: {
      home: '首页',
      projects: '项目',
      notes: '笔记',
      skills: '技能',
      about: '关于',
      language: 'EN',
      menu: '菜单',
    },
    common: {
      featured: '重点',
      source: '源码',
      resume: '简历',
      downloadResume: '下载简历',
      backToNotes: '← 返回笔记',
      readNote: '阅读全文 →',
      noteNotFound: '没找到这篇笔记',
      noteNotFoundDescription: '这个 Markdown 文件可能被重命名或删除了。',
      builtWith: '使用 React + daisyUI 构建。',
      minRead: (minutes: string) => `${minutes} 分钟阅读`,
    },
    home: {
      tagline: '我想成为一名产品型工程师。',
      intro: '我不希望项目只是技术练习，而是希望它从真实场景出发：拆解用户问题，设计系统边界，并把想法交付成可运行、可验证、可迭代的产品。',
      belief: '对我来说，代码不是终点。真正重要的是，这个系统解决了谁的问题，流程是否走得通，以及结果能不能被验证。',
      projectsCta: '查看项目',
      aboutCta: '关于我',
      methodTitle: '我理解的产品型工程师',
      methodIntro: '我会用一个问题来约束项目：什么场景值得解决，而怎样的产品边界能让结果足够清楚、可实现、可验证？',
      methodItems: [
        ['真实场景', '不是从功能列表开始，而是先弄清楚用户是谁、问题发生在哪里、当前流程为什么不顺。'],
        ['可交付系统', '不是只让代码在本地跑起来，而是把想法落到接口、数据模型、页面流程、部署说明和可运行的软件里。'],
        ['可验证结果', '不是“我觉得做完了”，而是提前定义什么算完成、什么算验收通过、哪些边界条件不能忽略。'],
      ],
      evidenceTitle: '一个聚焦的产品项目',
      evidenceSubtitle: 'do-together 围绕一个清楚的 vision：帮助学生发现校园 Activity，并理解如何参与；同时把系统边界收小到可以验证。',
      proofLabel: '项目重点',
      nowTitle: '我现在正在训练的能力',
      nowItems: [
        '后端基本功：Java、Spring Boot、MySQL、Redis、RabbitMQ、WebSocket',
        '产品判断：用户、问题、流程、验收、边界',
        'AI Engineering：上下文管理、Agent Runtime、工具调用、输出评估',
      ],
    },
    projects: {
      title: '项目',
      subtitle: '一个聚焦的校园参与产品：展示它的 vision、MVP 边界、关键取舍和验证方式。',
      proofLabel: '边界与取舍',
      items: [
        {
          title: 'do-together',
          icon: '💬',
          subtitle: 'Activity-first 校园参与平台',
          description: '一个以 Activity 为主对象的校园参与产品：学生发现 Activity，理解它适合谁、如何参与，然后在系统外完成真实参与。',
          evidence: '产品边界刻意保持很小：MVP 不管理组织、Membership、聊天或报名流程，而是专注于 Activity 发现和参与信息是否清楚、可信、可验证。',
          highlights: [
            'Vision：降低学生开始参与校园活动的门槛，让 Activity 和参与上下文先被看见',
            'MVP 边界：保留 User + Activity 作为核心模型，组织、Membership、聊天和报名暂不进入第一版',
            '访问设计：以后端授权作为事实来源，隐藏资源不出现在列表里，直接访问也应被拒绝',
            '验证路径：确认学生能发现 Activity、理解参与方式，并在平台外完成真实参与',
          ],
          tags: ['Spring Boot', 'React', 'TypeScript', 'MVP 边界', '后端授权', '手动验收'],
          color: 'primary',
          stats: 'Activity-first MVP · 边界控制 · 手动验收',
          github: 'https://github.com/Yuy1114/do-together',
        },
      ],
    },
    skills: {
      title: '技能',
      subtitle: '不只是技术栈列表，而是我如何把真实问题做成可交付系统的能力模型。',
      capabilityTitle: '能力模型',
      capabilitySubtitle: '我最看重的能力，是能帮助我理解场景、交付系统、验证结果，并负责地使用 AI。',
      capabilityItems: [
        ['产品理解', '用户、问题、流程、MVP 边界、用户故事、验收标准和项目复盘。'],
        ['后端工程', 'Java、Spring Boot、MySQL、Redis、RabbitMQ、WebSocket、接口设计、数据建模和系统边界。'],
        ['交付与验证', '手动验收、bug 记录、可读文档、部署意识、排错能力和技术取舍表达。'],
        ['AI 协作', '上下文管理、Agent Runtime、工具调用、记忆、Trace、输出审核和 AI 辅助架构检查。'],
      ],
      stackTitle: '技术栈',
      stackSubtitle: '目前能用来做项目的工具，以及正在通过项目继续深挖的方向。',
      currentlyDeepening: '当前深挖',
      learningSubtitle: '为实习准备和项目深度补强服务的 P0 内容',
      levels: ['学习中', '入门', '能用', '熟练', '深入'],
      learning: [
        'Java 基础：集合、并发、线程池、JVM 基础',
        'Spring Boot 内部机制：IOC、AOP、Bean 生命周期、事务边界',
        'MySQL：B+Tree 索引、事务隔离、MVCC、查询推理',
        'Redis / RabbitMQ：缓存、在线状态、队列、投递语义',
        '产品工程：MVP 范围、验收标准、手动验证',
        'AI Agent Runtime：Context、PromptBuilder、Tool Calling、Memory、Trace',
      ],
    },
    about: {
      title: '关于',
      subtitle: '我为什么这样做项目、如何工作，以及下一阶段正在训练什么。',
      hey: '👋 嗨，我是 Yuy',
      bio1: '我是 Yuy，一个正在把自己训练成产品型工程师的开发者。我以后端为主线，但不希望自己只停留在“会写功能”的层面。',
      bio2: '我更关心一个系统为什么值得做，用户是谁，流程是否真的走得通，以及工程实现能不能被验证。',
      shiftTitle: '从技术练习到产品判断',
      shiftText: '以前我也很容易把项目理解成技术练习：用了什么框架，实现了什么功能，能不能跑起来。后来我逐渐更关心它服务谁、边界应该停在哪里，以及结果要怎样被验证。',
      philosophyTitle: '💭 我如何做项目',
      philosophy: [
        ['先从用户和流程开始', '在决定技术怎么落地之前，先弄清楚用户是谁、问题出现在哪里、系统要改变哪一段流程。'],
        ['把 MVP 收到能验收的大小', '我更愿意先做一个边界清楚、能跑、能验收的小系统，而不是一个很大但讲不清楚的 demo。'],
        ['把功能写成验收标准', '功能不是编译通过就算完成，而是要能判断它是否真的解决了预设问题。'],
        ['用反馈继续迭代', '手动验收、bug 记录和修复复盘不是收尾工作，而是产品闭环的一部分。'],
      ],
      workTitle: '🔧 我现在正在训练的能力',
      workItems: [
        ['后端工程', 'Java、Spring Boot、MySQL、Redis、RabbitMQ、WebSocket，以及这些技术背后的系统边界。'],
        ['产品判断', '用户、问题、流程、MVP 范围、验收标准和项目复盘。'],
        ['AI Engineering', 'Agent Runtime、上下文管理、工具调用、记忆、Trace 和输出评估。'],
        ['交付习惯', '可读文档、手动验证、部署意识，以及解释技术取舍的能力。'],
      ],
      contactTitle: '📬 联系我',
      contactText: '我正在寻找后端 / 全栈 / AI 应用方向的实习机会。希望加入一个愿意让新人接触真实问题的团队：不仅写代码，也能理解上下文、参与设计、交付结果，并在反馈中继续改进。',
    },
    notes: {
      label: '博客 / 笔记',
      title: '学习笔记、项目记录，还有一点乱七八糟的想法。',
      subtitle: '一个轻量的 Markdown 笔记页，用来展示技术笔记、复盘和博客式记录。',
    },
  },
}

const I18nContext = createContext<I18nContextValue | null>(null)

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'en'
  const storedLocale = window.localStorage.getItem(STORAGE_KEY)
  if (storedLocale === 'en' || storedLocale === 'zh') return storedLocale
  return window.navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale)

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale)
  }

  const value = useMemo<I18nContextValue>(() => ({
    locale,
    setLocale,
    toggleLocale: () => setLocale(locale === 'en' ? 'zh' : 'en'),
    t: translations[locale],
  }), [locale])

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
    window.localStorage.setItem(STORAGE_KEY, locale)
  }, [locale])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used within I18nProvider')
  return context
}
