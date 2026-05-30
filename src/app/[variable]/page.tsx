import React from 'react';
import { notFound } from 'next/navigation';
import { ClimateVariable } from '@/lib/chartData';
import VariablePageClient from './VariablePageClient';

const VALID_VARIABLES: ClimateVariable[] = [
  'temperature', 'rainfall', 'humidity', 'evaporation', 'wind', 'sunshine', 'pressure'
];

export function generateStaticParams() {
  return VALID_VARIABLES.map(variable => ({
    variable,
  }));
}

interface Props {
  params: { variable: string };
}

export default function VariablePage({ params }: Props) {
  const variable = params.variable as ClimateVariable;

  if (!VALID_VARIABLES.includes(variable)) {
    notFound();
  }

  return <VariablePageClient variable={variable} />;
}
