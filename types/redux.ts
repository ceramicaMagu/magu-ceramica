export type StatusItem = {
    response: 'pending' | 'fulfilled' | 'rejected' | ''
    message: string
    loading: boolean
}

export type StatusMap = Record<string, StatusItem>