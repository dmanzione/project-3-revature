FROM nginx:alpine
COPY /build /usr/share/nginx/html
COPY /nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]