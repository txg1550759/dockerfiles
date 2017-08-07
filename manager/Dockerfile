FROM solsson/kafka-jre@sha256:725feb0ae82ff152ded6599071a05aced51e2a546147c6f903584e6501422b43

ENV KAFKA_MANAGER_VERSION=1.3.3.8

RUN set -ex; \
  export DEBIAN_FRONTEND=noninteractive; \
  runDeps=''; \
  buildDeps='curl ca-certificates unzip'; \
  apt-get update && apt-get install -y $runDeps $buildDeps --no-install-recommends; \
  \
  mkdir -p /opt/kafka-manager-src; \
  curl -SLs "https://github.com/yahoo/kafka-manager/archive/$KAFKA_MANAGER_VERSION.tar.gz" | tar -xzf - --strip-components=1 -C /opt/kafka-manager-src; \
  \
  cd /opt/kafka-manager-src; \
  ./sbt clean dist; \
  \
  cd /opt; \
  unzip kafka-manager-src/target/universal/kafka-manager-$KAFKA_MANAGER_VERSION.zip; \
  mv kafka-manager-$KAFKA_MANAGER_VERSION kafka-manager; \
  \
  rm -rf /root/.sbt /root/.ivy2 /opt/kafka-manager-src; \
  \
  apt-get purge -y --auto-remove $buildDeps; \
  rm -rf /var/lib/apt/lists/*; \
  rm -rf /var/log/dpkg.log /var/log/alternatives.log /var/log/apt

WORKDIR /opt/kafka-manager

ENTRYPOINT ["./bin/kafka-manager"]
