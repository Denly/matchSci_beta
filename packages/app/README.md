## The user experience in matchSci
This is what should happen to our users.

Kate, a 25 years old business wonman who work too hard to get a boyfriend. After attending her best friend's wedding, she want to give this matchSci a try.

She singed in with FB, created profile, and filled some questions(issue) that pop out automatically.  

However she thinks these poped out questions are stupid (such as are you a mroning person? or Do you like dog?) Thus, she published her own questions, which shows on timeline and her own profiles.

At the sametime, Mark, age 26, an engineer who write codes too hard to get a girlfriend. After a horrible logic crushing, he decided to register matchSci.   

Mark visited Kate’s profile and filled some of her questions.
Meanwhile, Kate noticed the notification that shows Mark get 30 stars from her filled questions and published questions.
Then, Mark texted Kate, “Hey, What a nice weather.”

Kate respond “Yes, I’m so glad to discuss weather at here.
Hey, your response of my questions are pretty wit.
Tell me, how you know the most beautiful song in the Phantom of the Opera is the Angel of Music? "

Mark said “well, because hope and imagination from an innocent girl are the most beautiful things in the world. You know when the Phantom was blablabla........ "

"How it would be, if you came and had a tea with me?", said the Kate. 

After the conversation and several dates, Mark's and Kate’s profile show they’re in a relationship,
and their data will be used for more statistic research in matchSci.

This is the story of our users.  -The End



## How matchSci works in mathematical perspective?

#1. match people by calculating the union of issue

ex. 

Issue: Which pet you like ?

		Lee's	Lee wish her match's ans
1. dog  [v] 	[+3] 
2. cat  [ ]		[-1]
3. other[ ]		[ 0]

LeeAns = {
option:[dog, cat, other]
userAns:[1, 0, 0]
matchAns:[3, -1, 0]
}

		Bob's	Bob wish his match's ans
1. dog  [v] 	[+3]
2. cat  [v]		[-1]
3. other[ ]		[ 0]

BobAns = {
option:[dog, cat, other]
userAns:[1, 0, 0]
matchAns:[3, -1, 0]
}

Calculating the MatchRat from Lee's expectation

var MatchRatForLeeToBob;
var maxScore;

for(int i = 0; i <=3 ; i++){
	MatchRatForLeeToBob += leeAns.matchAns[i] * bobAns.userAns[i]; 
}

ok, I'm still not sure how to do this actully.



#2. finding important key issues to show users

what is imptant key issue? 
1. the issue that makes many conflicts
	Find it by calculating the varians of the MatchRat of the issue

2. the issue people believe it's improtant 
	Find it by the amount of likes of the issue.

ex. 

many conflicts but not improtant: Guess a number form 1 to 10. [3 likes]

improtant but not many conflicts: Should we protect our earth? [103 likes]

both improtant and many conflicts: Are you a vegetarian?	   [82 likes]



problem of using likes: if the issue is stupid but it's published by attractive girls, it may still get many likes..

solution: Try ans rate? The probability of the issue is answered once it shows on screen?







