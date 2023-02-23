import PropTypes from 'prop-types'
import css from 'components/Filter/filter.module.css'

const Filter = ({filter, onChange}) => {
    return (
        <input className={css.input} type="text" value={filter} onChange={onChange}/>
    )
}

export default Filter;

Filter.propTypes = {
    filter: PropTypes.string,
    onChange: PropTypes.func.isRequired,
}