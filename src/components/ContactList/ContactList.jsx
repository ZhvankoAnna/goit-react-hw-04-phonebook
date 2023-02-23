import PropTypes from 'prop-types';
import ListElement from 'components/ListElement/ListElement';
import css from 'components/ContactList/contact-list.module.css';

const ContactList = ({ arr = [], onDeleteContact }) => {
  return (
    <ul className={css.list}>
      {arr.map(({ id, name, number }) => (
        <ListElement
          key={id}
          id={id}
          name={name}
          number={number}
          onDeleteContact={onDeleteContact}
        />
      ))}
    </ul>
  );
};

export default ContactList;

ContactList.propTypes = {
  arr: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func.isRequired,
};
