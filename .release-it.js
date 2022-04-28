module.exports = {
  git: {
    commitMessage: 'chore: release ${version}',
    tagName: 'v${version}',
  },
  npm: {
    publish: true,
  },
  github: {
    release: true,
  },
  plugins: {
    '@release-it/conventional-changelog': {
      preset: {
        name: 'conventionalcommits',
        types: [
          {
            type: 'feat',
            section: '✨ Features',
          },
          {
            type: 'fix',
            section: '🐛 Bug Fixes',
          },
          {
            type: 'perf',
            section: '💨 Performance Improvements',
          },
          {
            type: 'chore(deps)',
            section: '🛠️ Dependency Upgrades',
          },
          {
            type: 'docs',
            section: '📚 Documentation',
          },
        ],
      },
    },
  },
};
