/**
 * Fire Danger Rating Utility
 * Inspired by the McArthur Forest Fire Danger Index (FFDI)
 * Provides a simplified fire danger assessment based on weather parameters
 */

export type FireDangerLevel = 'low' | 'moderate' | 'high' | 'severe' | 'extreme';

export interface FireDangerAssessment {
  level: FireDangerLevel;
  color: string;
  description: string;
  score: number;
}

/**
 * Calculate simplified fire danger based on temperature, humidity, and wind speed
 * Returns a fire danger level and assessment
 */
export function calculateFireDanger(
  temperature: number,
  humidity: number,
  windSpeedKph: number
): FireDangerAssessment {
  // Simplified McArthur-inspired scoring system
  let score = 0;

  // Temperature contribution (0-40 points)
  // Higher temps increase fire danger
  if (temperature >= 35) {
    score += 40;
  } else if (temperature >= 30) {
    score += 30;
  } else if (temperature >= 25) {
    score += 20;
  } else if (temperature >= 20) {
    score += 10;
  }

  // Humidity contribution (0-40 points)
  // Lower humidity increases fire danger
  if (humidity <= 20) {
    score += 40;
  } else if (humidity <= 30) {
    score += 30;
  } else if (humidity <= 40) {
    score += 20;
  } else if (humidity <= 50) {
    score += 10;
  }

  // Wind speed contribution (0-20 points)
  // Higher winds increase fire danger
  if (windSpeedKph >= 40) {
    score += 20;
  } else if (windSpeedKph >= 30) {
    score += 15;
  } else if (windSpeedKph >= 20) {
    score += 10;
  } else if (windSpeedKph >= 10) {
    score += 5;
  }

  // Determine fire danger level
  let level: FireDangerLevel;
  let description: string;
  let color: string;

  if (score >= 90) {
    level = 'extreme';
    description = 'EXTREME - Severe threat to life and property';
    color = 'bg-red-900 text-white';
  } else if (score >= 75) {
    level = 'severe';
    description = 'SEVERE - Significant threat to life and property';
    color = 'bg-red-600 text-white';
  } else if (score >= 50) {
    level = 'high';
    description = 'HIGH - Considerable threat to life and property';
    color = 'bg-orange-600 text-white';
  } else if (score >= 25) {
    level = 'moderate';
    description = 'MODERATE - Possible threat to lives and homes';
    color = 'bg-yellow-500 text-black';
  } else {
    level = 'low';
    description = 'LOW - Fire risk is low';
    color = 'bg-green-600 text-white';
  }

  return {
    level,
    color,
    description,
    score: Math.round(score)
  };
}

/**
 * Get fire danger color for display purposes
 */
export function getFireDangerColor(level: FireDangerLevel): string {
  const colors: Record<FireDangerLevel, string> = {
    low: 'bg-green-600 dark:bg-green-700',
    moderate: 'bg-yellow-500 dark:bg-yellow-600',
    high: 'bg-orange-600 dark:bg-orange-700',
    severe: 'bg-red-600 dark:bg-red-700',
    extreme: 'bg-red-900 dark:bg-red-950'
  };
  return colors[level];
}

/**
 * Get fire danger text color for display purposes
 */
export function getFireDangerTextColor(level: FireDangerLevel): string {
  const colors: Record<FireDangerLevel, string> = {
    low: 'text-green-900',
    moderate: 'text-yellow-900',
    high: 'text-orange-900',
    severe: 'text-red-900',
    extreme: 'text-red-950'
  };
  return colors[level];
}
