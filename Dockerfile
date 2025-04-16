FROM archlinux:latest
RUN pacman -Sy --noconfirm ruby ruby-bundler gcc make hunspell git
COPY Gemfile /
COPY Gemfile.lock /
RUN bundle install && rm Gemfile Gemfile.lock
USER 1225516:1225516
WORKDIR /workspace
CMD ["bundle", "exec", "rake", "serve"]