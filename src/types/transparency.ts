export interface DonationRecord {
  id: string;
  month: string;
  actualSales: number;
  carriedOver: number;
  rounding: number;
  totalTrees: number;
  rollover: number;
  receiptUrl: string;
  status: "pending" | "completed";
}

export interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  startDate: string;
  reachedDate: string | null;
  status: "current" | "completed";
}

export interface TransparencyStats {
  planted: number;
  goal: number;
  percentage: number;
}

export interface TransparencyData {
  stats: TransparencyStats;
  records: DonationRecord[];
  goals: Goal[];
}
