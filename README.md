## Folder structure
* `docs` contains documentation
* `provision` contains provision code used for setting up the environment

## Installation Instruction
* Install python (2.7)
* Install pip
* Install postgresql 9.3

## Install dependencies
* pip install -r requirements.txt

## First start the project
1. Copy `config.json.sample` and rename it to `config.json`. This file contains local configuration for each developer. Database connection information should be specified in this file
2. Setting up the database `python manage.py syncdb`
3. Migrate database schema `python manage.py migrate`

## Start server
* python manage.py runserver

## Coding conventions
* Use 4-space tab
* Use soft tab
* Variable name should be `variable_name` **NOT** `variableName`, `Variable_Name`, `VariableName`
* Method name should be `method_name` **NOT** `methodName`, `Method_Name`, `MethodName`
* Class name should be `ClassName` **NOT** `Class_Name`
* All models should be located in `core` app without any exceptions
* Model classes are store in separated files (`user.py` is an example)

## Workflow
* Each person will work on their branch only. From master, do `git checkout -b tan` (replace `tan` with your name) to start a new branch from `master`
* Before starting to work do `git pull origin master` to update the branch with latest changes
* If possible, please include the ticket number in the commit message. For example, `git commit -m "#123 fix something"`
* After finishing, push to your branch using `git push origin tan` (replace `tan` with your branch name)
* After that you can either tell the project manager in the ticket that you have finished it **OR** you can create a new merge request using github
* Do not touch `master` branch unless you know what you are doing

## Database migration
In this project, we are using `South` to keep track of schema changes. Since we are having 4 people working on the same project, conflicts will probably happen quite often. Therefore, you need to keep in mind that you must discuss with others before changing the database schema

There are 2 steps to create new migration
* Making changes to the models, for example, adding another `CharField`
* Run `python manage.py schemamigration core --auto`

Apply the migration
* Run `python manage.py migrate`

(Optional) There is also a chef (and vagrant) setting, that can be used to automatically configure the environment [More info here](http://www.vagrantup.com)