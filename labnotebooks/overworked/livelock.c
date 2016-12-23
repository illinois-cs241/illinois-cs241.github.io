void * PhilPhunction(void *p) {
    Philosopher *phil = (Philosopher*)p;
    int failed;
    int tries_left;
    pthread_mutex_t *fork_lft = phil->fork_lft;
    pthread_mutex_t *fork_rgt = phil->fork_rgt;
    int tries_left;
    while (running) {
        tries_left = 3
        do {
            failed = pthread_mutex_lock( fork_lft);
            failed = (tries_left>0)? pthread_mutex_trylock( fork_rgt )
                                    : pthread_mutex_lock(fork_rgt);
            
            if (failed) {
                pthread_mutex_unlock( fork_lft);
                tries_left--;
            }
        } while(failed && running);
        
        if (!failed) {    
            usleep( 1+ rand() % 8); //eat
            pthread_mutex_unlock(fork_rgt);
            pthread_mutex_unlock(fork_lft);
        }
    }
    return NULL;
}
