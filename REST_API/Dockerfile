FROM ruby:2.7.2-alpine

RUN apk update && apk add git build-base nodejs npm tzdata postgresql-dev postgresql-client libxslt-dev libxml2-dev imagemagick sqlite-dev
RUN apk add --no-cache bash
RUN npm install yarn

RUN mkdir /app
WORKDIR /app
#COPY Gemfile /app/Gemfile
#COPY Gemfile.lock /app/Gemfile.lock
#RUN bundle install
COPY . /app

#COPY entrypoint.sh /usr/bin/
#RUN chmod +x /usr/bin/entrypoint.sh
#ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3000

CMD ["rails", "db:migrate", "RAILS_ENV=development"]
CMD ["rails", "db:seed"]
CMD ["rails", "server", "-b", "0.0.0.0"]
