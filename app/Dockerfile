
FROM nginx
MAINTAINER ly15@meitu.com
RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d/
COPY index.html /usr/share/nginx/html/
COPY dist/ /usr/share/nginx/html/


