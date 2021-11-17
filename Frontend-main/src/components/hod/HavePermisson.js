import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Permisson = props => {
  if (props.userRoles) {
    const couldShow = props.userRoles.includes(props.user.role);
    return couldShow ? props.children : null;
  }
  return null;
};

Permisson.propTypes = {
  userRoles: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
  const { user } = state;
  return { user };
};

export const HavePermisson = connect(mapStateToProps)(Permisson);


const Access = props => {
  if (props.creatorId) {
    const couldShow = props.creatorId === props.user._id;
    return couldShow ? props.children : null;
  }
  return null;
};

Access.propTypes = {
  creatorId: PropTypes.string,
};


export const Authorization = connect(mapStateToProps)(Access);