import axios from "axios";

class Requests {
  async Authentication(path, data) {
    const request = axios.post("http://localhost:8081" + path, { 
      withCredentials : true,
      data
    });
    return request
  };
};

module.exports = new Requests();