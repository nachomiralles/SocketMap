#SocketMap Project.
In this project we're trying to work con the Socket.IO library and creating a GIS Application capable to show users where the other users are in the moment the acces the browser.
Is is based on this technologies:

* [Node.js](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.org/)
* [Backbone](http://backbonejs.org/)
* [Express](http://expressjs.com/)
* [Socket,IO](http://socket.io/)
* [Mongoose](http://mongoosejs.com/)

The ideea is finishing this project by crreating the IOs and Android APPS, allow creating groups and add some security.

Here comes some preview <b>analisys</b>:

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
