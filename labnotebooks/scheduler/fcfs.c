int first_come_first_served(){
	while(1){
		int job = accept_first_job();
		run_job(job);
	}
}