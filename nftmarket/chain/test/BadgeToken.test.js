"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
// test/BadgeToken.test.ts
var chai_1 = require("chai");
var hardhat_1 = require("hardhat");
var base64 = require("base-64");
var _name = 'BadgeToken';
var _symbol = 'BADGE';
describe("BadgeToken", function () {
    var badge;
    var account0, account1;
    beforeEach(function () {
        return __awaiter(this, void 0, void 0, function () {
            var BadgeToken;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, hardhat_1.ethers.getSigners()];
                    case 1:
                        _a = _b.sent(), account0 = _a[0], account1 = _a[1];
                        return [4 /*yield*/, hardhat_1.ethers.getContractFactory("BadgeToken")];
                    case 2:
                        BadgeToken = _b.sent();
                        return [4 /*yield*/, BadgeToken.deploy(_name, _symbol)];
                    case 3:
                        badge = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it("Should has the correct name and symbol ", function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, badge.name()];
                    case 1:
                        _a.apply(void 0, [_c.sent()]).to.equal(_name);
                        _b = chai_1.expect;
                        return [4 /*yield*/, badge.symbol()];
                    case 2:
                        _b.apply(void 0, [_c.sent()]).to.equal(_symbol);
                        return [2 /*return*/];
                }
            });
        });
    });
    it("Should tokenId start from 1 and auto increment", function () {
        return __awaiter(this, void 0, void 0, function () {
            var address1, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, account1.getAddress()];
                    case 1:
                        address1 = _d.sent();
                        return [4 /*yield*/, badge.mintTo(address1)];
                    case 2:
                        _d.sent();
                        _a = chai_1.expect;
                        return [4 /*yield*/, badge.ownerOf(1)];
                    case 3:
                        _a.apply(void 0, [_d.sent()]).to.equal(address1);
                        return [4 /*yield*/, badge.mintTo(address1)];
                    case 4:
                        _d.sent();
                        _b = chai_1.expect;
                        return [4 /*yield*/, badge.ownerOf(2)];
                    case 5:
                        _b.apply(void 0, [_d.sent()]).to.equal(address1);
                        _c = chai_1.expect;
                        return [4 /*yield*/, badge.balanceOf(address1)];
                    case 6:
                        _c.apply(void 0, [_d.sent()]).to.equal(2);
                        return [2 /*return*/];
                }
            });
        });
    });
    it("Should mint a token with event", function () {
        return __awaiter(this, void 0, void 0, function () {
            var address1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, account1.getAddress()];
                    case 1:
                        address1 = _a.sent();
                        return [4 /*yield*/, (0, chai_1.expect)(badge.mintTo(address1))
                                .to.emit(badge, 'Transfer')
                                .withArgs(hardhat_1.ethers.constants.AddressZero, address1, 1)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it("Should mint a token with desired tokenURI (log result for inspection)", function () {
        return __awaiter(this, void 0, void 0, function () {
            var address1, tokenUri, tokenId, data, itemInfo, svg, idInSVG;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, account1.getAddress()];
                    case 1:
                        address1 = _a.sent();
                        return [4 /*yield*/, badge.mintTo(address1)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, badge.tokenURI(1)
                            // console.log("tokenURI:")
                            // console.log(tokenUri)
                        ];
                    case 3:
                        tokenUri = _a.sent();
                        tokenId = 1;
                        data = base64.decode(tokenUri.slice(29));
                        itemInfo = JSON.parse(data);
                        (0, chai_1.expect)(itemInfo.name).to.be.equal('Badge #' + String(tokenId));
                        (0, chai_1.expect)(itemInfo.description).to.be.equal('Badge NFT with on-chain SVG image.');
                        svg = base64.decode(itemInfo.image.slice(26));
                        idInSVG = svg.slice(256, -13);
                        (0, chai_1.expect)(idInSVG).to.be.equal(String(tokenId));
                        return [2 /*return*/];
                }
            });
        });
    });
    it("Should mint 10 token with desired tokenURI", function () {
        return __awaiter(this, void 0, void 0, function () {
            var address1, i, tokenUri, data, itemInfo, svg, idInSVG, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, account1.getAddress()];
                    case 1:
                        address1 = _b.sent();
                        i = 1;
                        _b.label = 2;
                    case 2:
                        if (!(i <= 10)) return [3 /*break*/, 6];
                        return [4 /*yield*/, badge.mintTo(address1)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, badge.tokenURI(i)];
                    case 4:
                        tokenUri = _b.sent();
                        data = base64.decode(tokenUri.slice(29));
                        itemInfo = JSON.parse(data);
                        (0, chai_1.expect)(itemInfo.name).to.be.equal('Badge #' + String(i));
                        (0, chai_1.expect)(itemInfo.description).to.be.equal('Badge NFT with on-chain SVG image.');
                        svg = base64.decode(itemInfo.image.slice(26));
                        idInSVG = svg.slice(256, -13);
                        (0, chai_1.expect)(idInSVG).to.be.equal(String(i));
                        _b.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 2];
                    case 6:
                        _a = chai_1.expect;
                        return [4 /*yield*/, badge.balanceOf(address1)];
                    case 7:
                        _a.apply(void 0, [_b.sent()]).to.equal(10);
                        return [2 /*return*/];
                }
            });
        });
    });
});
