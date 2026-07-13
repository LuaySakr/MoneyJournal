module.exports = {
  transformer: {
    getSourceExts: () => [...exts, 'jsx'],
  },
  resolver: {
    sourceExts: ['js', 'json', 'ts', 'tsx'],
  },
};