export { default as HistoryNavigator } from './historyNavigator';
export { addModalOpenBodyClass, removeModalOpenBodyClass } from './DOMOperations';
export { Theme } from './theme';
// Props
export { Breakpoint } from './propsValues/breakpoint';
export { Size } from './propsValues/size';
export { Type } from './propsValues/type';
export { DateMode } from './propsValues/dateMode';
export { MonthFormat } from './propsValues/monthFormat';
// Position and Placement are duplicated and needs to be aligned with a breaking change
// https://transferwise.atlassian.net/browse/DS-249
export { Position, ArrowPosition } from './propsValues/position';
export { Layout } from './propsValues/layouts';
export { FormControlType } from './propsValues/formControlType';
export { Status } from './propsValues/status';
export { MessageType } from './propsValues/messageType';
export { JustifyContent, AlignItems, FlexDirection, Spacer } from './propsValues/flexProperties';

export function pickProps(originalProps, values) {
  const extractedProps = {};
  Object.keys(originalProps).forEach(key => {
    const value = originalProps[key];
    if (values.indexOf(value) > -1) {
      extractedProps[key] = value;
    }
  });
  return extractedProps;
}
