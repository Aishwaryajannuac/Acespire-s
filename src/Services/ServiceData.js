// ─── SERVICE DATA ─────────────────────────────────────────────────────────────
// Add / edit services here. The template reads from this file automatically.

const services = [
  {
    id: 'supply-chain',
    badge: 'Service Deep Dive: Supply Chain & Logistics',
    heroTitle: ['Revolutionizing', 'Supply Chains', 'with Agentic AI.'],
    heroTitleBlue: 'Supply Chains',
    heroDesc: 'Move beyond static automation. Our Agentic AI solutions sense, adapt, and optimize your global operations in real-time, reducing lead times by up to 40%.',
    heroImage: '/Services-dummy.png',
    caseStudyLabel: 'View Case Studies',
    pillarsTitle: 'Core Service Pillars',
    pillarsSubtitle: 'We combine deep domain expertise in Supply Chain management with next-generation AI agents to solve the most complex logistical challenges.',
    pillars: [
      {
        id: 'demand-sensing',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
          </svg>
        ),
        title: 'Predictive Demand Sensing',
        desc: 'Harness external market signals and historical data to forecast demand with 95%+ accuracy, preventing overstock and stockouts.',
        featured: true,
      },
      {
        id: 'multi-tier',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
          </svg>
        ),
        title: 'Multi-Tier Visibility',
        desc: 'Trace your entire supply network beyond Tier 1 suppliers. Gain full transparency into origins and risks.',
        featured: false,
      },
      {
        id: 'procurement',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <rect x="2" y="2" width="8" height="8" rx="1.5"/><rect x="14" y="2" width="8" height="8" rx="1.5"/>
            <rect x="2" y="14" width="8" height="8" rx="1.5"/><rect x="14" y="14" width="8" height="8" rx="1.5"/>
          </svg>
        ),
        title: 'Autonomous Procurement',
        desc: 'AI agents that negotiate and execute spot-buy orders based on real-time price fluctuations and supplier performance.',
        featured: false,
      },
      {
        id: 'inventory',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <rect x="2" y="3" width="20" height="5" rx="1"/><rect x="2" y="10" width="20" height="5" rx="1"/>
            <rect x="2" y="17" width="20" height="4" rx="1"/>
          </svg>
        ),
        title: 'Dynamic Inventory Balancing',
        desc: 'Automatically redistribute inventory across your distribution centers based on shifting regional demand clusters.',
        featured: false,
      },
    ],
  },

  {
    id: 'data-integration',
    badge: 'Service Deep Dive: Data Integration',
    heroTitle: ['Unifying Your', 'Data Ecosystem', 'in Real-Time.'],
    heroTitleBlue: 'Data Ecosystem',
    heroDesc: 'Break down data silos and connect every system across your enterprise. Our integration layer delivers a single source of truth in real-time.',
    heroImage: '/Services-dummy.png',
    caseStudyLabel: 'View Case Studies',
    pillarsTitle: 'Core Service Pillars',
    pillarsSubtitle: 'We build seamless data pipelines that connect your enterprise systems, eliminating silos and enabling real-time decision-making.',
    pillars: [
      {
        id: 'etl',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <polyline points="22 12 18 12 15 20 9 4 6 12 2 12"/>
          </svg>
        ),
        title: 'Automated ETL Pipelines',
        desc: 'Extract, transform, and load data from any source — ERP, CRM, IoT — with intelligent schema mapping and error handling.',
        featured: true,
      },
      {
        id: 'api',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M18 20V10M12 20V4M6 20v-6"/>
          </svg>
        ),
        title: 'API-First Architecture',
        desc: 'Connect any platform with a robust REST and GraphQL API layer designed for enterprise-grade reliability and scalability.',
        featured: false,
      },
      {
        id: 'warehouse',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <ellipse cx="12" cy="5" rx="9" ry="3"/>
            <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
            <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
          </svg>
        ),
        title: 'Centralized Data Warehouse',
        desc: 'Consolidate structured and unstructured data into a unified warehouse on Snowflake, BigQuery, or your preferred platform.',
        featured: false,
      },
      {
        id: 'realtime',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
        ),
        title: 'Real-Time Streaming',
        desc: 'Event-driven data streaming with Kafka and Kinesis ensures your dashboards and AI models run on live data, always.',
        featured: false,
      },
    ],
  },

  {
    id: 'cloud-tech',
    badge: 'Service Deep Dive: Cloud Technology',
    heroTitle: ['Enterprise Cloud', 'Infrastructure', 'Built to Scale.'],
    heroTitleBlue: 'Infrastructure',
    heroDesc: 'Migrate, modernize, and manage your cloud environment with zero-downtime strategies and enterprise-grade security.',
    heroImage: '/Services-dummy.png',
    caseStudyLabel: 'View Case Studies',
    pillarsTitle: 'Core Service Pillars',
    pillarsSubtitle: 'From migration to optimization, we design cloud architectures that are resilient, cost-efficient, and future-ready.',
    pillars: [
      {
        id: 'migration',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/>
          </svg>
        ),
        title: 'Zero-Downtime Migration',
        desc: 'Move workloads to AWS, Azure, or GCP with proven lift-and-shift and re-architecture strategies that eliminate business disruption.',
        featured: true,
      },
      {
        id: 'kubernetes',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2"/>
            <polyline points="2 17 12 22 22 17"/>
            <polyline points="2 12 12 17 22 12"/>
          </svg>
        ),
        title: 'Kubernetes Orchestration',
        desc: 'Container-native deployments with auto-scaling, self-healing pods, and GitOps pipelines for continuous delivery.',
        featured: false,
      },
      {
        id: 'finops',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <line x1="18" y1="20" x2="18" y2="10"/>
            <line x1="12" y1="20" x2="12" y2="4"/>
            <line x1="6" y1="20" x2="6" y2="14"/>
          </svg>
        ),
        title: 'FinOps & Cost Governance',
        desc: 'Continuous cloud cost monitoring with rightsizing recommendations, reserved instance planning, and waste elimination.',
        featured: false,
      },
      {
        id: 'security',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        ),
        title: 'Cloud Security & Compliance',
        desc: 'Zero-trust architecture, SOC 2 compliance automation, and real-time threat detection across your entire cloud estate.',
        featured: false,
      },
    ],
  },

  {
    id: 'digital-transformation',
    badge: 'Service Deep Dive: Digital Transformation',
    heroTitle: ['Transform Your', 'Enterprise', 'for the AI Era.'],
    heroTitleBlue: 'Enterprise',
    heroDesc: 'End-to-end digital transformation programs that go beyond technology — driving cultural change, process reinvention, and measurable ROI.',
    heroImage: '/Services-dummy.png',
    caseStudyLabel: 'View Case Studies',
    pillarsTitle: 'Core Service Pillars',
    pillarsSubtitle: 'We design and execute transformation programs that modernize your operations, processes, and culture simultaneously.',
    pillars: [
      {
        id: 'process',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        ),
        title: 'Process Reinvention',
        desc: 'Map, analyze, and redesign your core business processes using digital twins and AI-driven optimization frameworks.',
        featured: true,
      },
      {
        id: 'change',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
          </svg>
        ),
        title: 'Change Management',
        desc: 'Structured adoption programs that align leadership, retrain teams, and embed new ways of working across the organization.',
        featured: false,
      },
      {
        id: 'legacy',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <rect x="2" y="3" width="20" height="14" rx="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
        ),
        title: 'Legacy Modernization',
        desc: 'Migrate mission-critical legacy systems to modern, cloud-native architectures without disrupting business continuity.',
        featured: false,
      },
      {
        id: 'analytics',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="12" r="6"/>
            <circle cx="12" cy="12" r="2"/>
          </svg>
        ),
        title: 'Data-Driven Culture',
        desc: 'Build enterprise analytics capabilities with self-serve BI tools, KPI frameworks, and AI-augmented decision-making.',
        featured: false,
      },
    ],
  },

  {
    id: 'automation',
    badge: 'Service Deep Dive: Intelligent Automation',
    heroTitle: ['Automate the', 'Repetitive.', 'Amplify the Human.'],
    heroTitleBlue: 'Repetitive.',
    heroDesc: 'Deploy AI-driven automation that handles complex, multi-step workflows autonomously — freeing your teams for high-value strategic work.',
    heroImage: '/Services-dummy.png',
    caseStudyLabel: 'View Case Studies',
    pillarsTitle: 'Core Service Pillars',
    pillarsSubtitle: 'From RPA to full Agentic AI workflows, we design automation that scales with your business and adapts to change.',
    pillars: [
      {
        id: 'agentic',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <rect x="3" y="11" width="18" height="10" rx="2"/>
            <circle cx="12" cy="5" r="2"/>
            <path d="M12 7v4"/>
            <line x1="8" y1="16" x2="8" y2="16"/>
            <line x1="12" y1="16" x2="12" y2="16"/>
            <line x1="16" y1="16" x2="16" y2="16"/>
          </svg>
        ),
        title: 'Agentic Workflow Automation',
        desc: 'Autonomous AI agents that reason, plan, and execute multi-step business processes end-to-end without human intervention.',
        featured: true,
      },
      {
        id: 'rpa',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
        ),
        title: 'RPA & Process Bots',
        desc: 'Robotic Process Automation bots that handle high-volume, rule-based tasks across ERP, CRM, and legacy systems.',
        featured: false,
      },
      {
        id: 'document',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
        ),
        title: 'Intelligent Document Processing',
        desc: 'Extract, classify, and process unstructured documents — invoices, contracts, reports — with 99%+ accuracy using LLM pipelines.',
        featured: false,
      },
      {
        id: 'monitoring',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          </svg>
        ),
        title: 'Continuous Monitoring & Optimization',
        desc: 'Real-time automation health dashboards with self-healing triggers and performance optimization feedback loops.',
        featured: false,
      },
    ],
  },
];

export default services;