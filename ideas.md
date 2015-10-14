##Data Model.
Describing the way we organice the users.

* Collection Groups:
      * Group:  
      
            {   
                name: String,
                creationDate: Date,
                description: String,
                users: [User]
            }
      * User:  
      
            {   
                username: String,
                mail: String,
                password: String,
                activeGroup: String,
                position: [Position]
            }
            
      * Position:  
      
            {   
                date: Date,
                latlon: [Number, Number]
            }
  
  
##Pages.
Describing pages needed.

* Index.
* Login.
* Register.

##Functionalities
Functionalities Needed.

* Create Group.
* Select Group.
* Change Group.
* View Group Users.
