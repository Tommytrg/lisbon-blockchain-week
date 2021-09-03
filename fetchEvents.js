import Papa from 'papaparse'

export function fetchEvents(fileUrl) {
  return new Promise((resolve, reject) => {
    Papa.parse(fileUrl, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete(results) {
        if (results.data) {
          return resolve(
            results.data.map((event) => ({
              ...event,
              from: Number(event.from),
              to: Number(event.to),
            }))
          )
        } else {
          return reject(results.errors)
        }
      },
    })
  })
}
