void * PhilPhunction(void *p) {
    Philosopher *phil = (Philosopher*)p;
    int failed;
    int tries_left;
    pthread_mutex_t *fork_lft = phil->fork_lft;
    pthread_mutex_t *fork_rgt = phil->fork_rgt;
    
    while (running) {
        pthread_mutex_lock(fork_lft);
        pthread_mutex_lock(fork_rgt);
        usleep( 1+ rand() % 8);

    }
    return NULL;
}
