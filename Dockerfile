FROM nginx
COPY sportClimbingAdmin/ /data/www/sportClimbingAdmin
WORKDIR /data/www/
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
# FROM ubuntu:18.04
# RUN apt-get update && apt-get install -y curl
# RUN mkdir actions-runner && cd actions-runner
# RUN curl -o actions-runner-linux-x64-2.304.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.304.0/actions-runner-linux-x64-2.304.0.tar.gz
# RUN tar xzf ./actions-runner-linux-x64-2.304.0.tar.gz
# RUN ./config.sh --url https://github.com/w264747477/sportClimbingAdmin --token AN5UQXWIKNGEYBA5QCB3E4TEPWRMU
# RUN ./run.sh