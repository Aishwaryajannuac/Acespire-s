// ─── SERVICE DATA ─────────────────────────────────────────────────────────────
// Every section of ServiceTemplate reads from this file.
// Fields added vs old version:
//   heroTitle / heroTitleBlue / heroDesc  - hero content
//   pillarsSubtitle                        - pillars section sub-heading
//   pillars                                - pillar cards
//   frameworkSteps                         - Operational Framework section
//   impactStats                            - Measurable Business Impact section
//   whyTitle / whyReasons                  - Why Acespire section
//   ctaTitle / ctaSubtitle                 - bottom CTA section

const services = [
  // ─────────────────────────────────────────────────────────────────────────────
  //  1. SUPPLY CHAIN
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'supply-chain',
    badge: 'Service Deep Dive: Supply Chain & Logistics',

    // ── Hero ─────────────────────────────────────────────────────────────────
    heroTitle:      ['Plan Smarter.', 'Operate Leaner.'],
    heroTitleBlue:  'Operate Leaner.',
    heroDesc: 'Modern supply chains demand proactive strategy and intelligent decision-making. Acespire drives resilient, data-driven transformations across industry-leading planning and optimization platforms.',
    heroImage:       '/Supplychain.png',
    caseStudyLabel:  'View Case Studies',

    // ── Pillars ───────────────────────────────────────────────────────────────
    pillarsSubtitle: 'We optimize planning, eliminate inefficiencies, and integrate technology across your value chain.',
    pillars: [
      {
        id: 'sc-data-integration',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          </svg>
        ),
        title: 'Supply Chain Data Integration',
        desc: 'Centralize fragmented data into a unified, real-time operational platform - bridging gaps across suppliers, manufacturers, and customers seamlessly.',
      },
      {
        id: 'visibility',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        ),
        title: 'End-to-End Visibility & Tracking',
        desc: 'Real-time tracking from raw material sourcing through to final delivery - giving you full transparency at every node in your supply network.',
      },
      {
        id: 'passport',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <polyline points="9 12 11 14 15 10"/>
          </svg>
        ),
        title: 'Digital Product Passport & Authentication',
        desc: 'Verifiable digital identities embedded for tamper-proof product traceability - ensuring regulatory compliance and authentication at every stage.',
      },
      {
        id: 'optimization',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
          </svg>
        ),
        title: 'Supply Chain Optimization',
        desc: 'Advanced algorithms, API integrations, and process redesign for peak performance across every tier of your supply chain.',
      },
    ],

    // ── Operational Framework ─────────────────────────────────────────────────
    frameworkSteps: [
      {
        num: '1',
        title: 'Audit & Diagnostic',
        desc: 'We conduct a comprehensive assessment of your IT infrastructure and supply chain workflows - identifying inefficiencies, data gaps, and bottlenecks holding your business back.',
      },
      {
        num: '2',
        title: 'Strategy Design',
        desc: 'We craft a precision-tailored transformation strategy using deep expertise across SAP S/4HANA, DevOps, and cloud platforms - aligned to your unique business objectives.',
      },
      {
        num: '3',
        title: 'Cloud Integration',
        desc: 'We seamlessly integrate ERP, WMS, TMS, and cloud platforms through Azure APIM and SAP CPI - creating a unified, real-time operational environment built for agile growth.',
      },
      {
        num: '4',
        title: 'Continuous Loop',
        desc: 'Our AI/ML-driven Continuous Loop framework continuously monitors, optimizes, and evolves your operations - keeping your business resilient, adaptive, and ahead of disruption.',
      },
    ],

    // ── Impact Stats ──────────────────────────────────────────────────────────
    impactStats: [
      { value: '40%', dir: 'down', title: 'Lead Time Reduction',       desc: 'Cut procurement and delivery lead times with proactive AI-driven planning.' },
      { value: '95%', dir: 'up',   title: 'Demand Forecast Accuracy',  desc: 'Prevent overstock and stockouts with market-signal-driven demand sensing.' },
      { value: '30%', dir: 'down', title: 'Inventory Carrying Costs',  desc: 'Dynamically rebalance stock across distribution centers in real time.' },
      { value: '3×',  dir: 'up',   title: 'Supplier Visibility',       desc: 'Full multi-tier supplier transparency beyond Tier 1 for resilient sourcing.' },
    ],

    // ── Why Acespire ──────────────────────────────────────────────────────────
    whyTitle:   'Why Acespire for Supply Chain',
    whyReasons: [
      'Domain Expertise across SAP, WMS, and TMS platforms',
      'Real-Time Visibility from raw materials to last-mile delivery',
      'Regulatory Compliance embedded at every workflow stage',
      'Measurable Impact with ROI-driven transformation outcomes',
    ],

    // ── CTA ───────────────────────────────────────────────────────────────────
    ctaTitle:    'Build a future-ready supply chain with Acespire.',
    ctaSubtitle: 'From demand sensing to autonomous procurement, our experts are ready to design your end-to-end transformation. Book a free discovery call today.',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  //  2. DATA INTEGRATION
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'data-integration',
    badge: 'Service Deep Dive: Data Integration',

    heroTitle:     ['Connect Your Systems.', 'Unify Your Data.'],
    heroTitleBlue: 'Unify Your Data.',
    heroDesc: 'Fragmented systems and siloed data are holding your business back. Acespire\'s Data Integration Services unify your platforms, synchronize data in real time, and convert raw information into strategic business intelligence.',
    heroImage:      '/Dataintegration.png',
    caseStudyLabel: 'View Case Studies',

    pillarsSubtitle: 'Our data integration solutions connect every layer of your enterprise - ensuring accurate data exchange, unified system communication, and complete visibility across your organization.',
    pillars: [
      {
        id: 'etl',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <polyline points="22 12 18 12 15 20 9 4 6 12 2 12"/>
          </svg>
        ),
        title: 'ETL Pipeline Development',
        desc: 'We build scalable ETL pipelines, engineered for accuracy and high-volume data processing across all business systems.',
      },
      {
        id: 'realtime-sync',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
        ),
        title: 'Real-Time Data Synchronization',
        desc: 'We enable live data sync across ERP, supply chain, and business-critical applications - ensuring your teams always act on the freshest intelligence.',
      },
      {
        id: 'api',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M18 20V10M12 20V4M6 20v-6"/>
          </svg>
        ),
        title: 'API & System Integration',
        desc: 'We connect your enterprise ecosystem through seamless API integrations, eliminating data silos and enabling fluid, uninterrupted communication across all platforms.',
      },
      {
        id: 'governance',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        ),
        title: 'Data Quality & Governance',
        desc: 'Implement validation, cleansing, and governance frameworks to ensure consistency, reliability, and compliance across every data stream.',
      },
    ],

    frameworkSteps: [
      {
        num: '1',
        title: 'Discovery & Mapping',
        desc: 'We audit every data source, system, and flow across your organization - surfacing gaps, inconsistencies, and integration opportunities.',
      },
      {
        num: '2',
        title: 'Architecture Design',
        desc: 'We design a scalable, future-proof integration architecture - selecting the right tools (Kafka, MuleSoft, Azure Data Factory) for your stack.',
      },
      {
        num: '3',
        title: 'Pipeline Deployment',
        desc: 'Our engineers build, test, and deploy production-grade ETL pipelines and API connectors with full monitoring and error-handling built in.',
      },
      {
        num: '4',
        title: 'Govern & Optimize',
        desc: 'Ongoing data quality monitoring, lineage tracking, and performance tuning ensure your integration layer remains accurate and efficient.',
      },
    ],

    impactStats: [
      { value: '70%', dir: 'down', title: 'Data Processing Time',     desc: 'Automated pipelines eliminate manual data handling and batch delays.' },
      { value: '99%', dir: 'up',   title: 'Data Accuracy Rate',       desc: 'Validation and cleansing frameworks remove errors at the point of ingestion.' },
      { value: '3×',  dir: 'up',   title: 'Faster Reporting Cycles',  desc: 'Real-time sync means dashboards reflect live operations, not yesterday\'s data.' },
      { value: '60%', dir: 'down', title: 'Integration Costs',        desc: 'Reusable API connectors and unified platforms cut long-term integration spend.' },
    ],

    whyTitle:   'Why Acespire for Data Integration',
    whyReasons: [
      'Eliminates data silos across every enterprise system',
      'Improves decision-making with trusted, real-time data',
      'Reduces errors through automated validation and governance',
      'Scales with your business as systems and volumes grow',
    ],

    ctaTitle:    'Ready to Unify Your Data?',
    ctaSubtitle: 'Stop operating with disconnected systems. Partner with Acespire to build a seamless, intelligent data integration framework that powers smarter decisions and accelerates growth.',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  //  3. CLOUD TECHNOLOGY
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'cloud-tech',
    badge: 'Service Deep Dive: Cloud Technology',

    heroTitle:     ['Scale Smarter.', 'Innovate Faster.', 'Operate Securely.'],
    heroTitleBlue: 'Innovate Faster.',
    heroDesc: 'Modern businesses demand cloud infrastructure that is agile, secure, and growth-ready. Acespire\'s Cloud Services enable seamless adoption, migration, and management - at scale.',
    heroImage:      '/Cloudtech.png',
    caseStudyLabel: 'View Case Studies',

    pillarsSubtitle: 'End-to-end cloud solutions - from strategy and advisory through migration and optimization - helping businesses leverage cloud technology for greater agility and competitive advantage.',
    pillars: [
      {
        id: 'strategy',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="12" r="6"/>
            <circle cx="12" cy="12" r="2"/>
          </svg>
        ),
        title: 'Cloud Strategy & Advisory',
        desc: 'Tailored cloud roadmaps aligned with your business goals - determining the right model (public, private, hybrid) for your operations and budget.',
      },
      {
        id: 'migration',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/>
          </svg>
        ),
        title: 'Cloud Migration',
        desc: 'Seamless, end-to-end migration with minimal disruption - transferring data, applications, and infrastructure with precision and security.',
      },
      {
        id: 'security',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        ),
        title: 'Security & Compliance',
        desc: 'Robust cloud security frameworks protecting data, applications, and infrastructure - with zero-trust architecture and SOC 2 compliance automation.',
      },
      {
        id: 'automation-cloud',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
        ),
        title: 'Automation & DevOps',
        desc: 'Accelerated delivery pipelines enabling faster releases, reduced downtime, and continuous improvement through CI/CD and GitOps practices.',
      },
    ],

    frameworkSteps: [
      {
        num: '1',
        title: 'Cloud Readiness Assessment',
        desc: 'We evaluate your existing infrastructure, workloads, and security posture to define the optimal cloud strategy and migration path.',
      },
      {
        num: '2',
        title: 'Architecture & Roadmap',
        desc: 'We design a cloud-native architecture - selecting the right services across AWS, Azure, or GCP - with a phased migration roadmap tailored to your risk tolerance.',
      },
      {
        num: '3',
        title: 'Migration & Integration',
        desc: 'Our engineers execute lift-and-shift and re-architecture migrations with zero-downtime strategies and full ERP and SaaS integration.',
      },
      {
        num: '4',
        title: 'Optimize & Govern',
        desc: 'Post-migration FinOps monitoring, security hardening, and performance optimization keep your cloud estate efficient, compliant, and cost-controlled.',
      },
    ],

    impactStats: [
      { value: '40%', dir: 'down', title: 'Infrastructure Costs',       desc: 'FinOps governance and rightsizing eliminate waste across cloud spend.' },
      { value: '0',   dir: 'up',   title: 'Downtime During Migration',  desc: 'Proven zero-downtime strategies keep business operations uninterrupted.' },
      { value: '60%', dir: 'up',   title: 'Deployment Speed',           desc: 'CI/CD pipelines and Kubernetes orchestration accelerate release cycles.' },
      { value: '99.9%',dir:'up',   title: 'Platform Uptime SLA',        desc: 'Resilient, multi-AZ architectures ensure enterprise-grade availability.' },
    ],

    whyTitle:   'Why Acespire for Cloud Technology',
    whyReasons: [
      'Agile Scalability - infrastructure that grows with your business',
      'Seamless Migration with zero disruption to business continuity',
      'Enterprise Integration across ERP, WMS, and SaaS platforms',
      'Optimized Performance through continuous FinOps governance',
    ],

    ctaTitle:    'Unlock the full potential of cloud technology with Acespire.',
    ctaSubtitle: 'From cloud strategy to post-migration optimization, our certified architects are ready to build your future-ready cloud estate. Book a free discovery call today.',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  //  4. DIGITAL TRANSFORMATION
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'digital-transformation',
    badge: 'Service Deep Dive: Digital Transformation',

    heroTitle:     ['Modernize.', 'Automate. Scale.'],
    heroTitleBlue: 'Automate. Scale.',
    heroDesc: 'Today\'s competitive landscape demands bold digital reinvention, not incremental change. Acespire combines AI, automation, and modern technology to transform how your business operates.',
    heroImage:      '/Digitaltransformation.png',
    caseStudyLabel: 'View Case Studies',

    pillarsSubtitle: 'We deliver end-to-end transformation - from strategy through full implementation - modernizing infrastructure, optimizing processes, and unlocking intelligent technology enterprise-wide.',
    pillars: [
      {
        id: 'ai-ml',
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
        title: 'AI & Machine Learning',
        desc: 'Automate workflows, sharpen forecasting, and surface actionable insights with AI/ML models embedded directly into your core business processes.',
      },
      {
        id: 'process-automation',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
        ),
        title: 'Process Automation',
        desc: 'Eliminate repetitive manual tasks at scale with intelligent solutions and optimized processes that free your teams for higher-value work.',
      },
      {
        id: 'advisory',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
          </svg>
        ),
        title: 'Advisory & Strategy Consulting',
        desc: 'Outcome-driven advisory that aligns your digital roadmap with long-term business objectives - turning vision into executable strategy.',
      },
      {
        id: 'full-transformation',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        ),
        title: 'Full-Cycle Transformation',
        desc: 'From strategy and migration to deployment - ensuring seamless business continuity throughout every phase of your transformation journey.',
      },
    ],

    frameworkSteps: [
      {
        num: '1',
        title: 'Transformation Audit',
        desc: 'We assess your current digital maturity, technology stack, and process landscape - uncovering the highest-impact transformation opportunities.',
      },
      {
        num: '2',
        title: 'Digital Roadmap Design',
        desc: 'We design a phased, prioritized transformation roadmap - aligning AI adoption, process redesign, and technology modernization to your business goals.',
      },
      {
        num: '3',
        title: 'Implementation & Deployment',
        desc: 'Our cross-functional teams execute transformation initiatives in parallel - modernizing systems, deploying AI models, and reengineering processes simultaneously.',
      },
      {
        num: '4',
        title: 'Continuous Evolution',
        desc: 'Post-deployment, we monitor outcomes, optimize performance, and iterate - ensuring your digital capabilities compound in value over time.',
      },
    ],

    impactStats: [
      { value: '50%', dir: 'up',   title: 'Operational Efficiency',    desc: 'Process reinvention and AI automation eliminate bottlenecks at every layer.' },
      { value: '3×',  dir: 'up',   title: 'Faster Time-to-Market',     desc: 'Agile delivery and modernized infrastructure accelerate product launches.' },
      { value: '35%', dir: 'down', title: 'Legacy System Costs',        desc: 'Cloud-native modernization eliminates expensive, brittle legacy maintenance.' },
      { value: '80%', dir: 'up',   title: 'Data-Driven Decisions',      desc: 'Self-serve BI and AI-augmented insights replace intuition with intelligence.' },
    ],

    whyTitle:   'Why Acespire for Digital Transformation',
    whyReasons: [
      'Accelerated Growth through AI-powered process reinvention',
      'Scalable Modernization with cloud-native and composable architecture',
      'Seamless Integration across all enterprise systems and platforms',
      'Measurable Impact with ROI-driven KPI frameworks at every milestone',
    ],

    ctaTitle:    'Lead with confidence in a digital-first world.',
    ctaSubtitle: 'From strategy to full deployment, Acespire builds the digital foundation your business needs to outpace the competition. Book a free discovery call today.',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  //  5. AUTOMATION
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'automation',
    badge: 'Service Deep Dive: Intelligent Automation',

    heroTitle:     ['Streamline Operations.', 'Eliminate Inefficiencies.'],
    heroTitleBlue: 'Eliminate Inefficiencies.',
    heroDesc: 'Manual processes slow growth and drain resources in a competitive market. Acespire\'s Automation Services deliver intelligent, scalable solutions - from workflow automation to Agentic AI.',
    heroImage:      '/Automation.png',
    caseStudyLabel: 'View Case Studies',

    pillarsSubtitle: 'End-to-end automation solutions tailored to your unique business operations - minimizing manual effort, reducing errors, and accelerating performance at every level.',
    pillars: [
      {
        id: 'workflow',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <rect x="2" y="3" width="20" height="5" rx="1"/>
            <rect x="2" y="10" width="20" height="5" rx="1"/>
            <rect x="2" y="17" width="20" height="4" rx="1"/>
          </svg>
        ),
        title: 'Workflow Automation',
        desc: 'Automate complex, repetitive workflows to boost speed and operational efficiency - connecting people, systems, and data seamlessly.',
      },
      {
        id: 'intelligent',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
        ),
        title: 'Intelligent Automation',
        desc: 'Intelligent bots that eliminate manual, rule-based tasks across business functions - from finance and HR to procurement and customer service.',
      },
      {
        id: 'bpa',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <rect x="2" y="2" width="8" height="8" rx="1.5"/>
            <rect x="14" y="2" width="8" height="8" rx="1.5"/>
            <rect x="2" y="14" width="8" height="8" rx="1.5"/>
            <rect x="14" y="14" width="8" height="8" rx="1.5"/>
          </svg>
        ),
        title: 'Business Process Automation',
        desc: 'Streamline finance, HR, supply chain, and operations through intelligent automation - reducing cycle times and eliminating costly manual errors.',
      },
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
        title: 'Agentic AI Automation',
        desc: 'Next-generation AI that autonomously executes complex, multi-step workflows with self-driven decision-making - far beyond traditional RPA.',
      },
    ],

    frameworkSteps: [
      {
        num: '1',
        title: 'Process Discovery',
        desc: 'We map and analyse your current workflows to identify high-impact automation candidates - prioritizing by volume, error rate, and strategic value.',
      },
      {
        num: '2',
        title: 'Automation Design',
        desc: 'We design the right automation approach for each process - RPA, AI agents, or full Agentic workflows - with a phased implementation roadmap.',
      },
      {
        num: '3',
        title: 'Build & Integrate',
        desc: 'Our engineers build, test, and deploy automation solutions fully integrated with your ERP, CRM, and legacy systems - with zero business disruption.',
      },
      {
        num: '4',
        title: 'Monitor & Scale',
        desc: 'Real-time dashboards track automation performance, self-healing triggers resolve exceptions, and continuous optimization expands coverage over time.',
      },
    ],

    impactStats: [
      { value: '60%', dir: 'up',   title: 'Productivity Improvement',  desc: 'Automate repetitive tasks to free your teams for high-value strategic work.' },
      { value: '40%', dir: 'down', title: 'Operational Costs',         desc: 'Reduce dependency on manual processes and minimize costly inefficiencies.' },
      { value: '99%', dir: 'up',   title: 'Process Accuracy',          desc: 'Eliminate human errors with consistent and reliable automation at scale.' },
      { value: '50%', dir: 'up',   title: 'Faster Turnaround Time',    desc: 'Accelerate execution of tasks and workflows across every business function.' },
    ],

    whyTitle:   'Why Acespire for Automation',
    whyReasons: [
      'Operational Efficiency through end-to-end workflow automation',
      'Error Reduction with consistent, rules-driven and AI-driven execution',
      'Scalable Solutions that grow with your business operations',
      'End-to-End Expertise from RPA to Agentic AI implementation',
    ],

    ctaTitle:    'Transform your operations with intelligent automation built for every domain.',
    ctaSubtitle: 'From RPA to Agentic AI, Acespire designs automation that scales with your business. Book a free discovery call and get your automation roadmap today.',
  },
];

export default services;