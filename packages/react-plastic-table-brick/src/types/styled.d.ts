// import original module declarations
import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    cursor: {
      color: string;
      x: {
        width: number;
      };
      y: {
        height: number;
      };
    };
  }
}
