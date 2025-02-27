import React from 'react';
import DarkForestEffects from '../components/DarkForestEffects';

// Default implementation, that you can customize
export default function Root({children}: {children: React.ReactNode}): React.ReactNode {
  return (
    <>
      <DarkForestEffects />
      {children}
    </>
  );
}
