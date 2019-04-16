// input { errors }, errors: array of { [errorType]: string, [errorData]: any }
// output errorObj: any

import React from "react";

export const errorObjGenerator = ({ errors }) => {
    const errorMessage = [];
    errors.map(error => {
        const { errorType, errorData } = error;
        switch (errorType) {
            default:
                errorMessage.push(errorData);
                break;
        }
    });
    // return as errorObj
    return errorMessage.length
        ? {
              message: (
                  <ul>
                      {errorMessage.map((it, ind) => (
                          <li key={ind}>{it}</li>
                      ))}
                  </ul>
              ),
          }
        : null;
};
