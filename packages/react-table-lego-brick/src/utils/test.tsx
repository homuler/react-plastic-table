import React from 'react';
import { ThemeProvider } from 'styled-components';

import { render, RenderResult } from '@testing-library/react';

import defaultTheme from '../themes/defaultTheme';
import { mount, ReactWrapper } from 'enzyme';

type Props = { children?: React.ReactElement };

const Wrapper: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <ThemeProvider theme={ defaultTheme }>
      { props.children }
    </ThemeProvider>
  );
};

function renderWithContainer(ui: React.ReactElement, container?: HTMLElement, option = {}): RenderResult {
  return render(ui, { ...option, wrapper: Wrapper, container });
}

export function renderInTable(ui: React.ReactElement, option = {}): RenderResult {
  const table = document.createElement('table');

  return renderWithContainer(ui, document.body.appendChild(table), option);
}

export function renderInThead(ui: React.ReactElement, option = {}): RenderResult {
  const table = document.createElement('table');
  const thead = document.createElement('thead');

  document.body.appendChild(table);

  return renderWithContainer(ui, table.appendChild(thead), option);
}

export function renderInTbody(ui: React.ReactElement, option = {}): RenderResult {
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');

  document.body.appendChild(table);

  return renderWithContainer(ui, table.appendChild(tbody), option);
}

export function mountWithContainer(ui: React.ReactElement, option = {}): ReactWrapper {
  return mount(<Wrapper>{ ui }</Wrapper>, option);
}

export function mountInTable(ui: React.ReactElement, option = {}): ReactWrapper {
  return mountWithContainer(<table>{ ui }</table>, option);
}

export function mountInThead(ui: React.ReactElement, option = {}): ReactWrapper {
  return mountWithContainer(<table><thead>{ ui }</thead></table>, option);
}

export function mountInTbody(ui: React.ReactElement, option = {}): ReactWrapper {
  return mountWithContainer(<table><tbody>{ ui }</tbody></table>, option);
}

