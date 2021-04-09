import { Form, FormName, Button } from './styles.module.css'

export const FormikForm = ({ title, isSubmitting, onSubmit, children }) => {
  return (
    <form
      className={Form}
      onSubmit={onSubmit}
    >
      <h3 className={FormName}>
        {title}
      </h3>

      {children}
      
      <button
        type='submit'
        disabled={isSubmitting}
        className={Button}
      >
        { isSubmitting ? 'Enviando...' : 'Enviar' }
      </button>
    </form>
  )
}
