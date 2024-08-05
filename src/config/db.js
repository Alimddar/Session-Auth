import { Sequelize } from 'sequelize';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const sequelize = new Sequelize({
  storage: path.join(__dirname, '..', 'data.db'),
  dialect: 'sqlite',
});

export const initialize = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export const dropTables = async () => {
  try {
    await sequelize.drop();
    console.log('All tables were dropped successfully.');
  } catch (error) {
    console.error('Unable to drop the tables:', error);
  }
};
