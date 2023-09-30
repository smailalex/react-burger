import PropTypes from 'prop-types';

const Types = {
    ingredient: {
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number, 
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number

    },
    order: {
        orderId: PropTypes.number.isRequired
    },
    modal: {
        WrappedComponent: PropTypes.elementType,
    }
}
export default Types;