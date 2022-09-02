# Welcome to Helpdesk!

This is a sample app that I made with **AdonisJS** for testing purporse. I got use it in production with no problem at all. The source files and database are in portuguese, I translated only the views.
> I do not work on this code anymore, do what you want =)

# App
The app is a simple server rendered web system for helpdesk, a simple ticket system. It has these characteristics:

 - **3 users profiles**
	 - Admin: Can register new things and view operators activities (and do everything that operator can do)
	 - Operator: Can attend the tickets and create tickets in the name of the users
	 - User: Can create tickets only for yourself

## Dependencies
- Bootstrap 4
- Bootstrap select
- Datatables
- Alertify
- Summernote WYSIWYG
- AdonisJS (Node framework)
- PostgreSQL (Production)
- SQLite (Development)

## Try it

You can try the app at [heroku](https://mirana.herokuapp.com)

Login with default users (no password required):
 - admin
 - operator
 - user

### Know Problems

- Sending email was disabled in this test.
- Need to do authentication, because I was using Ldap and I removed - this because are too specific.
- Need to paginate datatables result at server side


### License
GNU GENERAL PUBLIC LICENSE v3


