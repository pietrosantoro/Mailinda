# Mailinda extension

Official readme for the Mailinda extension.

# Working on the source

  - ```git clone http://35.228.175.186/Team-Projects/mailinda.git```
  - ```git config --global user.name "Your Name and Surname"```
  - ```git config --global user.email "Your google email"```


# Before you start making changes:
  - Make sure you are in the developer branch, do not touch the master.
  - How do you switch to the development branch?
  - ```git checkout developer```

# I made changes and switched to the developer branch, how do I commit?
- ```git add .```
- ```git commit -m "My commit message"```
- ```git push``` or if it's your first time on the branch ```git push --set-upstream origin develop```

# How do I check what did I change or in which branch I am at the moment?

- ```git status```
 
# I want to create a new feature or fix a bug, what is the workflow?

- ```git branch <branchname>``` **example:** ```git branch feature/fix_frontend``` 
- ```git checkout <branchname>```
- ```git add .```
- ```git commit -m <message>``` **example:** ```git commit -m "Fixed some css in the frontend"```
- ```git push --set-upstream origin <branchname>```

# Get the latest commits from a feature

- ```git pull --rebase origin <branchname>```
