export interface ScoreCard {
	id: string;
	idea: string;
	overallScore: number;
	verdict: string;
	dimensions: {
		problemClarity: number;
		marketSize: number;
		competition: number;
		execution: number;
	};
	ycVerdict: 'YES' | 'MAYBE' | 'PASS';
	ycReason: string;
	killerInsight: string;
	weakestArea: keyof ScoreCard['dimensions'];
	createdAt: string;
}

export interface AnalysisStep {
	label: string;
	status: 'pending' | 'active' | 'complete';
}

export type AppState = 'input' | 'analyzing' | 'result';

export interface SpawnerRecommendation {
	skill: string;
	pitch: string;
	link: string;
}
