const config={
mongodbServer: `mongodb://${process.env.MONGO_HOST || 'localhost'}:27017/iConnectData`,
tokenExpiry: 86400,
jwtSecret: "5zBDkiMrJtV1l4okIHwK4vUVw2mc7Crg47LGPK0Awf7GQLXGF0VivNnGbRbvWGINf1T4KZVwDXVRjbOG59j1IeNAdaOCTGSxDMeqDjuXDZtThLgK8nXHxKRTqbxgDNyOWe_XxVQm50aECLn6a3BNuwC4hP34sFeJIMnlwdmCLTU",
}
module.exports = config;