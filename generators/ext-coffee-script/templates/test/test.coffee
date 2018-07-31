'use strict'
expect = require('chai').expect
index = require('../lib/index.js')

describe 'index.id', () ->
  it 'should exist', () ->
    expect(index.id).to.not.be.an('undefined')
  it 'should be a function', () ->
    expect(index.id).to.be.a('function')

describe 'index.id', () ->
  it 'should return nothing', () ->
    expect(index.id()).to.equal(undefined)
  it 'should return a value', () ->
    expect(index.id(undefined)).to.equal(undefined)
    expect(index.id(null)).to.equal(null)
    expect(index.id(true)).to.equal(true)
  it 'should return an array', () ->
    a = index.id(undefined, null)
    expect(a).to.be.an('array')
    expect(a).to.include.members([undefined, null])
    b = index.id(false, true)
    expect(b).to.be.an('array')
    expect(b).to.include.members([false, true])
    c = index.id(0, 1)
    expect(c).to.be.an('array')
    expect(c).to.include.members([0, 1])
