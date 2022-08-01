

import dotenv from 'dotenv'

dotenv.config()




// const environment = process.env.NODE_ENV || 'development'

const env = process.env.NODE_ENV || 'development'


export const dbURI = env === 'production'

  ? process.env.MONGODB_URI

  : `mongodb://localhost/citydb-${env}`

export const PORT = process.env.PORT || 8000

export const secret = process.env.SECRET