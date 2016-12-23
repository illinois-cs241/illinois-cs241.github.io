void * entry_point(void *arg)
{
    int rank = (int)arg;
    for(int row in thread_range)
        for(int col = 0; col < COLS; ++col)
            DotProduct(row, col, initial_matrix, final_matrix);

    // Make Sure the Threads stop before moving on
    int rc = pthread_barrier_wait(&barr);

    //Check for error
    if(rc != 0 && rc != PTHREAD_BARRIER_SERIAL_THREAD)
    {
        printf("Could not wait on barrier\n");
        exit(-1);
    }

    for(int row in thread_range)
        for(int col = 0; col < COLS; ++col)
            DotProduct(row, col, final_matrix, initial_matrix);
}