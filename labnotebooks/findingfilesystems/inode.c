typedef struct {
	uint8_t 	owner;				/* Owner ID */
	uint8_t 	group;				/* Group ID */
	uint16_t 	permissions;		/* <d,f,c,p>rwxrwxrwx */
	uint32_t 	hard_link_count;	/* reference count, when hit 0 */
	time_t 		last_access;		/* read(2) change */
	time_t 		last_modification;	/* any time metadata changes */
	time_t 		last_change;		/* write(2) change */
	uint64_t 	size;				/* size of the file in bytes */
	data_block_number direct_nodes[NUM_DIRECT_INODES]; /* data_blocks */
	inode_number single_indirect;		/* points to a singly indirect block */
} inode;
