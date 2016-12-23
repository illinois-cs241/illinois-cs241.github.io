while(!condition)
	pthread_cond_wait(&cv, &mutex);