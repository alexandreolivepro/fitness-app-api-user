FROM dtr.docker.si2m.tec/tools-store/usil-nodejs10.13.0-run:1.0.0
RUN apk add -U tzdata
WORKDIR /opt/app
ADD /node_modules /opt/app/node_modules
ADD /dist /opt/app
ADD /src/config/iam /opt/app/iam
EXPOSE 3000
CMD ["node", "main.js"]