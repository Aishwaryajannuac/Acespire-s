// ─── CASE STUDIES DATA ────────────────────────────────────────────────────────
// Category options: 'Supply Chain' | 'AI & Automation' | 'Cloud Tech' | 'Digital Transformation'
// All 5 existing case studies are genuinely Supply Chain — not force-assigned to other categories.
// Add new ones in future by pushing to this array (or replace with API fetch from n8n).

const caseStudies = [
  {
    id: 'automobile-integration',
    featured: true,
    category: 'Digital Transformation',
    industry: 'Automotive',
    client: 'Major Automobile Company',
    title: 'Integration Project for a Major Automobile Company',
    titleHighlight: 'Major Automobile Company',
    tagline:
      'Streamlining supplier-manufacturer collaboration through a centralized communication platform, reducing lead times and increasing supply chain visibility.',
    heroImage: '/Project1.jpg',
    cardImage: '/Project1.jpg',
    date: 'Nov 21, 2025',
    problem:
      'Disjointed communication and inaccurate data caused inefficiencies across third-party services. Teams lacked a single cohesive view of orders, inventory, and quality reports.',
    solution:
      'Implemented a centralized dashboard with automated ETL processes, real-time data refresh, a supplier collaboration portal, and predictive supply chain logic.',
    result:
      'Improved data accuracy, better supplier collaboration, optimized workflows, and reduced administrative burden through automation.',
    metrics: [
      { label: 'Operational Efficiency', value: '↑', icon: 'chart' },
      { label: 'Manual Effort', value: '↓', icon: 'bolt' },
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
    date: 'Feb 17, 2025',
    problem:
      'Slow query performance, ETL bottlenecks, data source heterogeneity, and inefficient incremental data loads hampered decision-making across global operations.',
    solution:
      'Performance-optimized indexing, SSIS lookup caches, staging tables, change data capture (CDC), and robust data quality validation routines.',
    result:
      'Improved demand and supply planning, enhanced real-time decision-making, increased operational efficiency, and support for green vehicle sustainability goals.',
    metrics: [
      { label: 'Forecast Accuracy', value: '↑', icon: 'chart' },
      { label: 'ETL Performance', value: '↑', icon: 'bolt' },
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
    date: 'Jan 15, 2025',
    problem:
      'Fragmented systems, segregated data, and inconsistent communication led to inefficiencies, delays, and higher costs across the complex global supply chain network.',
    solution:
      'Centralized dashboard with automated ETL, real-time updates, a third-party collaboration portal for suppliers, predictive analytics, and automated alerts.',
    result:
      'Unified data visibility, reduced operational costs, streamlined supplier collaboration, and faster responses to supply chain disruptions.',
    metrics: [
      { label: 'Cost Efficiency', value: '↑', icon: 'chart' },
      { label: 'Decision Speed', value: '↑', icon: 'bolt' },
    ],
    tags: ['Supply Chain', 'Data Integration', 'Dashboard', 'ETL', 'Semiconductor'],
    content: `Overview
Master data, transactional data, inventory, sales, and forecasts were among the crucial data that the project sought to integrate into an easy-to-use, unified user interface/dashboard. This solution was created to give the business real-time visibility, streamline operations, and enable data-driven decision-making.
The main goal was to use ETL (Extract, Transform, Load) procedures to automate the conversion of unstructured, inconsistent raw data — which came from CSV files, APIs, and other forms — into clear, usable representations. This ensured that the dashboard showed precise and organized data for supply chain management in real-time or near real-time.
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

  {
    id: 'alcobev-tms',
    featured: false,
    category: 'Supply Chain',
    industry: 'FMCG / AlcoBev',
    client: 'Global AlcoBev Leader',
    title: 'Blue Yonder TMS Implementation for a Major AlcoBev Company',
    titleHighlight: '',
    tagline:
      'Modernizing transportation planning, execution, and visibility across global logistics operations using Blue Yonder TMS.',
    heroImage: '/Project4.jpg',
    cardImage: '/Project4.jpg',
    date: 'Apr 9, 2026',
    problem:
      'Fragmented transportation processes, mixed legacy systems, manual interventions, and complex multi-modal and multi-region operations with limited visibility and inconsistent planning.',
    solution:
      'Blue Yonder TMS deployment with phased regional rollout, MuleSoft middleware enhancement, real-time visibility via Luminate Control Tower, freight audit automation, and advanced Cognos reporting.',
    result:
      'Optimized load planning, real-time shipment visibility, reduced master data errors, faster freight settlement, and standardized global operations audited by Deloitte.',
    metrics: [
      { label: 'Freight Settlement Speed', value: '↑', icon: 'chart' },
      { label: 'Operational Consistency', value: '↑', icon: 'bolt' },
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

  {
    id: 'fmcg-wms',
    featured: false,
    category: 'Supply Chain',
    industry: 'FMCG',
    client: 'Major Indian FMCG Company',
    title: 'Blue Yonder WMS Implementation for a Major Indian FMCG Company',
    titleHighlight: '',
    tagline:
      'Transforming warehouse operations through automation and standardization — optimizing inbound/outbound logistics and enabling scalable warehouse management.',
    heroImage: '/Project5.jpg',
    cardImage: '/Project5.jpg',
    date: 'Apr 15, 2026',
    problem:
      'Legacy systems and manual processes created challenges in handling complex warehouse operations: inefficient space utilization, picking productivity issues, and integration challenges with ERP systems.',
    solution:
      'Blue Yonder WMS deployment with rule-based putaway strategies, wave processing, advanced allocation logic, WMS-WLM integration, and custom reporting for operational visibility.',
    result:
      'Optimized warehouse space, enhanced inbound efficiency, increased picking productivity, faster order fulfillment, and standardized processes across all distribution center locations.',
    metrics: [
      { label: 'Picking Productivity', value: '↑', icon: 'chart' },
      { label: 'Order Accuracy', value: '↑', icon: 'bolt' },
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
];

export default caseStudies;

export const categories = ['All', 'Supply Chain', 'AI & Automation', 'Cloud Tech', 'Digital Transformation'];