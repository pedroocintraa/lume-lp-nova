import React from 'react';

export interface AnalysisResult {
  emotionalTone: string;
  hiddenSubtext: string;
  advice: string;
  safetyScore: number; // 0 to 100
}

export interface TestimonialProps {
  name: string;
  role: string;
  text: string;
  image: string;
}

export interface FeatureProps {
  title: string;
  description: string;
  icon: React.ElementType;
}