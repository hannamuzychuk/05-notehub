import axios, { type AxiosResponse } from "axios";
import type { Note } from "../types/notes";

export interface NotesResponse {
    notes: Note[];
    total_pages: number;
}

const api = axios.create({
    baseURL: 'https://notehub-public.goit.study/api',
    headers: {
        Authorization: `Bearer ${import.meta.VITE_NOTEHUB_TOKEN}`,
    },
});


export const fetchNotes = async (page: number, search: string): Promise<NotesResponse> => {
    const response: AxiosResponse<NotesResponse> = await api.get<NotesResponse>('/notes', {
        params: {
            page,
            perPage: 12,
            search,
        }
    });
    return response.data;
}