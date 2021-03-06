# Your Library
### [Live-Website]: (Currently available at: 147.182.193.201:5656 ) (Domain name pending: https://yourlibrary.xyz)


## Description:
Your Library is a full-stack full-CRUD website that is populated with book data from free books in the public domain from Project Gutenberg. The user can search among all the 60,000+ books available by author's name or title. The user can create an account and add whatever book from the public library (as sent by Gutenberg) into their own account, the data thereof being saved in a heroku database. The user can delete any book, or edit the book's data as they desire, from their our library. The user can also search from among their own books by author's name or title. From either their own library or the public library the user can access the book's text by a link to that book's page on Project Gutenberg.


## Frontend Packages:
*  React - Front end JavaScript Library
*  redux - State Management
*  react-redux - Connecting a React application to a Redux store
*  react-router-dom - Allows for routing in a React application
* axios - Makes http requests to a server


## Backend Packages:
*  express - Node framework for building a server
*  dotenv - Makes building environmental easier
*  massive - Connecting to a db
*  express-session - Allows creating and tracking user sessions
*  bcryptjs - Hashing and Salting passwords


## My Experience:
This project was originally made as a practice working with an external api but later decided to make it into a full on website. There were several things that made it take much longer than necessary. One delay was caused from my efforts to allow the user to view more books at a time. The Gutenberg api sends the books in arrays of about 31 books at a time. I created some very glorious ways of making "Next" or "More" buttons which sent the next page (either in the default page or when searching) and this originally worked for only two pages at a time and then it would not support the third page. Then later, for the default page, it would not support more than the first page; but it still does support two pages for the search page. So in the end I just made it populate the default page of the first 31 books and the search view populates it with the first 62 book. Because the users' data is stored how I chose to store it in the database, the default view in the user's library is populated with all the books they have saved there and with all relevant books in their library according to their search words. Another huge delay was that github saved the original name of the folders in the db folder, which I had unconventionally done like a component capitalizing the first letter as "UsersInfo". On my end I had corrected it and when I tested it in development mode it worked perfectly and connected to the database, but when I hosted it with the code from github I was getting an error that the get_user db file (which was in the folder renamed usersInfo but was still in github as UsersInfo) was undefined and I could not figure out why until I cloned the github code and opened that version up on my computer and looked at it, and found that the folder name was still capitalized. 