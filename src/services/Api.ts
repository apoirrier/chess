const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const PLAY_COMPUTER_PATH = '/computer/play'
export const EVALUATE_PATH = '/feedback/evaluate'

export async function request(path: string, body: string): Promise<any> {
    if(!API_BASE_URL) {
        throw new Error('API_BASE_URL is not defined')
    }

    const url = `${API_BASE_URL}${path}`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: body
    })

    if(!response.ok) {
        throw new Error(`Failed to fetch ${url}: [${response.status}] ${response.text()}`)
    }

    return response.json()
}
