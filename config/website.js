const meta = {
  // Metadata
  siteDescription:
    'Hi, my name is Akash Kundu. I am a school student and occasionally designing websites, applications, and everything in between. I do developer friendly code which is very too easy to understand and customized it as per needs.',
  siteTitleAlt: 'Akash Kundu',
  siteShortName: 'Akash Kundu',
  siteUrl: 'https://destruc-dev.netlify.app', // No trailing slash!
};

const social = {
  siteLogo: `src/static/logo.svg`,
  siteBanner: `https://cdn.discordapp.com/attachments/727410049420361768/781502399264063508/avento.gif`,
  twitter: '@anuraghazru',
};

const website = {
  ...meta,
  ...social,
  disqusShortName: 'akashkundu',
  googleAnalyticsID: 'UA-119972196-1',
  // Manifest
  themeColor: '#6D83F2',
  backgroundColor: '#6D83F2',
};

module.exports = website;
