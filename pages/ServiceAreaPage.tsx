import React from 'react';
import { Section, PageHeader } from '../components/Section';
import { MapPin } from 'lucide-react';

export const ServiceAreaPage: React.FC = () => {
  const areas = [
    "Brixton", "Peckham", "Clapham", "Croydon", "Stratford", "Hackney", "Dalston", "Camberwell"
  ];

  return (
    <>
      <PageHeader title="Areas We Serve" subtitle="Conveniently located in South London, serving clients city-wide." />
      <Section>
          <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center text-slate-400 font-bold text-xl border-2 border-dashed border-slate-300">
                  Google Maps Integration Placeholder
              </div>
              <div>
                  <h3 className="text-2xl font-serif text-primary mb-6">Our Studio Location</h3>
                  <p className="mb-8 text-slate-600">
                      We are located at 123 High Street, Brixton, SW2 1AA.<br/>
                      Easily accessible via the Victoria Line.
                  </p>
                  <h4 className="text-lg font-bold mb-4">Primary Catchment Areas</h4>
                  <ul className="grid grid-cols-2 gap-4">
                      {areas.map(area => (
                          <li key={area} className="flex items-center gap-2 text-slate-700">
                              <MapPin className="w-4 h-4 text-secondary" />
                              {area}
                          </li>
                      ))}
                  </ul>
              </div>
          </div>
      </Section>
    </>
  );
};