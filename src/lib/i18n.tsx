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
      tagline: 'I am training to become a product-minded engineer who can deliver full-stack systems, with backend as my main track.',
      intro: 'By product-minded, I mean starting from users, scenarios, workflows, and acceptance instead of a feature checklist. To make those ideas real, I am building with Java, Spring Boot, MySQL, Redis, RabbitMQ, React, TypeScript, and AI application tools.',
      belief: '',
      projectsCta: 'View project',
      aboutCta: 'About me',
      methodTitle: 'What I mean by product-minded engineering',
      methodIntro: 'I use one question to guide my projects: what scenario is worth solving, and what product boundary makes the result clear enough to build and validate?',
      methodItems: [
        ['Real scenario', 'Start from users, problems, workflows, and constraints instead of a feature checklist.'],
        ['Deliverable system', 'Turn the scenario into backend models, API boundaries, frontend flows, UI states, deployment notes, and runnable software.'],
        ['Verifiable result', 'Define what counts as done, what must be accepted, and which boundaries cannot be ignored.'],
      ],
      evidenceTitle: 'Projects I am building',
      evidenceSubtitle: 'I use projects to connect backend systems, frontend flows, AI capabilities, and real product scenarios.',
      proofLabel: 'Focus',
      nowTitle: 'Current focus',
      nowItems: [
        'Backend track: Java, Spring Boot, MySQL, Redis, RabbitMQ, concurrency, and system boundaries',
        'Full-stack delivery: React / TypeScript flows, UI states, API integration, and acceptance paths',
        'AI application engineering: Mastra agents, RAG, tool calling, HITL proposals, audit, and recovery',
      ],
    },
    projects: {
      title: 'Projects',
      subtitle: '',
      proofLabel: 'Boundary and decisions',
      items: [
        {
          title: 'Apothecary Agent',
          icon: '🧠',
          subtitle: 'Mastra-native Personal Knowledge Base Maintenance Agent',
          description: 'A desktop AI application for maintaining a local Markdown knowledge vault. It combines a React / Electron interface with a Mastra-based agent backend that can understand file changes, propose safe updates, and keep an agent-owned semantic layer in sync.',
          evidence: 'The project is built around a review-before-apply loop: the agent watches vault changes, analyzes their meaning, creates structured proposals, waits for approval, applies accepted changes, and records what happened for audit and recovery.',
          highlights: [
            'Scenario: personal Markdown notes rot over time — stale, duplicated, contradictory — and manual upkeep is costly. This agent keeps the vault trustworthy and searchable for you.',
            'Task boundary & human approval: the agent never silently edits your notes. Every write to the human-readable layer becomes a reviewable proposal, applied only after you approve, with approval/rejection records and a reversible operation ledger.',
            'Context & semantic layer: it separates the human-readable Markdown vault from the agent-owned semantic layer (.agent + LibSQL vector search), giving the agent stable context while keeping indexes out of the notes you actually read.',
            'Tools & workflow orchestration: Mastra splits capture, inbox triage, merge/archive, and view generation into tools and workflows with clear boundaries — every step has explicit input, output, failure, and permission.',
            'Delivery & verification: an Electron + React desktop app covers conversation, change queue, proposal review, knowledge profile, and diagnostics; a deterministic acceptance suite covers capture, sync, merge, recovery, and ledger consistency, so behavior is reproducible.',
          ],
          tags: ['Mastra', 'TypeScript', 'Electron', 'RAG', 'LibSQL', 'HITL Review', 'Audit Log'],
          color: 'primary',
          github: 'https://github.com/Yuy1114/apothecary-agent',
        },
        {
          title: 'do-together',
          icon: '💬',
          subtitle: 'Activity-first Campus Participation Platform',
          description: 'A backend-first full-stack campus activity product. Students browse activities, understand who they are for and how to join, while the system keeps the first version focused on discovery, visibility, and access control.',
          evidence: 'The engineering focus is a small but complete product loop: Spring Boot APIs, MySQL data modeling, backend authorization, React pages, and manual acceptance around whether activity discovery and participation information actually work.',
          highlights: [
            'Scenario: students keep missing campus activities that would fit them — information is scattered, and it is unclear who an activity is for or how to join. do-together makes activities discoverable and understandable first.',
            'Product boundary: the first version keeps only User + Activity as the core model, leaving organizations, memberships, chat, and registration for later, so the scope stays small enough to accept.',
            'Engineering design: backend authorization is the source of truth — hidden activities never appear in listings and direct URL access is rejected, instead of relying on the frontend to hide them.',
            'Delivery: Spring Boot APIs + MySQL data modeling + React pages close a full loop from data to interface.',
            'Validation: manual acceptance along the user path — can a student discover an activity, understand how to participate, and complete it outside the platform.',
          ],
          tags: ['Spring Boot', 'React', 'TypeScript', 'MySQL', 'Authorization', 'MVP Scope'],
          color: 'primary',
          github: 'https://github.com/Yuy1114/do-together',
        },
        {
          title: 'edu-flow-ai',
          icon: '📚',
          subtitle: 'Intelligent Timetabling Platform for Education Administration',
          description: 'An intelligent scheduling system for education administration. It turns teachers, classes, classrooms, courses, and time slots into computable scheduling tasks, then generates timetable templates through an ML-assisted Python scheduling pipeline.',
          evidence: 'The project separates product and scheduling responsibilities: the Java backend manages tasks, schemes, persistence, permissions, and progress feedback, while the Python pipeline builds task patterns, scores room-slot candidates, fills weekly templates, validates conflicts, and exports database-ready drafts.',
          highlights: [
            'Scenario: school timetabling across teachers, classes, classrooms, courses, time slots, hard constraints, and soft preferences',
            'Scheduling pipeline: historical timetable import, task-pattern extraction, ML-based room-slot scoring, greedy template cover, conflict validation, and database draft export',
            'AI role: ML scores room-slot candidates and suggests schemes, while the final layout stays manually adjustable — assisting decisions, not replacing people',
            'Data scale: cleaned real scheduling resources include 2,615 teaching tasks, 330 classrooms, 673 courses, 624 teachers, and 11,443 training samples',
            'Product boundary: Java backend manages tasks, schemes, persistence, APIs, and permissions; Python scripts handle data preparation, model scoring, template generation, and validation',
            'Iteration: V3.5 template-cover design supports weekly template import, validation reports, scheme preview, and later local adjustments',
          ],
          tags: ['Java', 'Python', 'MySQL', 'CatBoost', 'LightGBM', 'Template Cover', 'Timetabling'],
          color: 'primary',
          github: 'https://github.com/Yuy1114/edu-flow-ai',
        },
      ],
    },
    skills: {
      title: 'Skills',
      subtitle: 'Not a stack list. I do not rate myself in stars — every capability here points to a project that proves it.',
      capabilityTitle: 'Capability model',
      capabilitySubtitle: 'The skills I care about most are the ones that help me understand a scenario, build the system, validate the result, and work with AI responsibly.',
      capabilityItems: [
        ['Product understanding', 'User, problem, workflow, MVP boundary, user story, acceptance criteria, and project retrospective.'],
        ['Backend engineering', 'Java, Spring Boot, MySQL, Redis, RabbitMQ, WebSocket, API design, data modeling, and system boundaries.'],
        ['Delivery and validation', 'Manual acceptance, bug notes, readable docs, deployment awareness, debugging, and explaining trade-offs.'],
        ['AI engineering', 'Mastra-native agent runtime, RAG, semantic layer design, tool calling, HITL proposals, recovery, auditability, and output evaluation.'],
      ],
      proofTitle: 'Capability → evidence',
      proofSubtitle: 'Each capability maps to the tools behind it and the project that demonstrates it.',
      evidenceLabel: 'Proof',
      proofLanes: [
        {
          capability: 'System delivery',
          tools: ['Java', 'Spring Boot', 'MySQL', 'Backend auth', 'REST API'],
          evidence: 'Backend authorization is the source of truth — hidden activities never list and direct URL access is rejected.',
          project: 'do-together',
          icon: '💬',
        },
        {
          capability: 'AI orchestration',
          tools: ['Mastra', 'RAG', 'LibSQL', 'HITL proposal', 'Audit / recovery'],
          evidence: 'The agent never writes silently — every change becomes a proposal, applied only on approval, fully auditable and reversible.',
          project: 'Apothecary Agent',
          icon: '🧠',
        },
        {
          capability: 'Complex domain + ML',
          tools: ['Java', 'Python', 'CatBoost', 'LightGBM', 'Template cover'],
          evidence: 'Timetabling constraints modeled as computable tasks; ML scoring plus template cover generate weekly schemes.',
          project: 'edu-flow-ai',
          icon: '📚',
        },
        {
          capability: 'Frontend & delivery',
          tools: ['React', 'TypeScript', 'TailwindCSS', 'daisyUI', 'Electron'],
          evidence: 'The interface layer across all three projects: conversation, review queues, activity discovery, and scheme preview.',
          project: 'All three projects',
          icon: '🎨',
        },
      ],
    },
    about: {
      title: 'About',
      subtitle: 'Why I build the way I do, and how I work.',
      lead: 'For a long time I measured projects by the stack. Now I measure them by whether they were worth building.',
      bio: [
        'I am Yuy — a developer training myself into a product-minded engineer, with backend as my main track. I do not want to stop at making features work.',
        'Early on, a project meant a checklist: which framework, which features, does it run. It took me a while to notice that a program running is not the same as a problem solved.',
        'So I started asking different questions — who is this for, where should the boundary stop, and how would I know it works. The projects on this site are me practicing that judgment in the open: smaller scopes, clearer boundaries, results I can actually check.',
      ],
      principlesTitle: 'How I build',
      principles: [
        ['Start from the user, not the stack', 'Before I pick an implementation, I try to name who it is for, where the problem shows up, and which part of the flow should change.'],
        ['Small and verifiable beats big and vague', 'I would rather ship a smaller system with a boundary I can explain than a large demo I cannot.'],
        ['A feature is not done when it compiles', 'It is done when there is a clear way to judge whether it actually solved the problem.'],
        ['Bugs and feedback are part of the work', 'Manual acceptance, bug notes, and small fixes are the product loop — not cleanup after it.'],
      ],
      contactTitle: 'Get in touch',
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
      tagline: '我在训练自己成为一名产品型工程师：以后端为主，也能交付完整的全栈系统。',
      intro: '产品型工程师不是从功能列表出发，而是先理解用户、场景、流程和验收标准。为了把这些判断真正落地，我正在用 Java、Spring Boot、MySQL、Redis、RabbitMQ、React、TypeScript 和 AI 应用工具做项目。',
      belief: '',
      projectsCta: '查看项目',
      aboutCta: '关于我',
      methodTitle: '我理解的产品型工程师',
      methodIntro: '我会用一个问题来约束项目：什么场景值得解决，而怎样的产品边界能让结果足够清楚、可实现、可验证？',
      methodItems: [
        ['真实场景', '不是从功能列表开始，而是先弄清楚用户是谁、问题发生在哪里、当前流程为什么不顺。'],
        ['可交付系统', '不是只让代码在本地跑起来，而是把场景落到后端模型、接口边界、前端流程、页面状态、部署说明和可运行的软件里。'],
        ['可验证结果', '不是“我觉得做完了”，而是提前定义什么算完成、什么算验收通过、哪些边界条件不能忽略。'],
      ],
      evidenceTitle: '我正在做的项目',
      evidenceSubtitle: '我用项目把后端系统、前端流程、AI 能力和真实产品场景连起来。',
      proofLabel: '项目重点',
      nowTitle: '当前能力重点',
      nowItems: [
        '后端主线：Java、Spring Boot、MySQL、Redis、RabbitMQ、并发与系统边界',
        '全栈交付：React / TypeScript 页面流程、状态管理、接口联调和验收路径',
        'AI 应用工程：Mastra Agent、RAG、工具调用、HITL 提案、审计与恢复',
      ],
    },
    projects: {
      title: '项目',
      subtitle: '',
      proofLabel: '边界与取舍',
      items: [
        {
          title: 'Apothecary Agent',
          icon: '🧠',
          subtitle: 'Mastra-native 个人知识库维护 Agent',
          description: '一个维护本地 Markdown 知识库的桌面 AI 应用：前端用 React / Electron 承载交互，后端用 Mastra Agent 理解文件变化、生成安全提案，并维护 Agent 自己使用的语义层。',
          evidence: '项目围绕 review-before-apply 闭环设计：Agent 监听 Vault 变化，分析语义影响，生成结构化提案，等待确认后执行变更，并记录审计与恢复信息。',
          highlights: [
            '场景：个人 Markdown 笔记会随时间腐烂——过时、重复、互相矛盾，手动维护成本高。这个 Agent 主动帮你把知识库维持在可信、可检索的状态。',
            '任务边界与人工确认：Agent 绝不静默改你的笔记——所有对人类阅读层的写入都先生成可审阅的 proposal，你批准后才落地，并保留批准/拒绝记录和可回滚的 operation ledger。',
            '上下文与语义层：把「人类阅读的 Markdown vault」和「Agent 自用的语义层（.agent + LibSQL 向量检索）」分开，让 Agent 有稳定上下文，索引又不污染你在读的笔记。',
            '工具与工作流编排：用 Mastra 把捕获、Inbox 分拣、合并归档、视图生成拆成边界清晰的工具与 workflow，每一步的输入、输出、失败和权限都是显式的。',
            '交付与验证：Electron + React 桌面应用覆盖对话、变更队列、提案审核、知识画像和系统诊断；确定性 acceptance suite 覆盖捕获、同步、合并、恢复、日志一致性等关键路径，行为可复现。',
          ],
          tags: ['Mastra', 'TypeScript', 'Electron', 'RAG', 'LibSQL', 'HITL 审核', '审计日志'],
          color: 'primary',
          github: 'https://github.com/Yuy1114/apothecary-agent',
        },
        {
          title: 'do-together',
          icon: '💬',
          subtitle: 'Activity-first 校园参与平台',
          description: '一个以后端为主的全栈校园活动产品：学生浏览 Activity，理解它适合谁、如何参与；系统第一版聚焦活动发现、信息可见性和访问控制。',
          evidence: '工程重点是一个小但完整的产品闭环：Spring Boot 接口、MySQL 数据建模、后端授权、React 页面，以及围绕活动发现和参与信息的手动验收。',
          highlights: [
            '场景：学生常错过适合自己的校园活动——信息分散、不知道活动适合谁、也不清楚怎么参与。do-together 让活动先被发现、被看懂。',
            '产品边界：第一版只保留 User + Activity 核心模型，组织、Membership、聊天、报名都留到之后，把范围收到能验收的大小。',
            '工程设计：以后端授权为事实来源——隐藏活动不进列表，直接访问 URL 也会被拒绝，而不是靠前端藏。',
            '交付：Spring Boot 接口 + MySQL 数据建模 + React 页面，打通从数据到界面的完整闭环。',
            '验证：按用户路径手动验收——学生能否发现活动、看懂参与方式，并在平台外完成真实参与。',
          ],
          tags: ['Spring Boot', 'React', 'TypeScript', 'MySQL', '后端授权', 'MVP 范围'],
          color: 'primary',
          github: 'https://github.com/Yuy1114/do-together',
        },
        {
          title: 'edu-flow-ai',
          icon: '📚',
          subtitle: '面向教务场景的智能排课平台',
          description: '一个面向教务场景的智能排课系统：把教师、班级、教室、课程和时间片转成可计算的排课任务，再通过 ML 辅助的 Python 排课流水线生成周模板方案。',
          evidence: '项目把产品职责和排课职责拆开：Java 后端负责任务、方案、持久化、权限和进度反馈；Python 流水线负责构建任务模式、评分教室-时间候选、填充周模板、校验冲突，并导出可入库的草稿方案。',
          highlights: [
            '真实场景：高校排课涉及教师、班级、教室、课程、时间片、硬约束和软偏好等多类资源',
            '排课链路：历史课表导入、任务模式抽取、ML 教室-时间评分、贪心模板覆盖、冲突校验和数据库草稿导出',
            'AI 定位：ML 用于教室-时间候选评分和方案建议，最终排布仍可人工调整——辅助决策，不替代人',
            '数据规模：清洗后的真实排课资源包括 2,615 个 teaching tasks、330 间教室、673 门课程、624 位教师和 11,443 条训练样本',
            '产品边界：Java 后端负责任务、方案、入库、接口与权限；Python 脚本负责数据准备、模型评分、模板生成和校验',
            '持续迭代：V3.5 template-cover 设计支持周模板导入、校验报告、方案预览和后续局部调整',
          ],
          tags: ['Java', 'Python', 'MySQL', 'CatBoost', 'LightGBM', '模板覆盖', '智能排课'],
          color: 'primary',
          github: 'https://github.com/Yuy1114/edu-flow-ai',
        },
      ],
    },
    skills: {
      title: '技能',
      subtitle: '不是技术栈清单。我不给自己打星级——这里的每一项能力，都指向一个能证明它的项目。',
      capabilityTitle: '能力模型',
      capabilitySubtitle: '我最看重的能力，是能帮助我理解场景、交付系统、验证结果，并负责地使用 AI。',
      capabilityItems: [
        ['产品理解', '用户、问题、流程、MVP 边界、用户故事、验收标准和项目复盘。'],
        ['后端工程', 'Java、Spring Boot、MySQL、Redis、RabbitMQ、WebSocket、接口设计、数据建模和系统边界。'],
        ['交付与验证', '手动验收、bug 记录、可读文档、部署意识、排错能力和技术取舍表达。'],
        ['AI Engineering', 'Mastra-native Agent Runtime、RAG、语义层设计、工具调用、HITL 提案、一致性恢复、审计和输出评估。'],
      ],
      proofTitle: '能力 → 证据',
      proofSubtitle: '每一项能力，都对应它背后的工具，以及能证明它的那个项目。',
      evidenceLabel: '证据',
      proofLanes: [
        {
          capability: '系统交付',
          tools: ['Java', 'Spring Boot', 'MySQL', '后端授权', 'REST API'],
          evidence: '以后端授权为事实来源——隐藏活动不进列表，直接访问 URL 也会被拒绝。',
          project: 'do-together',
          icon: '💬',
        },
        {
          capability: 'AI 编排',
          tools: ['Mastra', 'RAG', 'LibSQL', 'HITL 提案', '审计/恢复'],
          evidence: 'Agent 绝不静默写入——每次改动先成提案、批准后才落地，全程可审计、可回滚。',
          project: 'Apothecary Agent',
          icon: '🧠',
        },
        {
          capability: '复杂业务与 ML',
          tools: ['Java', 'Python', 'CatBoost', 'LightGBM', '模板覆盖'],
          evidence: '把排课约束建模成可计算任务；ML 评分加模板覆盖生成周方案。',
          project: 'edu-flow-ai',
          icon: '📚',
        },
        {
          capability: '前端与交付',
          tools: ['React', 'TypeScript', 'TailwindCSS', 'daisyUI', 'Electron'],
          evidence: '三个项目的界面层：对话、审核队列、活动发现和方案预览。',
          project: '三个项目',
          icon: '🎨',
        },
      ],
    },
    about: {
      title: '关于',
      subtitle: '我为什么这样做项目，以及我如何工作。',
      lead: '很长一段时间，我用技术栈衡量一个项目。现在，我衡量它到底值不值得做。',
      bio: [
        '我是 Yuy——一个正在把自己训练成产品型工程师的开发者，以后端为主线。我不想停在“把功能做出来”这一步。',
        '早些时候，项目对我来说是一张清单：用什么框架、实现了哪些功能、能不能跑起来。我花了一段时间才意识到，程序能跑，和问题被解决，是两回事。',
        '于是我开始问不一样的问题——它是给谁的、边界该停在哪、我怎么知道它真的成立。这个站点上的项目，就是我把这种判断放到明面上练习：更小的范围、更清楚的边界、能真正验证的结果。',
      ],
      principlesTitle: '我做项目的几条原则',
      principles: [
        ['从用户出发，而不是从技术栈', '在决定怎么实现之前，我先说清楚它是给谁的、问题出现在哪、要改变流程里的哪一段。'],
        ['小而可验证，胜过大而含糊', '我宁愿交付一个边界能讲清楚的小系统，也不做一个讲不清楚的大 demo。'],
        ['编译通过不等于做完', '做完，是指有一个明确的方式，能判断它是否真的解决了那个问题。'],
        ['Bug 和反馈也是工作本身', '手动验收、bug 记录和小修复是产品闭环的一部分，不是做完之后的收尾。'],
      ],
      contactTitle: '联系我',
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
