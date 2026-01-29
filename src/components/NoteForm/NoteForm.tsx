import { Formik, Form, Field, ErrorMessage } from 'formik';
import css from './NoteForm.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as Yup from "yup";





interface NoteFormProps {
    onClose: () => void;
}

const Schema = Yup.object({
    title: Yup.string().min(3).max(50).required(),
    content: Yup.string().max(500).required(),
    tag: Yup.string().required(),

});

export default function NoteForm({ onClose }: NoteFormProps) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            onClose();
        },
    });
    
    
    return (
        <Formik
            initialValues={{ title: '', content: '', tag: 'Todo' }}
            validationSchema={Schema}
            onSubmit={values => mutation.mutate(values)}
        >
  
        <Form className={css.form}>
  <div className={css.formGroup}>
    <label htmlFor="title">Title</label>
    <Field id="title" type="text" name="title" className={css.input} />
    <ErrorMessage name="title" className={css.error} />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="content">Content</label>
    <Field
      id="content"
      name="content"
      rows={8}
      className={css.textarea}
    />
    <ErrorMessage name="content" className={css.error} />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="tag">Tag</label>
    <Field id="tag" name="tag" className={css.select}>
      <option value="Todo">Todo</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Meeting">Meeting</option>
      <option value="Shopping">Shopping</option>
    </Field>
    <ErrorMessage name="tag" className={css.error} />
  </div>

  <div className={css.actions}>
                    <button type="button"
                        className={css.cancelButton}
                        onClick={onClose}
                    >
      Cancel
    </button>
    <button
      type="submit"
      className={css.submitButton}
      disabled={mutation.isPending}
    >
      Create note
    </button>
  </div>
        </Form>
        </Formik>

    )
}