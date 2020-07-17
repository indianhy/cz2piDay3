# A simple recursive Python3 program 
# to print the nth tetranacci numbers. 

# Function to return the 
# N-th tetranacci number 
def printTetraRec(n): 
	
	# base cases 
	if (n == 0): 
		return 0; 
		
	# base cases 
	if (n == 1 or n == 2): 
		return 1; 
		
	# base cases 
	if (n == 3): 
		return 2; 

	else: 
		return (printTetraRec(n - 1) +
				printTetraRec(n - 2) +
				printTetraRec(n - 3) +
				printTetraRec(n - 4)); 

# function to print the 
# nth tetranacci number 
def printTetra(n): 
	print(printTetraRec(n), end = " "); 

# Driver code 
n = 10; 
printTetra(n); 

# This code is contributed 
# by mits 
