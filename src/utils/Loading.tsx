import React, { FunctionComponent, useState } from "react";
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

import { THEME } from 'constants/themes/colors'

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  position:relative;
`;

interface LoadingProps {
    loading: boolean
}

const Loading: FunctionComponent<LoadingProps> = ({ loading }) => {
    let [color/*, setColor*/] = useState(THEME.PRIMARY);
    return (
        <div className="flex sweet-loading items-center mt-32">
            <BeatLoader color={color} loading={loading} css={override} size={50} />
        </div>
    );
}

export default Loading;