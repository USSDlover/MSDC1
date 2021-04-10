export const APP_DB =
  process.env.DB_URL ?? 'mongodb://localhost:27017/soldiering';

// To access MongoDb from docker internal virtual network
// export const APP_DB = 'mongodb://mongo:27017/soldiering';
export const APP_COLLECTIONS = {
  exam: 'exams',
  question: 'questions',
  user: 'users',
  requester: 'requesters',
};
export const APP_CONNECTION = 'soldiering';

export const JWT_SECRET = 'hD84Fjds$8#skg*$9Sg0)d';
