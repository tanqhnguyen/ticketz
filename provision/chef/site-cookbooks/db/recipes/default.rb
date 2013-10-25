#
# Cookbook Name:: db
# Recipe:: default
#
# Copyright 2013, YOUR_COMPANY_NAME
#
# All rights reserved - Do Not Redistribute
#
require 'json'
#include_recipe "postgresql::apt_pgdg_postgresql"
#include_recipe "postgresql::server"
#include_recipe "database"
include_recipe "postgresql::client"
include_recipe "postgresql::server"

db_config_file = [node['app']['root_dir'], 'ticketz', 'config.json'].join('/')

# postgresql_connection_info = {:host => "127.0.0.1",
#                               :port => node['postgresql']['config']['port'],
#                               :username => 'postgres',
#                               :password => node['postgresql']['password']['postgres']}

file = File.read(db_config_file)
config = JSON.parse(file)
db_config = config['db']

pg_user db_config["username"] do
  privileges :superuser => false, :createdb => false, :login => true
  password db_config["password"]
end

pg_database db_config["name"] do
  owner db_config["username"]
  encoding "utf8"
  template "template0"
  locale "en_US.UTF8"
end