name "db"
description "db setup"
run_list(
  "recipe[db]"
)
default_attributes(
  "postgresql" => {
    "apt_distribution" => "precise",
    "version"=> "9.3"
  }
)