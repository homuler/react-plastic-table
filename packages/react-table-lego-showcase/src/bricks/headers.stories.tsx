import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { object, optionsKnob } from '@storybook/addon-knobs';

import '../index.css';
import { Table, Tbody, Thead, Tr, Th, Td, ColGroup, Col, DragAxis } from 'react-table-lego-brick';

storiesOf('Bricks/Headers', module)
  .add('Single Row', () => {
    return (
      <Table>
        <ColGroup>
          <Col span={ 3 } />
        </ColGroup>

        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>X</Th>
            <Th>Y</Th>
          </Tr>
        </Thead>

        <Tbody>
          <Tr>
            <Td>1</Td>
            <Td>x1</Td>
            <Td>y1</Td>
          </Tr>

          <Tr>
            <Td>2</Td>
            <Td>x2</Td>
            <Td>y2</Td>
          </Tr>
        </Tbody>
      </Table>
    );
  })
  .add('Multiple Rows', () => {
    return (
      <Table>
        <ColGroup>
          <Col span={ 3 } />
        </ColGroup>
        <ColGroup offset={ 3 }>
          <Col span={ 3 } />
          <Col />
          <Col />
          <Col />
        </ColGroup>

        <Thead>
          <Tr>
            <Th colSpan={ 3 } rowSpan={ 3 }>X</Th>
            <Th colSpan={ 3 }>Y</Th>
            <Th colSpan={ 3 }>Z</Th>
          </Tr>
          <Tr>
            <Th colSpan={ 2 }>Y1</Th>
            <Th>Y2</Th>
            <Th rowSpan={ 2 }>Z1</Th>
            <Th colSpan={ 2 }>Z2</Th>
          </Tr>
          <Tr>
            <Th>Y1-1</Th>
            <Th>Y1-2</Th>
            <Th>Y2-1</Th>
            <Th>Z2-1</Th>
            <Th>Z2-2</Th>
          </Tr>
        </Thead>

        <Tbody>
          <Tr>
            <Td>x-1-1</Td>
            <Td>x-2-1</Td>
            <Td>x-3-1</Td>
            <Td>y1-1-1</Td>
            <Td>y1-2-1</Td>
            <Td>y2-1-1</Td>
            <Td>z1-1</Td>
            <Td>z2-1-1</Td>
            <Td>z2-2-1</Td>
          </Tr>

          <Tr>
            <Td>x-1-2</Td>
            <Td>x-2-2</Td>
            <Td>x-3-2</Td>
            <Td>y1-1-2</Td>
            <Td>y1-2-2</Td>
            <Td>y2-1-2</Td>
            <Td>z1-2</Td>
            <Td>z2-1-2</Td>
            <Td>z2-2-2</Td>
          </Tr>
        </Tbody>
      </Table>
    );
  })
  .add('Puzzle', () => {
    return (
      <Table>
        <ColGroup>
          <Col />
          <Col />
          <Col />
          <Col />
          <Col />
        </ColGroup>

        <Thead>
          <Tr>
            <Th rowSpan={ 2 }>a</Th>
            <Th colSpan={ 3 }>b</Th>
            <Th>c</Th>
          </Tr>
          <Tr>
            <Th>d</Th>
            <Th rowSpan={ 2 } colSpan={ 2 }>e</Th>
            <Th colSpan={ 2 }>f</Th>
          </Tr>
          <Tr>
            <Th colSpan={ 2 }>g</Th>
            <Th rowSpan={ 3 } colSpan={ 2 }>h</Th>
          </Tr>
          <Tr>
            <Th colSpan={ 2 }>i</Th>
            <Th>j</Th>
            <Th rowSpan={ 2 }>k</Th>
          </Tr>
          <Tr>
            <Th colSpan={ 3 }>l</Th>
          </Tr>
        </Thead>
      </Table>
    );
  })
  .add('Resize Option', () => {
    const options = { Both: 'both', X: 'x', Y: 'y', None: 'none' };
    const resizeAxis = optionsKnob('Resize Axis', options, 'none', { display: 'radio' }, 'axis') as DragAxis;

    return (
      <Table>
        <ColGroup>
          <Col span={ 3 } />
        </ColGroup>

        <Thead>
          <Tr>
            <Th resizeAxis={ resizeAxis }>#</Th>
            <Th resizeAxis={ resizeAxis }>X</Th>
            <Th resizeAxis={ resizeAxis }>Y</Th>
          </Tr>
        </Thead>

        <Tbody>
          <Tr>
            <Td>1</Td>
            <Td>x1</Td>
            <Td>y1</Td>
          </Tr>

          <Tr>
            <Td>2</Td>
            <Td>x2</Td>
            <Td>y2</Td>
          </Tr>
        </Tbody>
      </Table>
    );
  })
  .add('Col Styled', () => {
    return (
      <Table>
        <ColGroup>
          <Col span={ 3 } style={ object('X style', { width: 50 }, 'style') }/>
        </ColGroup>
        <ColGroup offset={ 3 }>
          <Col span={ 3 } style={ object('Y style', { width: 100 }, 'style') } />
          <Col style={ object('Z1 style', { width: 200, backgroundColor: 'rgba(192, 192, 64, 0.1)' }, 'style') } />
          <Col style={ object('Z2-1 style', { width: 150 }, 'style') } />
          <Col style={ object('Z2-2 style', { width: '25%' }, 'style') } />
        </ColGroup>

        <Thead>
          <Tr>
            <Th colSpan={ 3 } rowSpan={ 3 }>X</Th>
            <Th colSpan={ 3 }>Y</Th>
            <Th colSpan={ 3 }>Z</Th>
          </Tr>
          <Tr>
            <Th colSpan={ 2 }>Y1</Th>
            <Th>Y2</Th>
            <Th rowSpan={ 2 }>Z1</Th>
            <Th colSpan={ 2 }>Z2</Th>
          </Tr>
          <Tr>
            <Th>Y1-1</Th>
            <Th>Y1-2</Th>
            <Th>Y2-1</Th>
            <Th>Z2-1</Th>
            <Th>Z2-2</Th>
          </Tr>
        </Thead>

        <Tbody>
          <Tr>
            <Td>x-1-1</Td>
            <Td>x-2-1</Td>
            <Td>x-3-1</Td>
            <Td>y1-1-1</Td>
            <Td>y1-2-1</Td>
            <Td>y2-1-1</Td>
            <Td>z1-1</Td>
            <Td>z2-1-1</Td>
            <Td>z2-2-1</Td>
          </Tr>

          <Tr>
            <Td>x-1-2</Td>
            <Td>x-2-2</Td>
            <Td>x-3-2</Td>
            <Td>y1-1-2</Td>
            <Td>y1-2-2</Td>
            <Td>y2-1-2</Td>
            <Td>z1-2</Td>
            <Td>z2-1-2</Td>
            <Td>z2-2-2</Td>
          </Tr>
        </Tbody>
      </Table>
    );
  })
  .add('Reorder Option', () => {
    const options = { Both: 'both', X: 'x', Y: 'y', None: 'none' };

    const onReorder = action('onReorder');
    const reorderAxis = optionsKnob('Reorder Axis', options, 'x', { display: 'inline-radio' }) as DragAxis;

    return (
      <Table>
        <ColGroup>
          <Col />
          <Col span={ 3 } />
          <Col span={ 3 } />
        </ColGroup>

        <Thead>
          <Tr>
            <Th id='x' rowSpan={ 3 } reorderAxis={ reorderAxis } onReorder={ onReorder }>X</Th>
            <Th id='y' colSpan={ 3 } reorderAxis={ reorderAxis } onReorder={ onReorder }>Y</Th>
            <Th id='z' colSpan={ 3 } reorderAxis={ reorderAxis } onReorder={ onReorder }>Z</Th>
          </Tr>
          <Tr>
            <Th id='y1' colSpan={ 2 } reorderAxis={ reorderAxis } onReorder={ onReorder }>Y1</Th>
            <Th id='y2' reorderAxis={ reorderAxis } onReorder={ onReorder }>Y2</Th>
            <Th id='z1' rowSpan={ 2 } reorderAxis={ reorderAxis } onReorder={ onReorder }>Z1</Th>
            <Th id='z2' colSpan={ 2 } reorderAxis={ reorderAxis } onReorder={ onReorder }>Z2</Th>
          </Tr>
          <Tr>
            <Th id='y1-1' reorderAxis={ reorderAxis } onReorder={ onReorder }>Y1-1</Th>
            <Th id='y1-2' reorderAxis={ reorderAxis } onReorder={ onReorder }>Y1-2</Th>
            <Th id='y2-1' reorderAxis={ reorderAxis } onReorder={ onReorder }>Y2-1</Th>
            <Th id='z2-1' reorderAxis={ reorderAxis } onReorder={ onReorder }>Z2-1</Th>
            <Th id='z2-2' reorderAxis={ reorderAxis } onReorder={ onReorder }>Z2-2</Th>
          </Tr>
        </Thead>

        <Tbody>
          <Tr>
            <Td>x-1</Td>
            <Td>y1-1-1</Td>
            <Td>y1-2-1</Td>
            <Td>y2-1-1</Td>
            <Td>z1-1</Td>
            <Td>z2-1-1</Td>
            <Td>z2-2-1</Td>
          </Tr>

          <Tr>
            <Td>x-2</Td>
            <Td>y1-1-2</Td>
            <Td>y1-2-2</Td>
            <Td>y2-1-2</Td>
            <Td>z1-2</Td>
            <Td>z2-1-2</Td>
            <Td>z2-2-2</Td>
          </Tr>
        </Tbody>
      </Table>
    );
  });
