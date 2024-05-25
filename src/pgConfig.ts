
import { Sequelize } from "sequelize";
import { WeatherFactory } from './Weather';
const sequelize = new Sequelize({
database: "postgres",
username: 'postgres',
password: "Dpvinay@2209", 
port: 5432,
dialect: 'postgres',

});

const Weather = WeatherFactory(sequelize);

export { sequelize, Weather };