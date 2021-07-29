/// <reference types="react-scripts" />
declare module "*.less" {
  const resource: { [key: string]: string };
  export = resource;
}
declare interface sidebarDataProps {
  name: string;
  id: number | string;
  /*[propsName: string]: any;*/
}
declare interface IModalRender {
  title?: string;
  width: string;
  onOk?: () => void;
  component: JSX.Element;
  footer?: React.ReactNode;
  padding?: number | string;
}
