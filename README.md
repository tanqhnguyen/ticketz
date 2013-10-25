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
1. Setting up the database `python manage.py syncdb`
2. Migrate database schema `python manage.py migrate`
3. Copy `config.json.sample` and rename it to `config.json`. This file contains local configuration for each developer. Database connection information should be specified in this file

## Start server
* python manage.py runserver

(Optional) There is also a chef (and vagrant) setting, that can be used to automatically configure the environment [More info here](http://www.vagrantup.com)