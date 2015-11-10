
FROM debian:jessie

RUN apt-get update
RUN apt-get install -y curl --no-install-recommends

#RUN apt-get install -y libapache2-mod-svn --no-install-recommends
RUN curl -s http://opensource.wandisco.com/wandisco-debian.gpg | apt-key add -
RUN echo "deb http://opensource.wandisco.com/debian/ jessie svn19" > /etc/apt/sources.list.d/wandisco.sources.list
RUN apt-get update
RUN apt-get install -y libapache2-svn --no-install-recommends
