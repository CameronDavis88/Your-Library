import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../redux/reducer'; 




const Navbar = ({ props }) => {

  // useEffect(() => {

  // }, [])

  return (
    <div>
---------This is the navbar---------
{/* Obviously conditionally render this according to what page is aldreay being displayed */}
<button onClick={() => props.history.push('/authentication')} >To Authentication</button>
<button onClick={() => props.history.push('/')} >Back to Public Library</button>

    </div>
  )
};

const mapStateToProps = (reduxState) => reduxState;

  export default connect(mapStateToProps, { getUser })(Navbar);
