

docker run --name test-wp-mysql -e MYSQL_ROOT_PASSWORD=root -d mariadb
docker run --name test-wp --link test-wp-mysql:mysql -e WORDPRESS_DB_PASSWORD=root -d wordpress

TESTSECRETS="$(pwd)/certs"
mkdir -p $TESTSECRETS
docker run --rm -v $TESTSECRETS/:/certs ehazlett/certm -d /certs ca generate -o=local
docker run --rm -v $TESTSECRETS/:/certs ehazlett/certm -d /certs server generate --host localhost --host 127.0.0.1 -o=local
# looks like we need local openssl anyway, for now; very unsafe dhparam
openssl dhparam -out $TESTSECRETS/dhparam.pem 64

docker run \
  --link test-wp:wpfrontend \
  -e ENABLE_SSL=true \
  -e TARGET_SERVICE=wpfrontend \
  -v $TESTSECRETS/server.pem:/etc/secrets/proxycert \
  -v $TESTSECRETS/server-key.pem:/etc/secrets/proxykey \
  -v $TESTSECRETS/dhparam.pem:/etc/secrets/dhparam \
  -p 30080:80 \
  -p 30443:443 \
  gcr.io/cloud-solutions-images/nginx-ssl-proxy:master-cc00da0
#  solsson/ssl-proxy-wordpress

# TODOs
# testbeat image
# Dockerfile in this folder, copy specs to testbeat overlay
# define link to service a.k.a System Under Test

docker rm test-wp-mysql
docker rm test-wp
