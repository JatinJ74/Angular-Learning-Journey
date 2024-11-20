export type Ticket = {
    id: string,
    title: string,
    request: string,
    status: 'open' | 'closed';
}