import { Connection, createConnection, createConnections, getConnectionOptions } from 'typeorm';


export default async (host = "database"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host,
      database:
        process.env.NODE_ENV === "test"
        ? "movierental_test" : defaultOptions.database
    })
  )
}

createConnections();
