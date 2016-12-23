#include <stdio.h>
#define print_increment(var_name) \
do { \
	printf(#var_name "'s address before: %p\n", var_name); \
	printf(#var_name "'s address after + 1: %p\n\n", var_name+1); \
} \
while(0)
int main(){
	char *char_ptr;
	int *int_ptr;
	double *double_ptr;
	void *void_ptr;

	print_increment(char_ptr);
	print_increment(int_ptr);
	print_increment(double_ptr);
	print_increment(void_ptr);
	return 0;
}