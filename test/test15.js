const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);
let postBody = {
    "modelName": "AddressGeneral",
    "calledMethod": "getWarehouses",
    "methodProperties": {
         "CityName":"Суми"
    },
    "apiKey": "5aabc980baa020f12ff63c177d6a3b27"
}; 
describe("Server!", () => {
 /* it("welcomes user to the api", done => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("success");
        expect(res.body.message).to.equals("Welcome To Testing API");
        done();
      });
  });
*/
  it("test post", done => {
    chai
      .request("http://testapi.novaposhta.ua")
      .post("/v2.0/json/AddressGeneral/getWarehouses")
	  .set('Content-Type', 'application/json')
	  .set('Host', 'testapi.novaposhta.ua')
      .send(postBody)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.success).to.equals(true);
		expect(res.body.data[0].CityDescription).to.equals('Суми');
        done();
      });
  });
});