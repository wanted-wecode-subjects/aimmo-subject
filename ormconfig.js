module.exports = {
  type: "mongodb",
  host: "localhost",
  port: 27017,
  database: "test",
  synchronize: true,
  logging: false,
  entities: ["src/model/*.ts"],
};
