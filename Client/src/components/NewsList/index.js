import PropTypes from 'prop-types'
import { ChildishTitle } from '../ChildishTitle'
import Card from '../Card'
import styles from './styles.module.css'

export const NewsList = ({ newsList, title }) => {
  return (
    <>
      <ChildishTitle>
        {title}
      </ChildishTitle>

      <div className={styles.listContainer}>
        {
          newsList.map(entry => {            
            return <Card key={ entry.id } path='novedades' card={ entry } />;
          })
        }
      </div>
    </>
  )
}

NewsList.propTypes = {
  newsList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  })),
  title: PropTypes.string.isRequired
}
