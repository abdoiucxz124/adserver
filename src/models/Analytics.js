class Analytics {
  constructor(data) {
    this.id = data.id;
    this.adId = data.adId;
    this.clientIp = data.clientIp;
    this.userAgent = data.userAgent;
    this.timestamp = data.timestamp || new Date();
  }
}

class Impression extends Analytics {
  constructor(data) {
    super(data);
    this.type = 'impression';
  }
}

class Click extends Analytics {
  constructor(data) {
    super(data);
    this.type = 'click';
  }
}

module.exports = {
  Analytics,
  Impression,
  Click
};