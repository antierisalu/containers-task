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
    m.vm.network "private_network", ip: "192.168.56.9"
    
    # Additional port forwarding for common services
    m.vm.network "forwarded_port", guest: 80, host: 8000  # HTTP
    m.vm.network "forwarded_port", guest: 443, host: 8443  # HTTPS

    # Update and install necessary packages
    m.vm.provision "shell", run: "once", path: "./scripts/dockerinstall.sh", privileged: false
    m.vm.provision "shell", privileged: false, inline: <<-SHELL
      ip address
    SHELL
  end

end
