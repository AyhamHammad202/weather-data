const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const repoName = process.env.GITHUB_REPOSITORY ? '/' + process.env.GITHUB_REPOSITORY.split('/')[1] : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: isGithubActions ? repoName : '',
  images: {
    unoptimized: true,
  },
  experimental: {},
}

module.exports = nextConfig
