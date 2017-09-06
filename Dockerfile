FROM node:6.11.2

WORKDIR /home/node/app

RUN apt-get update \
    && apt-get upgrade -y \
	&& apt-get install -y build-essential \

	&& npm install -g naught

VOLUME ["/home/node/app"]

COPY . /home/node/app/

RUN usermod -s /usr/sbin/nologin node

RUN npm install --production

EXPOSE 4000

CMD ["npm", "start"]
