import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title }: { title: string }) {
  const fullTitle = `${title} | IWS Sovereignty`;
  const description = "Institutional structural shielding for capital preservation.";
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
}
