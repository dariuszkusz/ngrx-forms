import { Actions, SetUserDefinedPropertyAction } from '../../actions';
import { FormArrayState } from '../../state';

export function setUserDefinedPropertyReducer<TValue>(
  state: FormArrayState<TValue>,
  action: Actions<TValue[]>,
): FormArrayState<TValue> {
  if (action.type !== SetUserDefinedPropertyAction.TYPE) {
    return state;
  }

  if (action.controlId !== state.id) {
    return state;
  }

  if (state.userDefinedProperties[action.payload.name] === action.payload.value) {
    return state;
  }

  return {
    ...state,
    userDefinedProperties: {
      ...state.userDefinedProperties,
      [action.payload.name]: action.payload.value,
    },
  };
}
