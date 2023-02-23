import PropTypes from 'prop-types';
import { RxAvatar } from 'react-icons/rx';
import css from 'components/ListElement/list-element.module.css';

const ListElement = ({ id, name, number, onDeleteContact }) => {
  return (
    <li className={css.item}>
      <RxAvatar className={css.icon} />
      <p>
        {name}: {number}
      </p>
      <button
        className={css.btn}
        type="button"
        onClick={() => onDeleteContact(id)}
      >
        Delete
      </button>
    </li>
  );
};

export default ListElement;

ListElement.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
