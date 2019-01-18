import React, { Component } from 'react';
import {connect} from 'react-redux';

class TestIt extends Component {
  
  render() {
    //console.log(this.props.notes)
    return (
      <div>
        <h2>Welcome to TestIt!</h2>
        <hr />
        <h3>Notes</h3>
        <table>
          <tbody>
            {this.props.notes.map(note => (
              <tr>
                <td>{note.text}</td>
                <td><button>edit</button></td>
                <td><button>delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    notes:state.notes
  }
}
// const mapDispatchToProps = dispatch => {
//   return {
//   }
// }


export default connect(mapStateToProps)(TestIt);