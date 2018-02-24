import { Actions, AddArrayControlAction } from '../../actions';
import { computeArrayState, createChildState, FormArrayState, InferredControlState } from '../../state';
import { childReducer } from './util';

export function addControlReducer<TValue>(
  state: FormArrayState<TValue>,
  action: Actions<TValue[]>,
): FormArrayState<TValue> {
  if (action.type !== AddArrayControlAction.TYPE) {
    return state;
  }

  if (action.controlId !== state.id) {
    return childReducer(state, action);
  }

  const index = action.payload.index === null ? state.controls.length : action.payload.index;

  if (index > state.controls.length || index < 0) {
    throw new Error(`Index ${index} is out of bounds for array '${state.id}' with length ${state.controls.length}!`); // `;
  }

  let controls = [...state.controls];
  controls.splice(index, 0, createChildState(`${state.id}.${index}`, action.payload.value) as InferredControlState<TValue>);
  controls = controls.map((c, i) => ({ ...(c as any), id: `${state.id}.${i}` }));

  return computeArrayState(
    state.id,
    controls,
    state.value,
    state.errors,
    state.pendingValidations,
    state.userDefinedProperties,
  );
}
