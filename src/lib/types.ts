export interface ScoreCard {
	id: string;
	idea: string;
	pmfScore: number; // Overall PMF Potential score (average of all dimensions)
	verdict: string;
	dimensions: {
		problem: number; // How real and painful is the problem?
		market: number; // How big is the opportunity?
		solution: number; // Does the solution fit the problem?
		timing: number; // Is the market ready now?
		uniqueness: number; // What's differentiated vs alternatives?
		businessModel: number; // Clear path to revenue?
		scalability: number; // Can it grow efficiently?
		moat: number; // Can they build defensibility?
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
