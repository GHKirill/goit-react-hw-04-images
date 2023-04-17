import PropTypes from 'prop-types';
import React from 'react';
import { Circles } from 'react-loader-spinner';
import css from './Button.module.css';

export default function Button({
  addPage,
  page,
  wrongQuery,
  allPhotosNumber,
  currentPhotosNumber,
  loading,
}) {
  const handlingButtonMore = event => {
    addPage(page + 1);
  };
  return (
    <div className={css.buttonWrapper}>
      {loading ? (
        <Circles
          className={css.spinner}
          height="40"
          width="40"
          color="#9f51e7"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : (
        <div style={{ width: 40 }}></div>
      )}
      {wrongQuery ||
      allPhotosNumber === currentPhotosNumber.length ||
      currentPhotosNumber.length < 12 ? (
        <></>
      ) : (
        <button
          type="button"
          onClick={handlingButtonMore}
          className={css.button}
        >
          load next
        </button>
      )}
    </div>
  );
}

// }
//export default class Button extends Component {
//   handlingButtonMore = event => {
//     this.props.addPage(this.props.page + 1);
//   };
//   render() {
//     const { wrongQuery, allPhotosNumber, currentPhotosNumber, loading } =
//       this.props;
//     return (
//       <div className={css.buttonWrapper}>
//         {loading ? (
//           <Circles
//             className={css.spinner}
//             height="40"
//             width="40"
//             color="#9f51e7"
//             ariaLabel="circles-loading"
//             wrapperStyle={{}}
//             wrapperClass=""
//             visible={true}
//           />
//         ) : (
//           <div style={{ width: 40 }}></div>
//         )}
//         {wrongQuery ||
//         allPhotosNumber === currentPhotosNumber.length ||
//         currentPhotosNumber.length < 12 ? (
//           <></>
//         ) : (
//           <button
//             type="button"
//             onClick={this.handlingButtonMore}
//             className={css.button}
//           >
//             load next
//           </button>
//         )}
//       </div>
//     );
//   }
// }
Button.propTypes = {
  addPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  wrongQuery: PropTypes.bool.isRequired,
  allPhotosNumber: PropTypes.number.isRequired,
  currentPhotosNumber: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};
