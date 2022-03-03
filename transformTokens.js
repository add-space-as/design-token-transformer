const StyleDictionary = require('style-dictionary')
const baseConfig = require('./config.json')
const Color = require('tinycolor2')

StyleDictionary.registerTransform({
  name: 'size/px',
  type: 'value',
  matcher: token => {
    return (token.unit === 'pixel' || token.type === 'dimension') && token.value !== 0
  },
  transformer: token => {
    return `${token.value}px`
  }
})

StyleDictionary.registerTransform({
  name: 'size/percent',
  type: 'value',
  matcher: token => {
    return token.unit === 'percent' && token.value !== 0
  },
  transformer: token => {
    return `${token.value}%`
  }
})

StyleDictionary.registerTransformGroup({
  name: 'custom/css',
  transforms: StyleDictionary.transformGroup['css'].concat([
    'size/px',
    'size/percent'
  ])
})

StyleDictionary.registerTransformGroup({
  name: 'custom/less',
  transforms: StyleDictionary.transformGroup['less'].concat([
    'size/px',
    'size/percent'
  ])
})

StyleDictionary.registerTransformGroup({
  name: 'custom/scss',
  transforms: StyleDictionary.transformGroup['less'].concat([
    'size/px',
    'size/percent'
  ])
})

StyleDictionary.registerFilter({
  name: 'validToken',
  matcher: function(token) {
    return ['dimension', 'string', 'number', 'color'].includes(token.type)
  }
})

StyleDictionary.registerTransform({
    name: 'colors/hex8flutter',
    type: 'value',
    matcher: prop => {
        return prop.attributes.category === 'colors'
    },
    transformer: prop => {
        var str = Color(prop.value).toHex8().toUpperCase();
        return `Color(0x${str.slice(6)}${str.slice(0, 6)})`;
    },
})

const StyleDictionaryExtended = StyleDictionary.extend(baseConfig)

StyleDictionaryExtended.buildAllPlatforms()
