#!/bin/bash

for i in `seq 0 ${NUM_RETRIES}`; 
do 
	bash deploy.sh && break || (bash cleanup.sh || sleep ${BUILD_TIME})
done