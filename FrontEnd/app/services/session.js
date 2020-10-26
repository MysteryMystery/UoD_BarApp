import Service from '@ember/service';

export default class SessionService extends Service {
  jwt = null;

  get jwt() {
    return this.jwt
  }

  set jwt(value){
    this.jwt = value
  }
}
