#
# Cookbook Name:: app
# Recipe:: default
#
# Copyright 2013, YOUR_COMPANY_NAME
#
# All rights reserved - Do Not Redistribute
#
include_recipe "apt"
include_recipe "build-essential"
include_recipe "python"

packages = "sqlite3 gettext libpq-dev"
packages.split(" ").each do |p|
  package p
end

python_virtutal_dir = [node["app"]["root_dir"], 'env'].join('/')
python_virtualenv "#{python_virtutal_dir}" do
  owner node["app"]["user"]
  group node["app"]["group"]
  action :create
end

bash 'install python dependencies' do
    code <<-EOH
. #{python_virtutal_dir}/bin/activate && pip install -r #{node["app"]["root_dir"]}/requirements.txt
    EOH
end