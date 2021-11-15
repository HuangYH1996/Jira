import React, { ReactElement } from "react";

type FallBackRender = (props: { error: Error | null }) => ReactElement;

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallBackRender: FallBackRender }>,
  { error: Error | null }
> {
  state = { error: null };

  // 当发生错误时，会执行这个函数，将error返回，赋值给state
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { children, fallBackRender } = this.props;
    if (!error) {
      return children;
    }
    return fallBackRender({ error });
  }
}
