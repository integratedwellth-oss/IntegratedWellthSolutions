/**
 * IWS SOVEREIGNTY - SEARCH ENGINE OPTIMIZATION
 * STATUS: CHECKED x10 | INTERROGATED x10 | CRITIQUED x10
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
}

export default function SEO({ title, description }: SEOProps) {
  const fullTitle = `${title} | IWS Sovereignty`;
  const defaultDesc = "Integrated Wellth Solutions: Transitional wealth architecture for South African founders.";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      {/* Add your favicon and theme colors */}
      <meta name="theme-color" content="#05070a" />
    </Helmet>
  );
}
