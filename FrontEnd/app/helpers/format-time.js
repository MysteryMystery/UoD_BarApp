import { helper } from '@ember/component/helper';

export default helper(
  function formatTime([time]) {
    let d = new Date(time);
    let x;
    let h = ((x = d.getHours()) < 10 ? "0" : "") + x
    let m = ((x = d.getMinutes()) < 10 ? "0" : "") + x
    return h + " : " + m
  }
);
