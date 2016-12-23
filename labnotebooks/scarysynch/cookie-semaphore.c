pthread_mutex_t m = PTHREAD_MUTEX_INITIALIZER;
Semamore sem;
Stack s;
void* transaction_listener(void*arg) {
    while(1) {
        semm_wait(&sem);
        pthread_mutex_lock(&m);
        stack_push(&s, get_transaction());
        pthread_mutex_unlock(&m);
    }
}

void* transaction_verifier(void*useless) {
    while(1) {
        semm_post(&sem);
        pthread_mutex_lock(&m);
        transaction = stack_pop(&s);
        verify(transaction);
        pthread_mutex_unlock(&m);
    }
}

int main() {
    semm_init(&sem);
    pthread_t tid1, tid2;
    pthread_create(&tid1, NULL, transaction_listener, NULL);
    pthread_create(&tid2, NULL, transaction_verifier, NULL);

    pthread_join(tid1,NULL);
    pthread_join(tid2,NULL);
    semm_destroy(&sem);
    exit(0);
}