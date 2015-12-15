

docker run --name test-wp-mysql -e MYSQL_ROOT_PASSWORD=root -d mariadb
docker run --name test-wp --link test-wp-mysql:mysql -e WORDPRESS_DB_PASSWORD=root -d wordpress

# TODOs
# testbeat image
# Dockerfile in this folder, copy specs to testbeat overlay
# define link to service a.k.a System Under Test

docker rm test-wp-mysql
docker rm test-wp
