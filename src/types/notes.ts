export interface Note {
    id: string,
    tag: string,
    title: string,
    content: string,
    createdAt: string, 
}

export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';