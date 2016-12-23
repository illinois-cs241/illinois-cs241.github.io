#include <stdio.h>

typedef struct
{
	int n1;
	float n2;
	char st[10];
} contact;

int main(){
	contact bhuvan;
	printf("Contact address:\t%p\n", &bhuvan);
	printf("Contact n1 location:\t%p\n", &bhuvan.n1);
	printf("Contact n2 location:\t%p\n", &bhuvan.n2);
	printf("Contact nst location:\t%p\n", &bhuvan.st);

	return 0;

}