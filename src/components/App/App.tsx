import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchNotes, type NotesResponse } from "../../services/noteService";
import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import Pagination from "../Pagination/Pagination";
import { useDebouncedCallback } from "use-debounce";
import toast, { Toaster } from "react-hot-toast";
// import { ErrorMessage } from "formik";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";


export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
    
    const debouncedSearch = useDebouncedCallback((value: string) => {
        setSearch(value);
        setPage(1);
    }, 300);
    
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const value = event.target.value;
    setSearchInput(value);
    debouncedSearch(value);
    };

  const { data, isLoading, isError, isSuccess } = useQuery<NotesResponse>({
    queryKey: ["notes", page, search],
      queryFn: () => fetchNotes(page, search),
      enabled: search !== '',
     placeholderData: keepPreviousData,
  });
    
    useEffect(() => {
        if (isSuccess && data?.notes.length === 0 && search) {
            toast.error('No notes found for you request.');  

        }
    }, [isSuccess, data?.notes.length, search])
    
  return (
    <div className={css.app}>
          <header className={css.toolbar}>
              
              <SearchBox value={searchInput} onChange={handleSearchChange} />
              <Toaster position='top-right' /> 
              {isLoading && <Loader />}
              {isError && <ErrorMessage/>}
              
          {data && data.totalPages > 1 && (
                  <Pagination pageCount={data.totalPages} onPageChange={setPage} />
            )}
              
              <button className={css.button} onClick={() => setIsOpen(true)}>
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
