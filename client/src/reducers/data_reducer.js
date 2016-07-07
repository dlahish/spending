import {
  FETCH_DATA,
  UNAUTH_USER
} from '../actions/types';
import moment from 'moment';

const data = (state = [], action) => {
  switch (action.type) {
    case FETCH_DATA:
      // let parsedDate = moment(action.payload.date).format("DD/MM/YYYY");
      // console.log(actions.payload.date);
      // console.log(parsedDate);
      return [
        ...state, {
          fileName: action.payload.fileName,
          uploadDate: action.payload.uploadDate,
          date: action.payload.date,
          category: action.payload.category,
          amount: action.payload.amount,
          note: action.payload.note,
          _id: action.payload._id
        }
      ];
    case UNAUTH_USER:
      return state = [];
    default:
      return state;
  }
};

export default data;
