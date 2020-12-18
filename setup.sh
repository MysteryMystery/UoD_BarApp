curl -sL https://deb.nodesource.com/setup_15.x | sudo -E bash -
sudo apt-get install -y nodejs

npm install -g yarn
npm install -g ember-cli

(cd FrontEnd && yarn install && ember build)