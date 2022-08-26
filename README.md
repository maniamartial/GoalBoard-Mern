A simple system with authentication and authoriztion 

##Technologies
MERN
MongoDB
Exress
React
Node

**User**

Anyone can access the website wwhich has goals scored by a person
To modiffy the goals eg delete, the user must have been logged in. If you ty to alter, you will be redirected to login

**SignIn**

The party to login needs to remember the email he/she registered with the respective password.
Incase you enter the wrong details, you will get a warning
If you forget password, we havent created that functionality yet

**SignUp**

The party can register. Requirement s are username, email, pasword, confirm password.
Incase you miss any, there is a validation message that will popup.
Remember the user is required to mix numbers, uppercase, lowercase letters to create a strong password.

**Home**

This page contains goals. If you have looged in, you can create your goals and they will be added synchronously
The only goals shown bellong to the account logged in.
