FROM debian:stable-20170620

RUN set -ex; \
  runDeps='golang-1.8-go'; \
  buildDeps='curl ca-certificates pkg-config zip g++ zlib1g-dev unzip git'; \
  apt-get update && apt-get install -y $runDeps $buildDeps --no-install-recommends; \
  \
  curl -SLs -o bazel-installer.sh https://github.com/bazelbuild/bazel/releases/download/0.5.2/bazel-0.5.2-installer-linux-x86_64.sh; \
  chmod u+x ./bazel-installer.sh; \
  ./bazel-installer.sh; \
  \
  #apt-get purge -y --auto-remove $buildDeps; \
  rm -rf /var/lib/apt/lists/*; \
  rm /var/log/dpkg.log /var/log/apt/*.log

# Build as separate step for now, to speed up development
COPY . /app

RUN bazel version

#RUN set -ex; cd /app; \
#  bazel build :in-cluster-client-configuration
