module.exports = {
  type: "sqlite",
  database: ":memory:",
  synchronize: true,
  logging: false,
  entities: ["src/entity/*.ts"],
};
