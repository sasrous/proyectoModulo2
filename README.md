

# theBackstage

#	Project Name
- The Backstage 
#	Description
- The Backstage is a small fórum site that Works with the Songkick API to find musical events nearby filtered by your preferences, You can check them, join them, and interact with other users that wish to attend too.
#	User Stories
-	Error handler 
-	Homepage : Login and signup 
-	Signup: créate a new username and password 
-	Login: Login using alrady existing username and password 
-	Profile: edit and check my profile info, also fill the remaining fields needed (such as music preferences, location …) 
-	Main page: see list of events  pre-filtered (using profile info) by location, genre, artist and date
-	Event page: Full information of the event; Option to join and add it to your calendar and/or to comment on the event’s Wall to interact with other users 
-	Calendar : check all the events that I joined 
#	Backlog
-	Upload profile picture
-	See other profiles 
-	See map of the event 
-	Search bar on the events page allowing me to filter them by special parameters 
-	Dynamic calendar 
-	Get preferences by Facebook login 

#	ROUTES
-	get/ 
-	get/login
-	post/login (Body: username, password) 
-	get/signup
-	post/signup (Body: username, password)
-	get/profile/fill
-	post/profile/fill (Body: Name, surname, age, description, list of favourite genres, location)
-	get/profile
-	get/main 
-	get/event/:id
-	post/event/:id/join (Body: nothing) 

#	MODELS
## User: 
-	Username: String 
-	Password: Strting
-	Name: String
-	Surname: String
-	Age: Number
-	Description: String
-	Genres: Array list of strings
-	Location: String
-	Joined Events : Array list of id’s
## Events: 
-	Name: String
-	Description : String 
-	Date: date
-	Location: String 
-	Genre : Array list of strings 
-	Users attending : array list of id’s

# Links
-	Trello: https://trello.com/b/vDpAnHdN/the-backstage
-	Git: https://github.com/sasrous/proyectoModulo2
-	Slides.com
