FROM node:12.2.0-alpine as build
WORKDIR /app
COPY . ./
RUN npm install &&\
  npm run build --prod


FROM nginx:1.19.5-alpine
COPY --from=build /app/dist/CollegeFrontend /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]