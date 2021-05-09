# Online-Digital-Notepad-Application
Software Engineering Project

we used vercel to deploy our project,
link to our deployed project: https://online-notepad.vercel.app/

features working in this release:

  - Login:
    - login component path: online-notepad-app\src\app\auth\login.
    - implemented using firebase.
    - user data will be saved in local storage.
        -can check login functionality using these credentials from our firebase account:
          email : hasantanich@gmail.com
          password: Hasan123
          or,
          mahadibabiker@gmail.com
          password: Mahadi123

  - Logout
    - user data will be cleared from local storage and he will be redirected to login page.

  - Register
    - user will be registered to our firebase.
    - no email verifcation added yet
  
  
Front end features:
    - my-notes page (part of it implemented):
        - we added a component called my-notes, where we have our notes which are drag and drop.
        - for now the text of the first item in the drag and drop will be shown in the text box to the right,
        later on it will be the text that the user clicks on
        - path of my-notes component: online-notepad-app\src\app\my-notes.
