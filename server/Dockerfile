FROM node:14.13-alpine as build
WORKDIR /oleic
ENV NODE_ENV production
ADD package.json yarn.lock /oleic/
ADD server /oleic/server
RUN yarn --production --pure-lockfile
WORKDIR /oleic/server

FROM node:14.13-alpine
ENV NODE_ENV production
ENV PORT 80
COPY --from=build /oleic /oleic
WORKDIR /oleic/server
ENTRYPOINT [ "node", "src/index.js" ]
