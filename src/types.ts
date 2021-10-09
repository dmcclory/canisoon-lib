export interface UsageSnapshot {
  percentage: number;
  date: Date;
};

export interface Feature {
  name: string;
  slug: string;
  latestPercentage: number;
  description: string;
  categories: string[];
  usageSnapshots: UsageSnapshot[];
}


export interface CaniuseFeatureData {
  title: string;
  usage_perc_y: number;
  description: string;
  categories: string[];
}


export interface CaniuseData { 
  [index: string]: CaniuseFeatureData
}

export interface CaniuseSnapshot {
  date: Date;
  data: CaniuseData
}

export interface FeatureSummary {
  [index: string]:  Feature;
}

export interface TimestampedHash {
  date: Date;
  hash: string;
};
