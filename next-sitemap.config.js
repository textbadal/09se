/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://dreamhomesbihar.online", // change to your domain
  generateRobotsTxt: true, // Generates robots.txt file
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/admin"], // if you want to exclude private pages
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
    ],
  },
};
