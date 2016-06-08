FROM centos:centos6 

RUN exec >& /root/build-aipo7.log
RUN set -eux
RUN yum install -y tar sudo
RUN sed -i -e "s/^Defaults    requiretty/#Defaults    requiretty/" /etc/sudoers
RUN yum install -y make gcc readline-devel zlib-devel nmap wget bison flex
WORKDIR /usr/local
RUN wget https://aipo.googlecode.com/files/aipo7020ja_linux64.tar.gz
RUN tar xzf aipo7020ja_linux64.tar.gz
RUN tar xzf aipo7020ja_linux/aipo7020.tar.gz
RUN rm -rf aipo7020ja_linux*
WORKDIR /usr/local/aipo/bin
RUN sh installer.sh > /dev/null

WORKDIR /usr/local/aipo/bin/ 
ENTRYPOINT ./startup.sh && tail -f /dev/null
