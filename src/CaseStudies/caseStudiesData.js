// ─── CASE STUDIES DATA ────────────────────────────────────────────────────────
// Sort order (newest → oldest by date):
//   1. Blue Yonder WMS   - 2026-04-15  (featured)
//   2. Blue Yonder TMS   - 2026-04-09  (featured)
//   3. Agentic AI        - 2026-03-20
//   4. Automation        - 2026-03-10
//   5. Automobile        - 2025-11-21
//   6. Transport Mfg     - 2025-02-17
//   7. Semiconductor     - 2025-01-15

const caseStudies = [
  // ─────────────────────────────────────────────────────────────────────────────
  //  FEATURED 1 - Blue Yonder WMS (most recent)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'fmcg-wms',
    featured: true,
    category: 'Supply Chain',
    industry: 'FMCG',
    client: 'Major Indian FMCG Company',
    title: 'Blue Yonder WMS Implementation for a Major Indian FMCG Company',
    titleHighlight: 'Blue Yonder WMS',
    tagline:
      'Transforming warehouse operations through automation and standardization and enabling scalable warehouse management across all distribution centres.',
    heroImage: '/Project5.jpg',
    cardImage: '/Project5.jpg',
    date: '2026-04-15',
    problem:
      'Legacy systems and manual processes created inefficient space utilization, picking productivity issues, suboptimal order accuracy, and complex integration challenges with ERP systems at scale.',
    solution:
      'Blue Yonder WMS with rule-based putaway strategies, wave processing, advanced FIFO/FEFO allocation logic, WMS-WLM integration, dynamic slotting, and custom dock-utilization reporting.',
    result:
      'Optimized warehouse space, enhanced inbound efficiency, increased picking productivity, faster wave-based order fulfillment, and standardized processes across all distribution center locations.',
    metrics: [
      { label: 'Picking Productivity', value: '↑', icon: 'chart' },
      { label: 'Order Accuracy',       value: '↑', icon: 'bolt'  },
    ],
    tags: ['Supply Chain', 'WMS', 'Blue Yonder', 'Warehouse', 'FMCG'],
    content: `Overview
This case study showcases the successful implementation of the Blue Yonder Warehouse Management System (WMS) for a large Indian corporate, with businesses spread across multiple domains like FMCG, Hospitality, paper business, and Information Technology. The initiative was aimed at transforming warehouse operations through automation and standardization, focusing on optimizing inbound and outbound logistics processes, improving inventory accuracy, and enabling scalable warehouse operations across its distribution network.
Background
The company operates a large and complex supply chain spanning multiple business verticals such as Packaged Food items, FMCG, agri-products, and paperboards. With high SKU proliferation, varied storage requirements, and extensive distribution channels, warehouse operations were becoming increasingly complex. Legacy systems and manual processes created challenges in handling warehouse operations efficiently.
Challenges
1. Inefficient Space Utilization: Limited system-driven putaway strategies leading to inefficient space utilization and high dependency on manual decision-making in inbound and outbound operations.
2. Picking Productivity Issues: Inefficient inventory placement affecting picking productivity and lack of intelligent wave planning for order fulfillment.
3. Order Accuracy Gaps: Suboptimal allocation strategies impacting order accuracy and fill rates, with limited real-time visibility into warehouse operations and inventory status.
4. Complex SKU Handling: Complex SKU handling with varying storage and handling requirements and inefficient dock scheduling causing inbound processing delays.
5. Integration & Scalability Challenges: Integration challenges with ERP and transportation systems, along with scalability issues in handling peak volumes and seasonal demand.
Solutions Implemented
1. Blue Yonder WMS Deployment: Implementation for end-to-end warehouse execution and control with rule-based Putaway Strategy to optimize bin selection based on product attributes, velocity, and storage type.
2. Inbound Process Optimization: ASN-based receiving and directed putaway, replenishment strategy based on Item Velocity and Item Family, and dynamic slotting to improve inventory placement and picking efficiency.
3. Wave Processing for Outbound: Implemented Wave Processing for outbound planning including wave grouping based on order priority, route, and shipment schedules.
4. Deplenishment Strategy: Implemented a custom job process for moving inventory back from Back-Yard ASRS pick faces to the main ASRS racks.
5. Advanced Allocation Strategy: Configured advanced Allocation Strategy to ensure optimal inventory reservation based on FIFO/FEFO, stock availability, and business rules.
6. WMS & WLM Integration: Integrated WMS with WLM (Warehouse Labour Management) enabling data collection and flow between WMS and WLM for reporting purposes.
7. Custom Reporting & Exception Handling: Custom reports for Truck Monitoring, Truck Detention, Dock Utilization, and Warehouse Utilization with exception handling workflows.
Benefits
1. Improved Space Utilization: Optimized putaway strategies maximized warehouse space across all locations.
2. Enhanced Inbound Efficiency: System-driven receiving and directed putaway reduced manual effort and processing time.
3. Increased Picking Productivity: Better inventory placement and slotting improved picking speed and accuracy.
4. Faster Order Fulfillment: Wave-based processing enabled faster and more accurate outbound operations.
5. Improved Order Accuracy: Advanced allocation logic improved order accuracy and fill rates significantly.
6. Real-Time Visibility: Live visibility into inventory and warehouse operations enabled proactive decision-making.
7. Reduced Manual Intervention: Higher operational efficiency achieved through automation and system-driven workflows.
8. Better Scalability: Improved ability to handle peak volumes and seasonal demand fluctuations.
9. Process Standardization: Standardized warehouse processes across locations ensuring consistency and control.`,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  //  FEATURED 2 - Blue Yonder TMS
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'alcobev-tms',
    featured: true,
    category: 'Supply Chain',
    industry: 'FMCG / AlcoBev',
    client: 'Global AlcoBev Leader',
    title: 'Blue Yonder TMS Implementation for a Major AlcoBev Company',
    titleHighlight: 'Blue Yonder TMS',
    tagline:
      'Modernizing transportation planning, execution, and visibility across global logistics operations using Blue Yonder TMS - from Australia to Europe to India.',
    heroImage: '/Project4.jpg',
    cardImage: '/Project4.jpg',
    date: '2026-04-09',
    problem:
      'Fragmented transportation processes across 180+ countries, mixed legacy systems, manual invoice reconciliation, and limited real-time shipment visibility made consistent global operations nearly impossible.',
    solution:
      'Blue Yonder TMS with phased regional rollout (Australia → Africa → Europe → India), MuleSoft middleware integration, Luminate Control Tower for live tracking, automated freight audit, and Cognos reporting.',
    result:
      'Optimized load planning, real-time shipment visibility across all regions, reduced master data errors, faster freight settlement, and standardized global operations independently audited by Deloitte.',
    metrics: [
      { label: 'Freight Settlement Speed', value: '↑', icon: 'chart' },
      { label: 'Operational Consistency',  value: '↑', icon: 'bolt'  },
    ],
    tags: ['Supply Chain', 'TMS', 'Blue Yonder', 'Logistics', 'FMCG'],
    content: `Overview
This case study outlines the successful implementation of the Blue Yonder Transportation Management System (TMS) for a global leader in premium alcoholic beverages, headquartered in the United Kingdom. The company has a diverse and iconic portfolio of brands across spirits, beer, and ready-to-drink categories, operating in over 180 countries with an extensive distribution network.
The initiative focused on modernizing transportation planning, execution, and visibility across key logistics operations. By leveraging Blue Yonder TMS capabilities, the company aimed to streamline Transportation Management, reduce operational inefficiencies, and enhance supply chain responsiveness.
Background
The company operates a complex global supply chain with diverse distribution networks spanning multiple geographies, modes of transport, and regulatory environments. Prior to the TMS implementation, transportation processes were largely fragmented, with a mix of legacy systems and manual interventions resulting in limited visibility, inconsistent planning, and challenges in cost control.
Challenges
1. Digital Transformation Initiative: One Global Template for TMS implementation across the globe was required to standardize processes.
2. Integration Complexity: Different SAP systems existed for the Global Company and their India division, requiring complex integration handling.
3. Regulatory Requirements in India: Alcohol is treated as a restricted commodity in India and transportation had to be planned from government bonded warehouses, with geo-fencing and fuel surcharge calculation requirements.
4. Fragmented Transportation Planning: Fragmented transportation planning processes existed across regions like Australia, Africa, and Europe.
5. Multi-Modal Complexity: Difficulty in managing multi-modal transportation operations and ocean freight management for the Europe region.
6. Manual Invoice Reconciliation: High manual effort in resolving discrepancies and queries on invoices submitted by Logistics Service Providers.
7. Legacy System Constraints: Complexity in maintaining contracting models with high use of manual Excel spreadsheets and limited real-time visibility.
Solutions Implemented
1. Blue Yonder TMS Deployment: Centralized transportation planning and execution with a global template for master data creation, tariff uploading, and carrier onboarding.
2. Phased Regional Rollout: Initial pilot in Australia (road transport), followed by Africa, then Europe for ocean freight, and finally India via an integration layer.
3. Middleware Enhancement: Blue Yonder updated its MuleSoft-based middleware (JDA Connect) to address multiple SAP systems integrating with one TMS instance.
4. Network Design Optimization: Used Transportation Modeler (TMOD) for network design optimization and scenario planning using what-if analysis.
5. Real-Time Visibility: Luminate Control Tower implemented for real-time shipment visibility with tracking integrations via FourKites.
6. Freight Audit Automation: Configurable business rules to support multi-region and multi-modal freight audit and settlement.
7. Advanced Analytics & Reporting: Advanced reporting using Cognos including carbon footprint tracking at the executive level.
8. Governance & Compliance: Defined Change Management process with ITGC and GDPR processes implemented and audited by Deloitte.
Benefits
1. Improved Transportation Efficiency: Optimized load planning and routing with business-specific configurations.
2. Real-Time Visibility: Live shipment and inventory visibility across the supply chain network.
3. Reduced Master Data Errors: Integration of Blue Yonder TMS with SAP using iDocs significantly reduced data inconsistencies.
4. Faster Freight Settlement: AP/AR process in TMS enabled faster and more accurate freight audit and payment processes.
5. Better Decision-Making: Advanced analytics aligned with company KPIs including carrier acceptance rate and carbon footprint tracking.
6. Operational Consistency: Standardized processes across regions leading to consistent global operations.
7. Audit Compliance: TMS Change Management process aligned with the global Change Advisory Board; successfully audited by Deloitte.`,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  //  NEW - Agentic AI Case Study
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'agentic-ai-next-frontier',
    featured: false,
    category: 'AI & Automation',
    industry: 'Enterprise Technology',
    client: 'Cross-Industry Analysis',
    title: 'Agentic AI: The Next Frontier in Intelligent Business',
    titleHighlight: 'Agentic AI',
    tagline:
      'How autonomous AI agents are moving beyond generation to action - planning, executing, and adapting entire business workflows end-to-end with measurable enterprise ROI.',
    heroImage: '/Project6.jpg',
    cardImage: '/Project6.jpg',
    date: '2026-03-20',
    problem:
      'Traditional automation is powerful but brittle - it breaks when the unexpected occurs. Generative AI produces outputs on demand but does not own or complete workflows. Enterprises needed AI that could reason, act, and adapt autonomously across entire processes.',
    solution:
      'Agentic AI systems that perceive their environment, plan a path, use tools, observe outcomes, and self-correct - deployed across healthcare documentation, enterprise reporting, manufacturing simulation, and end-to-end hiring workflows.',
    result:
      'AtlantiCare cut clinician documentation time by 42%. A Fortune 500 company reduced reporting from 15 days to 35 minutes at a 99.6% cost reduction. PepsiCo identified 90% of production issues pre-deployment. Average enterprise ROI reached 171%, rising to 192% in US deployments.',
    metrics: [
      { label: 'Average Enterprise ROI',    value: '171%', icon: 'chart' },
      { label: 'Market Growth Rate (CAGR)', value: '40%+', icon: 'bolt'  },
    ],
    tags: ['AI & Automation', 'Agentic AI', 'Enterprise AI', 'Digital Transformation', 'HireOn'],
    content: `Overview
For years, AI has been an impressive assistant - helping people write faster, search smarter, and summarize longer. But a more profound shift is now underway. AI is no longer just answering questions. It is taking action, making decisions, and completing entire workflows on its own. This is the age of Agentic AI.
The difference is not incremental. Generative AI produces outputs when asked. Agentic AI sets goals, plans a path to reach them, uses tools, adapts when conditions change, and delivers results - without waiting to be told what to do at every step. It is the difference between an employee who only works when spoken to and one who independently owns a process from start to finish.
What It Is and Why It Matters
An AI agent perceives its environment, reasons about what needs to happen, takes action, observes the outcome, and loops back to refine its approach. In practical terms, an agent given the task of processing vendor invoices does not need to be told each step - it opens the inbox, extracts the data, matches it against purchase orders, flags exceptions, and files the rest. A traditional automation script breaks when something unexpected appears. An agent adapts.
That resilience is what makes agentic AI categorically different from everything that came before it. Automation has always been powerful but brittle. Agentic AI is powerful and durable - and that combination is driving one of the fastest market expansions in enterprise technology history.
The Numbers
The global agentic AI market was valued at $7.6 billion in 2025 and is projected to reach $10.8 billion in 2026, growing at a compound annual rate above 40%. By 2034, projections place the market between $139 billion and $196 billion. Gartner predicts that 40% of enterprise applications will include task-specific AI agents by end of 2026, up from less than 5% just a year earlier. By 2028, agents are expected to handle 15% of routine work decisions autonomously.
Adoption is accelerating at every level. 79% of organizations have adopted AI agents in some form, and 96% plan to expand their usage. Companies with agents in production report an average ROI of 171%, with US enterprises reaching 192% - three times the return of traditional automation.
Where It Is Working
In healthcare, an agentic clinical assistant deployed by AtlantiCare cut documentation time by 42%, freeing 66 minutes per clinician per day. In enterprise reporting, a Fortune 500 company reduced report generation from 15 days to 35 minutes, with the cost per report dropping from $2,200 to $9. In manufacturing, PepsiCo uses AI agents in digital twin simulations to identify up to 90% of production issues before any physical changes are made, already delivering a 20% increase in throughput.
In telecommunications - the industry with the highest agentic AI adoption at 48% - agents are managing customer service, network fault detection, and resolution workflows at a scale human teams simply cannot match.
The Trends Defining 2026
Multi-agent systems are becoming the standard approach. Rather than one agent trying to do everything, organisations are deploying networks of specialist agents that coordinate across tasks and hand context between each other - similar to building a well-structured team rather than relying on a single generalist.
Low-code platforms are making agent deployment accessible to business users, not just engineers. Building a functional agent on leading platforms now takes between 15 and 60 minutes. This is collapsing the time between spotting an opportunity and capturing the value from it.
Governance is emerging as the defining factor between successful deployments and expensive failures. Gartner warns that over 40% of agentic AI projects risk cancellation by 2027 due to unclear business value and weak governance. The organisations that succeed treat auditability, human oversight, and clear decision boundaries as core design requirements, not optional extras.
The Honest Challenges
Only 11% of organisations currently run AI agents in genuine production environments, despite 79% claiming some form of adoption. This gap is the central challenge of 2026. Integrating agents into real data systems, legacy workflows, and accountability structures is genuinely hard - and those who underestimate it pay for it in failed pilots.
Bias, cybersecurity risk, and over-automation of relationship-intensive processes are also real concerns. Agents trained on historical data inherit past patterns, including inequitable ones. And as agents gain access to more systems, the attack surface grows. Only 21% of companies are on track to have mature AI governance frameworks by 2028 - a significant vulnerability.
What Separates Success from Failure
Successful deployments share a consistent pattern: they start specific. A single, well-defined, high-volume workflow beats a broad ambition every time. They invest in clean data before deploying agents. They keep humans in the loop for high-stakes decisions and measure outcomes from day one, not in retrospect.
A Closing Example: Hireon by Acespire
Recruiting is one of the clearest illustrations of what agentic AI can do. Traditional hiring is a chain of manual handoffs - posting jobs, reading applications, scheduling calls, chasing responses, coordinating calendars - spread across days and dependent on human coordination at every step. It does not scale without adding headcount, and it is inconsistent under volume pressure.
Agentic hiring changes this entirely. An agent reads the job brief, sources candidates across multiple channels, ranks applicants, sends personalised outreach, schedules interviews, and moves qualified individuals through the pipeline as a continuous, coordinated workflow. Research shows these systems can achieve candidate response rates of 35–45%, compared to 8–12% with manual templated emails.
Hireon, an agentic AI product built by Acespire Solutions, is designed to do exactly this - automating the hiring process end to end, from sourcing through scheduling, with minimal manual handoffs. It is a practical example of what happens when agentic AI is applied to a genuine, high-volume business problem rather than a theoretical one.
Conclusion
Agentic AI is not a concept being evaluated in research labs. It is in production today, cutting costs, compressing timelines, and delivering outcomes that traditional automation and generative AI tools could not reach. The market is growing at over 40% per year. The ROI is proven. And the gap between organisations that have moved to production and those still in experiments is widening every quarter.
The question is no longer whether agentic AI matters. It clearly does. The only remaining question is how quickly your organisation decides to move.
Agentic AI does not just automate tasks. It changes what an organisation is capable of - and that is a fundamentally different kind of value.`,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  //  NEW - Automation Case Study
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'automation-modern-business',
    featured: false,
    category: 'AI & Automation',
    industry: 'Cross-Industry',
    client: 'Cross-Industry Analysis',
    title: 'Automation in Modern Business: Trends, Realities, and What Comes Next',
    titleHighlight: 'Automation in Modern Business',
    tagline:
      'A comprehensive look at how business process automation is reshaping operations - from RPA and intelligent automation to hyperautomation - and the proven practices that separate successful deployments from stalled pilots.',
    heroImage: '/Project7.jpg',
    cardImage: '/Project7.jpg',
    date: '2026-03-10',
    problem:
      'Skilled labour shortages, rising cost pressure, and accelerating competition are making manual operations unsustainable. Yet 69% of organizations remain stuck in pilot mode - unable to scale automation beyond isolated experiments.',
    solution:
      'A layered automation strategy combining RPA for high-volume rule-based tasks, AI-powered intelligent automation for exception handling and unstructured data, and hyperautomation frameworks that orchestrate multiple technologies into self-improving processes.',
    result:
      'Organizations averaging 200% ROI in year one, 240 hours saved per employee annually, 22% reduction in operational costs over three years, and 95% HR professional satisfaction with automation outcomes.',
    metrics: [
      { label: 'Average First-Year ROI',         value: '200%', icon: 'chart' },
      { label: 'Hours Saved Per Employee / Year', value: '240',  icon: 'bolt'  },
    ],
    tags: ['AI & Automation', 'RPA', 'Hyperautomation', 'Business Process', 'Digital Transformation'],
    content: `Overview
A decade ago, automation was a buzzword reserved for large enterprises with deep pockets and bigger ambitions. Today, it is the operational backbone of businesses of every size - and the gap between those who have adopted it and those who haven't is widening fast.
The global Business Process Automation market crossed $15.8 billion in 2025 and is on track to nearly double by 2030. More tellingly, 66% of companies worldwide have already automated at least one core business process, and projections suggest that figure will climb past 85% by 2029. Automation is no longer an experiment. It is a baseline expectation.
Why Automation Has Become Non-Negotiable
The business case for automation has never been stronger - or more urgent. Three forces have converged to make it a strategic necessity rather than a nice-to-have.
The first is the talent gap. Skilled labor shortages across industries - from logistics and finance to healthcare and software development - have made it unsustainable to rely on headcount alone to scale operations. Organizations are being asked to do more with the same, or fewer, people. Automation fills that gap without requiring recruitment, training, or benefits.
The second is cost pressure. Research consistently shows that organizations implementing automation see an average cost reduction of 22% within three years of adoption. RPA software costs roughly one-third of what an offshore full-time employee costs for the same workload, and one-fifth of what an onshore worker costs. The math is simple - and the savings compound year over year.
The third is the pace of competition. In almost every industry, the fastest company wins. Automation is one of the most direct levers a business can pull to improve speed - whether that means approving a loan faster, shipping an order sooner, or resolving a customer complaint in real time.
What Automation Looks Like Today
Modern automation is not a single technology. It is a layered ecosystem of tools and approaches.
Robotic Process Automation (RPA) remains the most widely deployed technology, present in 31% of all implementations. It works by deploying software bots that replicate human actions - clicking through interfaces, copying data, filling forms, sending routine emails. It is fast to deploy and delivers a visible return quickly.
AI-Powered and Intelligent Automation represents the most significant shift of the past two years. AI-enabled automation can read documents, interpret language, make contextual decisions, and learn from new data over time. The machine learning segment of the automation market is growing at a 22.6% compound annual rate. A major global bank deployed an AI-powered threat detection system and saw a 75% improvement in detection speed, a 99.9% reduction in false positives, and a 60% drop in manual investigation time - all without adding a single analyst.
Hyperautomation is the strategy of combining multiple automation technologies - RPA, AI, process mining, analytics, and workflow orchestration - to automate as many business processes as possible, continuously. Gartner predicts that by 2028, 33% of enterprise software applications will include agentic AI capabilities enabling roughly 15% of routine work decisions to be made autonomously.
Where It Is Working
Automation delivers returns across virtually every business function. Finance and accounts payable remain high-opportunity areas - 25% of AP departments still operate without any automation, and 73% report struggles with basic purchase order matching. In HR, automation adoption has surged by nearly 600% in recent years, with 95% of HR professionals reporting satisfaction with automation tools. Sales teams are saving an estimated 2 hours and 15 minutes per day - roughly 500 hours per salesperson per year - through automated data entry, lead scoring, and pipeline reporting. Healthcare now processes more than 30 billion automated tasks annually.
Despite these success stories, scaling remains the central unsolved problem. Only 31% of organizations have managed to scale automation from successful pilots to enterprise-wide programs. 78% of businesses cite complex workflows as the primary blocker, followed by legacy system integration and underestimated change management requirements.
The Trends Defining 2025 and 2026
Low-code and no-code platforms are democratizing automation. Today, 89% of developers incorporate low-code tools, and the trend is extending to operations managers, finance analysts, and HR teams who are building and deploying automations without writing a single line of code.
Cloud-based automation is growing faster than on-premise solutions and is projected to dominate by 2035 - cheaper to deploy, easier to update, and simpler to scale across distributed teams.
Agentic AI represents the most significant shift on the horizon. Unlike traditional automation that executes predefined rules, AI agents interpret context, make decisions, and course-correct in real time. Organizations experimenting with agentic AI today are building a capability that will be very difficult for competitors to replicate quickly.
What Successful Automation Actually Requires
The organizations that get the most from automation share consistent practices. They start with process clarity - mapping how a process actually works today, not how it looks on paper. This step alone surfaces inefficiencies that would otherwise get automated into permanent problems.
The highest-ROI targets are almost always high-volume, rule-based, and error-prone - invoice processing, employee onboarding, report generation, IT ticket routing. The most common failure mode is treating automation as a technology project rather than a business transformation. When owned entirely by IT without a clear business sponsor and measurable outcomes, it stays in pilot mode indefinitely.
The human side cannot be ignored. Fear of job displacement, while largely unfounded by the data, is real. Organizations that invest in retraining and are transparent about how roles will evolve see far higher adoption rates. Technology is rarely the hard part. The people almost always are.
Conclusion
Automation has moved through hype and arrived at something more durable: it is simply how modern businesses operate. The market is growing, the tools are maturing, the ROI is proven, and the cost of inaction is rising. Organizations averaging a 200% return in the first year, saving 240 hours per employee annually, and reducing operational costs by 22% over three years are not outliers - they are following a well-documented playbook.
The future of business belongs to organizations that can move faster, operate leaner, and adapt continuously. Automation is the most direct path to all three.`,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  //  EXISTING - Automobile Integration
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'automobile-integration',
    featured: false,
    category: 'Digital Transformation',
    industry: 'Automotive',
    client: 'Major Automobile Company',
    title: 'Integration Project for a Major Automobile Company',
    titleHighlight: 'Major Automobile Company',
    tagline:
      'Streamlining supplier-manufacturer collaboration through a centralized communication platform, reducing lead times and increasing supply chain visibility.',
    heroImage: '/Project1.jpg',
    cardImage: '/Project1.jpg',
    date: '2025-11-21',
    problem:
      'Disjointed communication and inaccurate data caused inefficiencies across third-party services. Teams lacked a single cohesive view of orders, inventory, and quality reports.',
    solution:
      'Implemented a centralized dashboard with automated ETL processes, real-time data refresh, a supplier collaboration portal, and predictive supply chain logic.',
    result:
      'Improved data accuracy, better supplier collaboration, optimized workflows, and reduced administrative burden through automation.',
    metrics: [
      { label: 'Operational Efficiency', value: '↑', icon: 'chart' },
      { label: 'Manual Effort',          value: '↓', icon: 'bolt'  },
    ],
    tags: ['Supply Chain', 'Data Integration', 'ETL', 'Dashboard', 'Automotive'],
    content: `Overview
In the fiercely competitive automotive sector, effective supplier and manufacturer collaboration is essential to operational optimization and customer satisfaction. Through the implementation of a cutting-edge, centralized communication system, this project sought to improve the connection between a major automotive firm and its suppliers.
Simplifying data communication for orders, inventory, manufacturing schedules, and quality reports was the aim. To offer a consolidated view of vital data, including master data, inventory, sales projections, and user management, a powerful dashboard was created. Lead times were shortened, visibility was increased, and a cooperative environment with the supplier network was promoted by this centralized approach.
Background
Managing a huge and complex supply chain was a difficulty for the corporation, which operated globally. Disjointed communication and inaccurate data frequently resulted in inefficiencies for third-party services, such as vendors and suppliers.
Internal and external data were combined into a single dashboard that was introduced by the project. The problems of inefficiency and lack of transparency were addressed via a collaborative site that gave vendors and suppliers access to updates and progress reports.
Challenges
1. Limited Visibility of Inventory: Delays occurred because teams did not have a single, cohesive view of vital data. High operating costs were caused by the increased time and resource consumption of manual processes.
2. Inaccurate Lead Times for Suppliers: Schedules were thrown off due to delays brought on by the lack of predictive technology.
3. Decision-making was slowed down by siloed systems, which were incomplete tools.
Solutions Implemented
1. A centralized dashboard gave stakeholders and departments a single, cohesive picture of the data.
2. Data is standardized, cleansed, and transformed for real-time use using automated ETL processes.
3. Real-Time Updates: Accurate and useful insights were guaranteed by a daily data refresh.
4. Collaboration Portal: Enhanced transparency and communication with suppliers.
5. Predictive supply chain logic includes route planning that is efficient and anticipates delays.
6. Automated Notifications: Proactive problem solving was ensured via error and update alerts.
Benefits
1. Improved Data Accuracy: Reliable, clear data for decision-making was guaranteed by automated procedures.
2. Better Supplier Collaboration: Operations were expedited by transparency and real-time information.
3. Operational Efficiency: Workflows were optimized and downtime was decreased via synchronized systems.
4. Scalability: Future growth and higher data volumes are supported by the system.
5. Savings: Automation reduced administrative burden and manual intervention.
6. Improved Decision-Making: Proactive and strategic planning were made possible by centralized insights.`,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  //  EXISTING - Transport Manufacturing Optimization
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'transport-manufacturing-optimization',
    featured: false,
    category: 'Supply Chain',
    industry: 'Transport Manufacturing',
    client: 'Italian Multinational Transport Vehicle Manufacturer',
    title: 'Supply Chain Optimization for a Global Transport Manufacturing Company',
    titleHighlight: '',
    tagline:
      'AI-driven forecasting and comprehensive supply chain visibility to enhance demand planning, inventory optimization, and production schedule synchronization.',
    heroImage: '/Project2.jpg',
    cardImage: '/Project2.jpg',
    date: '2025-02-17',
    problem:
      'Slow query performance, ETL bottlenecks, data source heterogeneity, and inefficient incremental data loads hampered decision-making across global operations.',
    solution:
      'Performance-optimized indexing, SSIS lookup caches, staging tables, change data capture (CDC), and robust data quality validation routines.',
    result:
      'Improved demand and supply planning, enhanced real-time decision-making, increased operational efficiency, and support for green vehicle sustainability goals.',
    metrics: [
      { label: 'Forecast Accuracy', value: '↑', icon: 'chart' },
      { label: 'ETL Performance',   value: '↑', icon: 'bolt'  },
    ],
    tags: ['Supply Chain', 'AI Forecasting', 'ETL', 'SSIS', 'Manufacturing'],
    content: `Introduction
Optimizing supply chain, planning, and decision-making for commercial vehicles and industrial engines is crucial. The Italian multinational transport vehicle manufacturing company utilizes AI-driven forecasting and a comprehensive view of its supply chain to enhance demand forecasting, inventory planning, and synchronize production schedules efficiently.
Background
Operating in a dynamic global market, the company manufactures and distributes commercial vehicles, buses, and industrial engines. Serving the transportation, construction, and logistics industries, its key regions include:
1. Europe: Home market, significant revenue from light and heavy-duty trucks.
2. Americas: Expanding in North America; strong presence in Brazil and Argentina.
3. Asia-Pacific: Key markets in Japan and India, experiencing rapid growth.
4. Middle East & Africa: Emerging markets with growing demand.
5. China: Focus on cleaner energy vehicles and infrastructure development.
Challenges
1. Slow Query Performance: Large datasets and inefficient indexing strategies.
2. ETL Processing Bottlenecks: Performance issues in SSIS data processing.
3. Data Source Heterogeneity: Complex integration of diverse data formats.
4. Incremental Data Load: Managing incremental updates efficiently.
Solutions Implemented
1. Performance Optimization: Improved indexing, batch processing, and parallel execution.
2. Data Integration Techniques: SSIS lookup caches, staging tables, and change data capture (CDC).
3. Data Quality Improvements: Robust validation rules and data cleansing routines.
4. Resource Management: Scaling SQL Server resources and optimizing memory usage in SSIS packages.
Benefits
1. Improved Demand and Supply Planning: Accurate AI-driven forecasting and optimized supply chain.
2. Enhanced Decision-Making: Real-time analytics for data-driven decisions and scenario planning.
3. Increased Operational Efficiency: Automated processes and cost savings.
4. Sustainability and Green Initiatives: Efficient resource usage and support for green vehicles.
5. Scalability and Flexibility: Seamless integration with existing systems and future technologies.
Conclusion
This project enhances demand forecasting, supply chain visibility, and operational efficiency while aligning with sustainability objectives. By overcoming challenges through real-time analytics and automated processes, the company is positioned for growth and competitiveness in a dynamic market.`,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  //  EXISTING - Semiconductor Dashboard
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'semiconductor-dashboard',
    featured: false,
    category: 'Digital Transformation',
    industry: 'Semiconductor',
    client: 'Large Semiconductor Company',
    title: 'Centralized Dashboard for a Large Semiconductor Company',
    titleHighlight: '',
    tagline:
      'Integrating master data, inventory, sales, and forecasts into a unified real-time dashboard to eliminate data silos and enable faster decision-making.',
    heroImage: '/Project3.jpg',
    cardImage: '/Project3.jpg',
    date: '2025-01-15',
    problem:
      'Fragmented systems, segregated data, and inconsistent communication led to inefficiencies, delays, and higher costs across the complex global supply chain network.',
    solution:
      'Centralized dashboard with automated ETL, real-time updates, a third-party collaboration portal for suppliers, predictive analytics, and automated alerts.',
    result:
      'Unified data visibility, reduced operational costs, streamlined supplier collaboration, and faster responses to supply chain disruptions.',
    metrics: [
      { label: 'Cost Efficiency',  value: '↑', icon: 'chart' },
      { label: 'Decision Speed',   value: '↑', icon: 'bolt'  },
    ],
    tags: ['Supply Chain', 'Data Integration', 'Dashboard', 'ETL', 'Semiconductor'],
    content: `Overview
Master data, transactional data, inventory, sales, and forecasts were among the crucial data that the project sought to integrate into an easy-to-use, unified user interface/dashboard. This solution was created to give the business real-time visibility, streamline operations, and enable data-driven decision-making.
The main goal was to use ETL (Extract, Transform, Load) procedures to automate the conversion of unstructured, inconsistent raw data - which came from CSV files, APIs, and other forms - into clear, usable representations. This ensured that the dashboard showed precise and organized data for supply chain management in real-time or near real-time.
Background
The Americas, EMEA, Asia, India, and Japan are among the company's primary regions of operation. Vendors and suppliers are examples of third-party services that are crucial to a complicated supply chain network. Prior to deployment, inefficiencies, delays, and higher expenses were caused by fragmented systems, segregated data, and inconsistent communication.
Challenges
1. Insufficient Inventory Visibility: Data verification required manual, time-consuming departmental coordination because teams lacked a uniform perspective of crucial data.
2. Exorbitant Operating Expenses: Repetitive meetings and manual data verification procedures used a lot of resources, which increased operating and transportation expenses.
3. Variations in Lead Times for Suppliers: Suppliers' unpredictable lead times resulted in shipment delays, which upset timetables and decreased the dependability of the supply chain.
4. Data Silos Across Systems: Limited integration between existing systems created disconnected data streams, slowing decision-making and increasing errors in planning.
Solutions Implemented
1. Centralized Dashboard: Developed a unified UI to provide visibility into Master Data, Inventory, Sales, and Forecasts, reducing dependency on cross-departmental communication.
2. Automated ETL Processes: Extract from APIs and CSVs, Transform by standardizing formats and applying business logic, Load structured data into the backend for accurate dashboard display.
3. Real-Time Updates: Designed to update daily or near real-time based on data availability.
4. Third-Party Collaboration Portal: Integrated a portal allowing suppliers and vendors to access live updates, reducing communication gaps and improving coordination.
5. Predictive Analytics: Leveraged historical data for predictive lead time analysis and route optimization to preempt delays.
6. Automated Notifications: Implemented automated alerts for errors, missing inventory, and system updates.
Benefits
1. Unified Data Visibility: Centralized access eliminated manual checks and delays.
2. Cost Efficiency: Automation and optimized logistics reduced operational expenses.
3. Streamlined Collaboration: The supplier portal improved real-time communication.
4. Faster Decisions: Real-time updates enabled quicker responses to challenges.
5. Scalability: Designed to handle growing data volumes and future business needs.`,
  },
];

export default caseStudies;

export const categories = [
  'All',
  'Supply Chain',
  'AI & Automation',
  'Cloud Tech',
  'Digital Transformation',
];