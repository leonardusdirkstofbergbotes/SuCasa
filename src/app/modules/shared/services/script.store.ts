import { GOOGLEMAPS } from './../../../configs/keys';

interface Scripts {
    name: string;
    src: string;
}  
export const ScriptStore: Scripts[] = [
    {name: 'googlemaps', src: `https://maps.googleapis.com/maps/api/js?key=${GOOGLEMAPS.ApiKey}`}
];