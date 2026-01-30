import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchNotes, type NotesResponse } from "../../services/noteService";
import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import Pagination from "../Pagination/Pagination";
import { useDebouncedCallback } from "use-debounce";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
    const debouncedSetSearch = useDebouncedCallback((value: string) => { setSearch(value); setPage(1); }, 300);

  const { data, isLoading } = useQuery<NotesResponse>({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, search),
  });
        
  return (
    <div className={css.app}>
          <header className={css.toolbar}>
              
              <SearchBox value={search} onChange={debouncedSetSearch} />
              
          {data && data.totalPages > 1 && (
                  <Pagination pageCount={data.totalPages} onPageChange={setPage} />
            )}
              
        <button className="css.buton" onClick={() => setIsOpen(true)}>
          Create note +
        </button>
          </header>
          
      {isLoading && <strong>Loading notes...</strong>}

          
     {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isOpen && (
        <Modal onClose={()=> setIsOpen(false)}>
          <NoteForm onClose={()=> setIsOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
