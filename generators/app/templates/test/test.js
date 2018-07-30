'use strict';
let expect = require('chai').expect;
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
});

describe('index.id', () => {
    it('should return nothing', () => {
        expect(index.id()).to.equal(undefined);
    });
    it('should return a value', () => {
        expect(index.id(undefined)).to.equal(undefined);
        expect(index.id(null)).to.equal(null);
        expect(index.id(true)).to.equal(true);
    });
    it('should return an array', () => {
        let a = index.id(undefined, null)
        expect(a).to.be.an('array');
        expect(a).to.include.members([undefined, null]);
        let b = index.id(false, true)
        expect(b).to.be.an('array');
        expect(b).to.include.members([false, true]);
        let c = index.id(0, 1)
        expect(c).to.be.an('array');
        expect(c).to.include.members([0, 1]);
    });
});
