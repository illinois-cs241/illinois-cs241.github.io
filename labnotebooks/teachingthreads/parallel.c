char* sequential_map(char (*function)(char), char* string){
	char* mapped_string = malloc(strlen(string)+1);
	int offset;
	for(offset = 0; string[offset]; ++offset){
		mapped_string[offset] = function(string[offset]);
	}
	return mapped_string;
}

int main(){
	char string[] = "i love teaching threads";

	char* upper = sequential_map(toupper, string);
	char* lower = sequential_map(tolower, string);
	char* unicode = sequential_map(tounicode, string);
	// Whatever you want
	
	return 0;
}