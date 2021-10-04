export class Event {
    id: number;
    url: string;
    title: string;
    description_short: string;
    start_datetime: Date;
    end_datetime: Date;
    images: Array<{ sizes: { small: { height: number, width: number, url: string } } }>;
}