#! /bin/bash

sudo apt-get update
sudo apt-get install -y docker.io

sudo usermod -aG docker vagrant

sudo systemctl enable docker --now
sudo systemctl enable containerd --now

# Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose