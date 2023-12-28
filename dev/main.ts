import { cardsCsvToJson } from './cards-csv-to-json'

const file = Bun.file( '../_temp/swu data start.csv' )
const result = cardsCsvToJson( await file.text() )
console.log( result )