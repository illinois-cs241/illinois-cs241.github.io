int* jobs; //New Jobs get added

int preempt_callback(job_num, new_job){
	if(time_remaining(job_num) > 
		time_remaining(new_job)){
		return new_job;
	}
	return job_num;
}

int preemptive_shortest_job_first(){
	while(1){
		int job = get_shortest_job(jobs);
		run_job(job, preempt_callback);
	}
}