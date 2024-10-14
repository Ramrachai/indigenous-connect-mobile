//@ts-nocheck
'use strict';
import React from 'react';

function useAsyncEffect(effect, destroy, inputs) {
  const hasDestroy = typeof destroy === 'function';

  React.useEffect(
    function () {
      var result;
      var mounted = true;
      var maybePromise = effect(function () {
        return mounted;
      });

      Promise.resolve(maybePromise).then(function (value) {
        result = value;
      });

      return function () {
        mounted = false;

        if (hasDestroy) {
          destroy(result);
        }
      };
    },
    hasDestroy ? inputs : destroy,
  );
}

function useAsyncEffect(
  effect: (isMounted: () => boolean) => unknown | Promise<unknown>,
  inputs?: any[],
): void;

function useAsyncEffect<V>(
  effect: (isMounted: () => boolean) => V | Promise<V>,
  destroy?: (result?: V) => void,
  inputs?: any[],
): void;

export default useAsyncEffect;
