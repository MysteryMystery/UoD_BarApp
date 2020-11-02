FROM ruby:2.7.2-alpine

RUN apk update && apk add git build-base nodejs tzdata postgresql-dev postgresql-client libxslt-dev libxml2-dev imagemagick sqlite-dev

RUN mkdir /app
WORKDIR /app
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
RUN bundle install
COPY . /app

EXPOSE 3000

CMD [ "rails", "db:migrate", "db:seed" ]

CMD ["rails", "server", "-b", "0.0.0.0"]