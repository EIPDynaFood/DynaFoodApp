FROM node:16.9.1-buster-slim

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=19006
ENV PORT $PORT
EXPOSE $PORT 19000 19001 19002

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH /home/node/.npm-global/bin:$PATH
RUN npm i --unsafe-perm -g npm@7.21.1 expo-cli@6.0.8

RUN mkdir /opt/dynafood && chown node:node /opt/dynafood
WORKDIR /opt/dynafood
ENV PATH /opt/dynafood/.bin:$PATH

COPY --chown=node:node ./App/package.json ./
COPY --chown=node:node ./App/package-lock.json ./
USER node
RUN npm install

WORKDIR /opt/dynafood/app

ENTRYPOINT ["npm", "run"]
CMD ["start"]