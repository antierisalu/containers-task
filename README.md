# play-with-containers

Project teached key concepts of docker.

![architecture](https://01.kood.tech/git/root/public/media/branch/master/subjects/devops/play-with-containers/resources/play-with-containers-py.png)

To run this program, you need to install Vagrant and currently Virtualbox <= 7.0. From root of repo run `cp vms/.example.env vms/.env` to copy the example .env file and then `Vagrant up` .
It creates Ubuntu virtual machine, installs Docker and then builds and starts all(6) containers with `docker compose up -d`

Microservices architecture is a design approach where each application is made of small services. Each service is focusing on a specific function and can be developed and scaled independently.

Why use micro services?
* You can only scale services that need it.
* Fast development: Each person or team can work on different services at the same time without interfering each other's tasks.
* Flexible: Different services can be updated and can use different technologies independently.

Queues in computing are often used to manage tasks and messages between different components of a system.

RabbitMQ implements Advanced Message Queuing Protocol to receive, store and send messages between apps. For example if receiver application is offline, it will store that message and when recipient is back online it sends that data to application. 

Every container has their own Dockerfile which has instructions for docker engine. This creates lightweight environment for the application with(or without) its own network. This is so much better than VM because it takes so much less resources because it only has necessary dependencies for this particular application.

[DockerHub](https://hub.docker.com) has pre built images for pretty much everything but this task i couldn't use it and had to build my own from alpine or debian linux images.

[Gateway Dockerfile](vms/gateway/Dockerfile)
1. `FROM` pulls alpine linux image, which compressed is less than 5MB.
2. `RUN` installs dependencies for that image(nodejs and npm)
3. `WORKDIR` sets the current working directory for application
4. `COPY` takes the package*.json files from workdir
5. `RUN` again to install dependencies for from package file for this application
6. `COPY` rest of the application files to the working dir
7. `EXPOSE` Exposes GATEWAY_PORT defined in [.example.env](vms/.example.env) to host machine
8. `CMD` running `npm start` to start my js application

Docker volumes are used persist data, they are generated and used by containers. Unlike containers, volumes are independent of the container lifecycle. You wont lose your data even when container is deleted. Can be used to share data between containers and they have better performance compared to bind volumes.

Docker network is feature that lets containers communicate within the same network. It has multiple options: host, bridge, overlay. Which can be used in different situations. You can isolate your containers network and set different networks for containers to improve security.

Docker image is generated on each build, it's a snapshot of that app on a specific moment. They provide a consistent environment, from development to production and reducing that classic "works on my machine". Images can be shared easily on [DockerHub](https://hub.docker.com), making collaboration and distribution straightforward.

Docker Compose manages your single or multiple containers from a single [docker-compose.yaml](vms/docker-compose.yaml) file. With this you can manage all your containers, declare networks and volumes from there.

In this project from `vms/` dir you can:
* `docker compose up -d` to start all containers with daemon.
* `docker compose stop billing billing-db` stop only these two containers 
* `docker compose down` remove all containers
* `docker compose up gateway --build -d` to for example to rebuild the image if you have made some changes in application and run it again. Of course you can remove `-d` to see the application logs live. When you now `CTRL-C` the container will stop and you have to start it again.

