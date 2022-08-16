FROM node:lts
WORKDIR /app
COPY package*.json .
RUN npm install -g npm@8.15.1 && npm install -g @angular/cli@13.3.5 && npm install
# docker build -f docker/dev.dockerfile -t apphub-angular .
# docker run -p 4200:4200 -w /app -v "/app/node_modules" -v "$(pwd):/app" --name apphub-dashboard --rm -it apphub-angular:latest sh -c "ng serve --host=0.0.0.0 --disableHostCheck=true"
