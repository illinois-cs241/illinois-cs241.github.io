#include <pthread>

void* do_massive_work(void* payload){

	/* Doing massive work */
	return NULL;
}

int main(){

	pthread_t threads[10];
	for(int i = 0; i < 10; ++i){
		pthread_create(threads+i, NULL, do_massive_work, NULL);
	}

	for(int i = 0; i < 10; ++i){
		pthread_join(threads[i], NULL);
	}

	return 0;
}