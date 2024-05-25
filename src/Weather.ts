

import { sequelize } from './pgConfig'; 

import { DataTypes, Model, Sequelize } from 'sequelize';

export class Weather extends Model {
  public id!: number;
  public city!: string;
  public country!: string;
  public weather!: string;
  public time!: Date;
  public longitude!: number;
  public latitude!: number;
}

export function WeatherFactory(sequelize: Sequelize): typeof Weather {
  Weather.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false
      },
      weather: {
        type: DataTypes.STRING,
        allowNull: false
      },
      time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'Weathers'
    }
  );

  return Weather;
}
