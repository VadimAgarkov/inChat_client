import axios from "axios";

class Requests {
  async authenticate(path, data) {
    const request = await axios.post("http://localhost:8081" + path, { 
      withCredentials : true,
      data
    });
    return request
  };
};

module.exports = new Requests();