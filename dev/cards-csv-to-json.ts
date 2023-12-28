import { Card } from './schemas/card'

const headerMap = {
    'card type': 'type',
}
// "ability text"
// "leader unit ability text"

// export function cardsCsvToJson ( csv: string ): Card[] {
export function cardsCsvToJson ( csv: string ) {
    const lines = csv.trim().split( '\r\n' ).slice( 0, 10 )
    const headers = lines[ 0 ].split( ',' ).map( x => x.trim() )

    console.log(
        cardsCsvToJson.name,
        lines.length,
        lines,
        headers,
    )

    // return [
    //     {}
    // ]
}