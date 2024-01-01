import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function BackArrowSvg(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props?.width}
      height={props?.height}
      viewBox="0 0 29.000000 50.000000"
      {...props}>
      <Path
        d="M116 381C21 285-1 259 4 242 15 210 237 7 255 14c39 15 27 38-69 135-53 53-96 101-96 106 0 6 40 47 89 93 49 45 93 91 96 103 7 21-9 49-29 49-6 0-65-53-130-119z"
        transform="matrix(.1 0 0 -.1 0 50)"
      />
    </Svg>
  );
}

export default BackArrowSvg;
