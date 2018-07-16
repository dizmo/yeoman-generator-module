'use strict';
var expect = require('chai').expect;
let index = require('../dist/index.js');

describe('index', () => {
    it('should exist', () => {
        expect(index).to.exist;
    });
    it('should export a default', () => {
        expect(index.default).to.exist;
    });
});

describe('index.id', () => {
    it('should exist', () => {
        expect(index.id).to.exist;
    });
    it('should be a function', () => {
        expect(index.id).to.be.a('function');
    });
    it('should return nothing', () => {
        expect(index.id()).to.equal(undefined);
    });
    it('should return something', () => {
        expect(index.id(undefined)).to.equal(undefined);
        expect(index.id(null)).to.equal(null);
        expect(index.id(true)).to.equal(true);
    });
    it('should return anything', () => {
        expect(index.id(undefined, null)[0]).to.equal(undefined);
        expect(index.id(undefined, null)[1]).to.equal(null);
        expect(index.id(false, true)[0]).to.equal(false);
        expect(index.id(false, true)[1]).to.equal(true);
        expect(index.id(0, 1)[0]).to.equal(0);
        expect(index.id(0, 1)[1]).to.equal(1);
    });
});
