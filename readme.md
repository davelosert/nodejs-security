PURPOSE
=================
The Purpose of this Project is to try out and implement all kinds of security measures for NodeJS-Apps. All the measures
should be very good commented and underlined with some resources to get more information. The goal is to not only to
learn security while developing, but also to give others a practical example of how security-measures can be implemented
within a NodeJS-Application. The motivation behind this was the frustration of always only seeing little Code-Snippets
and examples for security, but never seeing it "in the field" within the whole scope. So this app is supposed to be for
learning and teaching at the same time.

The long-term goal could maybe be a Project-Boilerplate for a NodeJS-App that already covers most of the OWASP-Top-10
security risks by design.


PLANS & IDEAS
=================
- **Use AngularJS:**
Since this gonna be a security-boilerplate for an WebApp, and since i think a WebApp defines itself by not rendering
Views serverside like "in the old days", I wanna build a dynamic AngularJS in the Frontend and handle all Data-Transfer via AJAX or
Websockets. Also, i want to implement a MongoDB with Mongoose to handle a User-Database and authentication system.

- **Seperate between DOs and DONTs:**
Mistakes should are there to learn from and improve. Bad examples can show someone mistakes and reveal commom misconecptions.
Therefore, this app could also show a bunch of "Donts".

- **Use Tests to explain:**
Sometimes, tests are a good way to learn an API. So tests within this app could be a way to show the use of several security
measures or give an idea of how an attack could look like. Probably some Unit and e2e-Test could be useful.


CONTRIBUTION
=================
Everybody is welcome to contribute. Implement, Suggest, Show me flaws or Errors... This is a learning Project with no practical use, so every
Feedback is welcome!


CREDITS & SOURCES
=================
I took and will take the security-measurments in this app from several pages, books, sites and so on...  Im just gonna List them here.

[https://speakerdeck.com/ckarande/top-overlooked-security-threats-to-node-dot-js-web-applications](https://speakerdeck.com/ckarande/top-overlooked-security-threats-to-node-dot-js-web-applications)
[https://blog.liftsecurity.io/2012/12/07/writing-secure-express-js-apps](https://blog.liftsecurity.io/2012/12/07/writing-secure-express-js-apps)
[https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet)