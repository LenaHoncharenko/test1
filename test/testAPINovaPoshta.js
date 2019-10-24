const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);

let postBodyGetWarehouses = {
    "modelName": "AddressGeneral",
    "calledMethod": "getWarehouses",
    "methodProperties": {
        "CityName": "Суми"
    },
    "apiKey": "15948a0b9098b90397d5724f7e905649"
};

let postBodySaveExpress = {
    "apiKey": "15948a0b9098b90397d5724f7e905649",
    "modelName": "InternetDocument",
    "calledMethod": "save",
    "methodProperties": {
        "PayerType": "Sender",
        "PaymentMethod": "Cash",
        "DateTime": "02.03.2020",
        "CargoType": "Cargo",
        "VolumeGeneral": "0.1",
        "Weight": "10",
        "ServiceType": "WarehouseDoors",
        "SeatsAmount": "1",
        "Description": "абажур",
        "Cost": "500",
        "CitySender": "8d5a980d-391c-11dd-90d9-001a92567626",
        "Sender": "6e9acced-d072-11e3-95eb-0050568046cd",
        "SenderAddress": "01ae2635-e1c2-11e3-8c4a-0050568002cf",
        "ContactSender": "d0b9f592-b600-11e4-a77a-005056887b8d",
        "SendersPhone": "380678734567",
        "CityRecipient": "db5c8892-391c-11dd-90d9-001a92567626",
        "Recipient": "d00f2319-b743-11e4-a77a-005056887b8d",
        "RecipientAddress": "511fcfbd-e1c2-11e3-8c4a-0050568002cf",
        "ContactRecipient": "bc7b61ea-b6eb-11e4-a77a-005056887b8d",
        "RecipientsPhone": "380631112223"
    }
};

describe("Test API Nova Poshta", () => {

    it("To get list of nearest departments", done => {
        chai
            .request("http://testapi.novaposhta.ua")
            .post("/v2.0/json/AddressGeneral/getWarehouses")
            .set('Content-Type', 'application/json')
            .set('Host', 'testapi.novaposhta.ua')
            .send(postBodyGetWarehouses)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.success).to.equals(true);
                expect(res.body.data[0].CityDescription).to.equals('Суми');
                done();
            });
    });

    it("To create express", done => {
        chai
            .request("http://testapi.novaposhta.ua")
            .post("/v2.0/en/save/json/")
            .set('Content-Type', 'application/json')
            .set('Host', 'testapi.novaposhta.ua')
            .send(postBodySaveExpress)
            .end((err, res) => {
                expect(res).to.have.status(200);
                console.log(res.body);
                expect(res.body.success).to.equals(false);
                done();
            });
    });
});