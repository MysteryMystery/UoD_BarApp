import Service from '@ember/service';

export default class SessionService extends Service {
  storageKey = "session"
  sessionData = this.loadFromDisk()

  loadFromDisk(){
    const item = localStorage.getItem(this.storageKey)
    return item ? JSON.parse(item) : {};
  }

  set isLoggedIn(value){
    this.set("logged_in", true)
  }

  get isLoggedIn(){
    var v = this.getAttr("jwt")
    return v !== undefined
  }

  set(key, value){
    this.sessionData[key] = value;
    localStorage.setItem(this.storageKey, JSON.stringify(this.sessionData))
  }

  unset(key){
    delete this.sessionData[key]
    console.log(this.sessionData)
    localStorage.setItem(this.storageKey, JSON.stringify(this.sessionData))
  }

  getAttr(key){
    return this.sessionData[key]
  }

  redirectIfUnauth(route){
    if (!this.getAttr("jwt"))
      route.replaceWith("/")
  }
}
