import React, { useContext, useMemo } from 'react';

import get from 'lodash/get';

import { ColGroupProps, ColElement } from '../types';
import TableContext from '../contexts/tableContext';
import SizeMap from '../utils/sizeMap';
import { normalizeWidth } from '../utils/style';

/**
 * Set width to each col
 * @param children
 * @param widths
 * @param setWidths
 * @param offset
 */
function useColGroup(children: ColElement | Array<ColElement>, widths: SizeMap, offset = 0): Array<ColElement> {
  return useMemo(() => {
    const cols: Array<ColElement> = [];

    let i = offset;

    React.Children.toArray(children).forEach((col) => {
      const { span = 1, style = {} } = col.props;

      for (let j = 0; j < span; j++) {
        const currentWidth = widths.get(i);
        const width = currentWidth === void 0 ? style.width: currentWidth;
        const normalizedStyle = normalizeWidth({ ...style, width });

        cols.push(React.cloneElement(col, { key: i, span: 1, style: normalizedStyle }));
        i++;
      };
    });

    return cols;
  }, [children, widths, offset]);
}

const ColGroup: React.FunctionComponent<ColGroupProps> = (props: ColGroupProps) => {
  const { widths } = useContext(TableContext);
  const cols = useColGroup(props.children, widths, props.offset);

  return (<colgroup>{ cols }</colgroup>);
};

ColGroup.displayName = 'ColGroup';

ColGroup.propTypes = {
  children: function(props: Partial<ColGroupProps>, propName: string, componentName: string): Error | null {
    const children = React.Children.toArray(props[propName as keyof ColGroupProps]);

    if (children.length === 0) {
      return new TypeError(`\`${componentName}\` must have at least one \`Col\` as its children`);
    }

    if (children.some((child) => (get(child, 'type.displayName') !== 'Col'))) {
      return new TypeError(`Each of the children of \`${componentName}\` must be \`Col\``);
    }

    return null;
  },
};

export default ColGroup;
