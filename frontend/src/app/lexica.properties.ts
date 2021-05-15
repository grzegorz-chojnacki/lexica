import { environment } from 'src/environments/environment'

export const lexicaURL = (environment.production)
  ? 'http://153.19.8.161:80/api'
  : 'http://localhost:8080/api'

export const snackBarDuration = 2000
