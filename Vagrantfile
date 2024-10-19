# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  config.vm.box = "base"

  config.vm.define "master" do |m|
    m.vm.box = "ubuntu/focal64"
    m.vm.hostname = "master"
    m.vm.provider "virtualbox" do |vb|
      # Enable nested virtualization
      vb.customize ["modifyvm", :id, "--nested-hw-virt", "on"]
    end
    
    # Network configuration
    m.vm.network "private_network", ip: "192.168.57.10"
    
    # Additional port forwarding for common services
    m.vm.network "forwarded_port", guest: 3000, host: 3000  # Gateway

    # Update and install necessary packages
    m.vm.provision "shell", run: "once", path: "./scripts/dockerinstall.sh"
    m.vm.provision "shell", inline: "sleep 3", privileged: false
    m.vm.provision "shell", privileged: false, inline: <<-SHELL
      cd /vagrant/vms
      docker compose up -d
    SHELL
  end

end
