const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

export const uri = `mongodb+srv://${username}:${password}@cluster0.u1z8wkz.mongodb.net/next_app_db?appName=Cluster0`;
