import { DraggableEvent } from 'react-draggable';

type ClientPosition = {
  x: number | null;
  y: number | null;
};

export function normalizeClient(e: DraggableEvent): ClientPosition {
  switch(e.type) {
    case 'mousedown':
    case 'mousemove':
    case 'mouseup':
    case 'mouseover':
    case 'mouseout':
    case 'mouseenter':
    case 'mouseleave':
    case 'click':
    case 'dblclick': {
      const { clientX, clientY } = e as MouseEvent;

      return {
        x: clientX,
        y: clientY,
      };
    }
    case 'touchstart':
    case 'touchmove':
    case 'touchend':
    case 'touchcancel': {
      const { touches } = e as TouchEvent;

      return {
        x: touches[0].clientX,
        y: touches[0].clientY,
      };
    }
    default: {
      return { x: null, y: null };
    }
  }
}
