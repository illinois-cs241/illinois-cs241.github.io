int* jobs; //New Jobs get added

int shortest_job_first(){
	while(1){
		int job = get_shortest_job(jobs);
		run_job(job);
	}
}