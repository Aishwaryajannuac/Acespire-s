import React from 'react';
import useInView from '../hooks/useInView';

/* 
  Place these images in your /public folder:
    /partner-o9.png
    /partner-aws.png
    /partner-databricks.png
    /partner-snowflake.png
*/
const partners = [
  { id: 'o9',         src: '/O9-logo.png',         alt: 'o9 Solutions'  },
  { id: 'aws',        src: '/Aws-logo.png',         alt: 'Amazon AWS'    },
  { id: 'databricks', src: '/Databricks-logo.png',  alt: 'Databricks'    },
  { id: 'snowflake',  src: '/Snowflake-logo.png',   alt: 'Snowflake'     },
];

const PartnersSection = () => {
  const [ref, inView] = useInView();

  return (
   <section ref={ref} className="partners-section relative py-10 border-y overflow-hidden"
  style={{ backgroundColor: '#13161f', borderColor: 'rgba(255,255,255,0.08)' }}>
      {/* Subtle edge lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-accent/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-accent/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center gap-8 lg:gap-16">

          {/* Label */}
          <span
            className="partners-label text-xs font-body font-semibold tracking-[0.2em] uppercase text-muted/70 whitespace-nowrap shrink-0"
            style={{
              color: '#8892a4',
              opacity:   inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-20px)',
              transition: 'all 0.6s ease',
            }}
          >
            Strategic Partners:
          </span>

          <div className="hidden sm:block w-px h-8 bg-border shrink-0" />

          {/* Partner logos */}
          <div className="flex items-center justify-center sm:justify-start flex-wrap gap-12 lg:gap-20">
            {partners.map((p, i) => (
              <div
                key={p.id}
                className="group cursor-pointer"
                style={{
                  opacity:   inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(15px)',
                  transition: `all 0.5s ease ${0.15 + i * 0.1}s`,
                }}
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  className="h-auto w-auto object-contain opacity-55 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
