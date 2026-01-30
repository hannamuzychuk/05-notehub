import axios, { type AxiosResponse } from "axios";
import type { Note } from "../types/notes";

export interface NotesResponse {
    notes: Note[];
    totalPages: number;
}

const api = axios.create({
    baseURL: 'https://notehub-public.goit.study/api',
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
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
};

export const createNote = async (note: Omit<Note, 'id' | 'createdAt'>): Promise<Note> => {
    const response: AxiosResponse<Note> = await api.post<Note>('/notes', note);
    return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
    const response: AxiosResponse<Note> = await api.delete<Note>(`/notes/${id}`);
    return response.data;
};