int* job_queue; //New Jobs get added

int round_robin(){
	while(1){
		int job = pull_job(job_queue);
		run_job_quantum(job, QUANTUM_TIME);
		if(!job_done(job)){
			queue_job(job_queue, job);
		}
	}
}